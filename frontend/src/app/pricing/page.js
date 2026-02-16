'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { applicationAPI } from '@/lib/api';
import { Loader2, CheckCircle2, FileDown, AlertCircle, Search, Mail, Fingerprint } from 'lucide-react';
import Button from '@/components/ui/Button';
import toast, { Toaster } from 'react-hot-toast';

export default function StatusPortalPage() {
    const [email, setEmail] = useState('');
    const [applicationId, setApplicationId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [application, setApplication] = useState(null);

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setApplication(null);

        try {
            const response = await applicationAPI.verify({ email, applicationId });
            setApplication(response.application);
        } catch (err) {
            setError(err.message || 'No application found with provided details.');
        } finally {
            setLoading(false);
        }
    };

    const [downloading, setDownloading] = useState(null); // 'offer_letter' | 'certificate' | null

    const handleDownload = async (type) => {
        try {
            setDownloading(type);
            let blob;
            let defaultFilename;

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
        } catch (err) {
            console.error('Download Error:', err);
            // Error already toasted for task_assignment
            if (type !== 'task_assignment') {
                toast.error(err.message || 'Download failed. Please try again.');
            }
        } finally {
            setDownloading(null);
        }
    };

    const StatusBadge = ({ status }) => {
        const styles = {
            applied: 'bg-blue-100 text-blue-700 border-blue-200',
            shortlisted: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            selected: 'bg-green-100 text-green-700 border-green-200',
            rejected: 'bg-red-100 text-red-700 border-red-200',
            completed: 'bg-purple-100 text-purple-700 border-purple-200',
        };

        return (
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold border uppercase tracking-wider ${styles[status.toLowerCase()] || styles.applied}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="min-h-[80vh] py-20 bg-dark-bg text-white">
            <Toaster position="top-right" />
            <div className="container-custom max-w-4xl">
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
                    >
                        Application Status & Documents
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg"
                    >
                        Check your progress and access your professional documents.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Verification Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        <div className="glass-card p-8 rounded-2xl border border-white/10">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Search className="w-5 h-5 text-primary-400" />
                                Verify Application
                            </h2>
                            <form onSubmit={handleVerify} className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                        <Mail className="w-4 h-4" /> Registered Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                                        placeholder="Enter your registered email"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                        <Fingerprint className="w-4 h-4" /> Application ID
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={applicationId}
                                        onChange={(e) => setApplicationId(e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all outline-none uppercase"
                                        placeholder="e.g. ABC123DEF"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full py-4 text-lg"
                                    disabled={loading}
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Verify Application'}
                                </Button>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl text-sm"
                                    >
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        {error}
                                    </motion.div>
                                )}
                            </form>
                        </div>
                    </motion.div>

                    {/* Status Display Area */}
                    <div className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            {application ? (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="glass-card p-8 rounded-2xl border border-white/10 h-full"
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-8">
                                            <div>
                                                <h3 className="text-2xl font-bold mb-1">{application.name}</h3>
                                                <p className="text-gray-400 flex items-center gap-2">
                                                    <Fingerprint className="w-4 h-4" /> {application.applicationId}
                                                </p>
                                            </div>
                                            <StatusBadge status={application.status} />
                                        </div>

                                        <div className="space-y-6">
                                            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                                <p className="text-sm text-gray-400 mb-1 tracking-wider uppercase font-bold">Internship Domain</p>
                                                <p className="text-xl font-semibold text-primary-400">{application.domain}</p>
                                            </div>

                                            <div className="pt-4 border-t border-white/10">
                                                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                                                    <FileDown className="w-5 h-5 text-primary-400" />
                                                    Available Documents
                                                </h4>

                                                <div className="grid gap-4">
                                                    {/* Offer Letter Button */}
                                                    <div className="p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-primary-500/50 transition-all">
                                                        <div className="flex justify-between items-center">
                                                            <div>
                                                                <p className="font-bold">Offer Letter</p>
                                                                <p className="text-sm text-gray-400">
                                                                    {['selected', 'completed'].includes(application.status.toLowerCase())
                                                                        ? 'Official internship offer letter'
                                                                        : 'Available after selection'}
                                                                </p>
                                                            </div>
                                                            {['selected', 'completed'].includes(application.status.toLowerCase()) ? (
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => handleDownload('offer_letter')}
                                                                    className="gap-2"
                                                                    disabled={downloading === 'offer_letter'}
                                                                >
                                                                    {downloading === 'offer_letter' ? (
                                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                                    ) : (
                                                                        <FileDown className="w-4 h-4" />
                                                                    )}
                                                                    {downloading === 'offer_letter' ? 'Generating...' : 'Download'}
                                                                </Button>
                                                            ) : (
                                                                <span className="text-xs text-gray-500 italic">Locked</span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Task Assignment Card (Domain-Specific) */}
                                                    {['selected', 'completed', 'Completed'].includes(application.status) && (
                                                        <div className={`p-4 bg-white/5 rounded-xl border border-white/5 group transition-all ${application.taskAssignment?.enabled ? 'hover:border-primary-500/50' : 'opacity-75'}`}>
                                                            <div className="flex justify-between items-center">
                                                                <div>
                                                                    <p className="font-bold text-white">Task Assignment</p>
                                                                    <p className="text-sm text-gray-400">
                                                                        {application.taskAssignment?.enabled
                                                                            ? 'Domain-specific task assigned by KineTrexa'
                                                                            : 'Task assignment will be available after selection'}
                                                                    </p>
                                                                </div>
                                                                {application.taskAssignment?.enabled ? (
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => handleDownload('task_assignment')}
                                                                        className="gap-2 whitespace-nowrap min-w-[120px]"
                                                                        disabled={downloading === 'task_assignment'}
                                                                    >
                                                                        {downloading === 'task_assignment' ? (
                                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                                        ) : (
                                                                            <FileDown className="w-4 h-4" />
                                                                        )}
                                                                        {downloading === 'task_assignment' ? 'Downloading...' : 'Download Task'}
                                                                    </Button>
                                                                ) : (
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        disabled={true}
                                                                        className="gap-2 bg-white/5 text-gray-500 border-white/10"
                                                                    >
                                                                        Locked
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Certificate Button */}
                                                    {(() => {
                                                        const isCompleted = application.status.toLowerCase() === 'completed';
                                                        const endDate = application.internshipId?.endDate;
                                                        const isDateReached = endDate ? new Date() >= new Date(endDate) : false;
                                                        const isCertificateUnlocked = isCompleted && isDateReached;

                                                        return (
                                                            <div className={`p-4 bg-white/5 rounded-xl border border-white/5 group transition-all ${isCertificateUnlocked ? 'hover:border-primary-500/50' : 'opacity-75'}`}>
                                                                <div className="flex justify-between items-center">
                                                                    <div>
                                                                        <p className="font-bold">Internship Certificate</p>
                                                                        <p className="text-sm text-gray-400">
                                                                            {!isCompleted
                                                                                ? 'Certificate available after internship completion'
                                                                                : !isDateReached
                                                                                    ? `Unlocks after ${new Date(endDate).toLocaleDateString()}`
                                                                                    : 'Official proof of internship completion'}
                                                                        </p>
                                                                    </div>
                                                                    {isCertificateUnlocked ? (
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            onClick={() => handleDownload('certificate')}
                                                                            className="gap-2"
                                                                            disabled={downloading === 'certificate'}
                                                                        >
                                                                            {downloading === 'certificate' ? (
                                                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                                            ) : (
                                                                                <FileDown className="w-4 h-4" />
                                                                            )}
                                                                            {downloading === 'certificate' ? 'Generating...' : 'Download'}
                                                                        </Button>
                                                                    ) : (
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            disabled={true}
                                                                            className="gap-2 bg-white/5 text-gray-500 border-white/10"
                                                                        >
                                                                            Locked
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })()}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="mt-auto pt-8 text-sm text-center text-gray-500 italic">
                                            "Building Skills. Creating Futures."
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-white/5 border border-dashed border-white/20 rounded-2xl h-full flex flex-col items-center justify-center p-12 text-center"
                                >
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle2 className="w-10 h-10 text-white/20" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-gray-300">No application selected</h3>
                                    <p className="text-gray-500 max-w-xs">
                                        Enter your details on the left to view your status and download your documents.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
