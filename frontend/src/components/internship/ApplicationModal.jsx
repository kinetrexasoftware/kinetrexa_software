'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/ui/Modal';
import ApplicationForm from './ApplicationForm';
// Re-trigger compilation
import SuccessAnimation from '@/components/ui/SuccessAnimation';
import CancelAnimation from '@/components/ui/CancelAnimation';
import WarningAnimation from '@/components/ui/WarningAnimation';
import Button from '@/components/ui/Button';

export default function ApplicationModal({ internship, onClose }) {
    const [animationType, setAnimationType] = useState(null); // 'success' | 'cancelled' | 'alreadyRegistered' | null
    const router = useRouter();

    if (!internship) return null;

    const handleSuccess = (application) => {
        // Called AFTER payment is verified by ApplicationForm
        handleSuccessAnimation();
    };

    const handleSuccessAnimation = () => {
        setAnimationType('success');
        setTimeout(() => {
            setAnimationType(null);
            onClose();
        }, 3000);
    };

    const handleCancel = () => {
        if (animationType) return;
        setAnimationType('cancelled');
        setTimeout(() => {
            setAnimationType(null);
            onClose();
        }, 1500);
    };

    const handleAlreadyRegistered = () => {
        if (animationType) return;
        setAnimationType('alreadyRegistered');
        setTimeout(() => {
            setAnimationType(null);
            onClose();
        }, 3500);
    };

    const getTitle = () => {
        if (animationType === 'success') return "Application Submitted";
        if (animationType === 'cancelled') return "Application Cancelled";
        if (animationType === 'alreadyRegistered') return "Already Registered";
        return `Apply for ${internship.title}`;
    };

    return (
        <Modal
            isOpen={true}
            onClose={onClose}
            title={getTitle()}
        >
            {animationType === 'success' ? (
                <div className="flex flex-col items-center">
                    <SuccessAnimation message="Application & Payment Successful! We will contact you soon." />
                    <Button onClick={onClose} className="mt-4">
                        Close
                    </Button>
                </div>
            ) : animationType === 'cancelled' ? (
                <div className="flex flex-col items-center">
                    <CancelAnimation message="Process cancelled." />
                </div>
            ) : animationType === 'alreadyRegistered' ? (
                <div className="flex flex-col items-center pb-4">
                    <WarningAnimation message="You have already applied for this internship domain" />
                    <div className="flex gap-3 mt-4">
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost" onClick={() => router.push('/contact')} className="text-amber-600 hover:bg-amber-50">
                            Contact Support
                        </Button>
                    </div>
                </div>
            ) : (
                <ApplicationForm
                    internship={internship}
                    initialDomain={internship.title} // Pass the locked domain
                    onSuccess={handleSuccess}
                    onCancel={handleCancel}
                    onAlreadyRegistered={handleAlreadyRegistered}
                />
            )}
        </Modal>
    );
}
