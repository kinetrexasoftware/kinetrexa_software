'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { applicationAPI } from '@/lib/api';
import { Loader2, CheckCircle2, FileDown, AlertCircle, Search, Mail, Fingerprint } from 'lucide-react';
import Button from '@/components/ui/Button';
import toast, { Toaster } from 'react-hot-toast';

'use client';

import { useState } from 'react';
import { applicationAPI } from '@/lib/api';
import toast, { Toaster } from 'react-hot-toast';
import StatusHero from '@/components/pricing/StatusHero';
import VerificationTerminal from '@/components/pricing/VerificationTerminal';
import ApplicationDashboard from '@/components/pricing/ApplicationDashboard';

export default function StatusPortalPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [application, setApplication] = useState(null);
    const [downloading, setDownloading] = useState(null);

    // Track email/appId state in parent to pass to downloads if needed
    // If verifying via certificateId, we might not have the email, so we need to grab it from response
    const [credentials, setCredentials] = useState({ email: '', applicationId: '' });

    const handleVerify = async ({ email, applicationId, certificateId }) => {
        setLoading(true);
        setError('');
        setApplication(null);

        try {
            const response = await applicationAPI.verify({ email, applicationId, certificateId });
            setApplication(response.application);

            // If verification was via certificateId, we still need email for downloads
            // Fortunately, verify endpoint should probably return the email if we want to enable downloads, 
            // OR we update download endpoints to also accept just certificateId/applicationId (which is safer)
            // For now, let's assume we can try to extract email from the response if not provided, 
            // BUT for security, the API might not return PII unless authorized.
            // Wait, document download usually requires email for verification. 
            // If user verified via Cert ID, they might just want to SEE the status. 
            // Downloading sensitive docs might still need email re-entry or be limited.
            // Let's store what we have.

            setCredentials({
                email: email || '', // If verified by ID, email is empty initially
                applicationId: applicationId || certificateId
            });

            toast.success("Details retrieved successfully");
        } catch (err) {
            setError(err.message || 'Access Denied: Invalid credentials.');
            toast.error("Verification failed");
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (type) => {
        try {
            setDownloading(type);
            let blob;
            let defaultFilename;
            const { email, applicationId } = credentials;

            if (type === 'offer_letter') {
                blob = await applicationAPI.downloadOfferLetter(applicationId, email);
                defaultFilename = `KineTrexa_Offer_Letter_${applicationId.toUpperCase()}.pdf`;
            } else if (type === 'certificate') {
                blob = await applicationAPI.downloadCertificate(applicationId, email);
                defaultFilename = `KineTrexa_Certificate_${applicationId.toUpperCase()}.pdf`;
            } else if (type === 'task_assignment') {
                try {
                    blob = await applicationAPI.downloadTaskAssignment(applicationId, email);
                    defaultFilename = `Task_Assignment_${application.domain.replace(/\s+/g, '_')}.pdf`;
                } catch (err) {
                    if (err.status === 404) {
                        toast.error("Task file not available");
                    } else {
                        toast.error("Network error. Please try again or check your connection.");
                    }
                    throw err;
                }
            }

            // Create download link
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', defaultFilename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            toast.success(`${type.replace('_', ' ')} downloaded`);
        } catch (err) {
            console.error('Download Error:', err);
            // Error already toasted for task_assignment
            if (type !== 'task_assignment') {
                toast.error(err.message || 'Download failed. Security Check.');
            }
        } finally {
            setDownloading(null);
        }
    };

    return (
        <div className="min-h-screen bg-dark-bg text-white">
            <Toaster position="top-right" toastOptions={{
                style: {
                    background: '#0E1A2B',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.1)'
                }
            }} />

            <StatusHero />

            <div className="container-custom py-16 -mt-10 relative z-20">
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left Column: Verification */}
                    <div className="lg:col-span-5 xl:col-span-4">
                        <VerificationTerminal
                            onVerify={handleVerify}
                            loading={loading}
                            error={error}
                        />

                        {/* Helper Info */}
                        <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <h4 className="text-sm font-bold text-white mb-2">Need Help?</h4>
                            <p className="text-xs text-text-secondary leading-relaxed mb-4">
                                If you have lost your Application ID or are facing issues accessing your documents, please contact our support team immediately.
                            </p>
                            <a href="/contact" className="text-xs font-bold text-brand-primary hover:text-white transition-colors">
                                Contact Support &rarr;
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Dashboard Results */}
                    <div className="lg:col-span-7 xl:col-span-8">
                        <ApplicationDashboard
                            application={application}
                            onDownload={handleDownload}
                            downloading={downloading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
