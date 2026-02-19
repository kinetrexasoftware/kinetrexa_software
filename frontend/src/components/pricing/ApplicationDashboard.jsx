'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, FileDown, Fingerprint, Loader2, ArrowRight, Lock, Award, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ApplicationDashboard({ application, onDownload, downloading }) {

    if (!application) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-white/5 rounded-2xl bg-white/[0.02]"
            >
                <div className="w-24 h-24 rounded-full bg-brand-primary/5 flex items-center justify-center mb-6 animate-pulse">
                    <Fingerprint className="w-10 h-10 text-brand-primary/40" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">System Standby</h3>
                <p className="text-text-secondary max-w-xs font-mono text-sm">
                    Waiting for identity verification. Please enter your credentials to retrieve data.
                </p>
            </motion.div>
        );
    }

    const StatusBadge = ({ status }) => {
        const styles = {
            applied: 'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]',
            shortlisted: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.1)]',
            selected: 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]',
            rejected: 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]',
            completed: 'bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]',
        };

        return (
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold border uppercase tracking-widest ${styles[status.toLowerCase()] || styles.applied}`}>
                {status}
            </span>
        );
    };

    const isTaskUnlocked = ['selected', 'completed', 'Completed'].includes(application.status);
    const isOfferUnlocked = ['selected', 'completed', 'Completed'].includes(application.status);

    const isCompleted = application.status.toLowerCase() === 'completed';
    const endDate = application.internshipId?.endDate;
    const isDateReached = endDate ? new Date() >= new Date(endDate) : false;
    const isCertificateUnlocked = isCompleted && isDateReached;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 rounded-2xl border border-brand-primary/10 h-full relative overflow-hidden"
        >
            {/* Background Tech Lines */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-[80px] -z-10" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />

            <div className="flex flex-col h-full relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-3xl font-bold text-white">{application.name}</h3>
                            <StatusBadge status={application.status} />
                        </div>
                        <p className="text-text-secondary font-mono text-xs flex items-center gap-2">
                            ID: <span className="text-brand-primary">{application.applicationId}</span>
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest text-text-muted font-bold mb-1">Internship Domain</p>
                        <p className="text-xl font-bold text-white border-b-2 border-brand-primary/30 pb-1 inline-block">{application.domain}</p>
                    </div>
                </div>

                {/* Document Grid */}
                <h4 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6 flex items-center gap-2">
                    <FileDown className="w-4 h-4" /> Secure Documents
                </h4>

                {/* Document Grid */}
                <h4 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6 flex items-center gap-2">
                    <FileDown className="w-4 h-4" /> Secure Documents
                </h4>

                <div className="grid gap-4">
                    {/* Offer Letter */}
                    <div className={`p-5 rounded-xl border transition-all duration-300 group ${isOfferUnlocked ? 'bg-brand-primary/5 border-brand-primary/20 hover:bg-brand-primary/10' : 'bg-white/[0.02] border-white/5 opacity-60'}`}>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className={`font-bold ${isOfferUnlocked ? 'text-white' : 'text-gray-500'}`}>Offer Letter</p>
                                <p className="text-xs text-text-secondary mt-1">
                                    {isOfferUnlocked ? 'Official internship offer letter' : 'Requires selection status'}
                                </p>
                            </div>
                            {isOfferUnlocked ? (
                                <Button
                                    size="sm"
                                    onClick={() => onDownload('offer_letter')}
                                    className="gap-2 bg-brand-primary/20 text-brand-primary border-transparent hover:bg-brand-primary hover:text-white"
                                    disabled={downloading === 'offer_letter'}
                                >
                                    {downloading === 'offer_letter' ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
                                    Download
                                </Button>
                            ) : (
                                <Lock className="w-4 h-4 text-gray-600" />
                            )}
                        </div>
                    </div>

                    {/* Task Assignment */}
                    <div className={`p-5 rounded-xl border transition-all duration-300 group ${isTaskUnlocked ? 'bg-purple-500/5 border-purple-500/20 hover:bg-purple-500/10' : 'bg-white/[0.02] border-white/5 opacity-60'}`}>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className={`font-bold ${isTaskUnlocked ? 'text-white' : 'text-gray-500'}`}>Task Assignment</p>
                                <p className="text-xs text-text-secondary mt-1">
                                    {application.taskAssignment?.enabled ? 'Domain-specific technical task' : 'Pending Allocation'}
                                </p>
                            </div>
                            {application.taskAssignment?.enabled ? (
                                <Button
                                    size="sm"
                                    onClick={() => onDownload('task_assignment')}
                                    className="gap-2 bg-purple-500/20 text-purple-400 border-transparent hover:bg-purple-500 hover:text-white"
                                    disabled={downloading === 'task_assignment'}
                                >
                                    {downloading === 'task_assignment' ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
                                    Download
                                </Button>
                            ) : (
                                <Lock className="w-4 h-4 text-gray-600" />
                            )}
                        </div>
                    </div>

                    {/* Certificate Card - OR - Promotion */}
                    {isCertificateUnlocked ? (
                        <div className="glass-card p-6 border border-white/10 rounded-xl relative overflow-hidden group hover:border-brand-primary/50 transition-all">
                            <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                <FileDown className="w-5 h-5 text-brand-primary" />
                            </div>
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-brand-primary/10 rounded-lg text-brand-primary">
                                    <Award size={24} />
                                </div>
                                {application.certificateId && (
                                    <span className="text-[10px] font-mono text-text-muted bg-white/5 px-2 py-1 rounded">
                                        {application.certificateId}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1">Internship Certificate</h3>
                            <p className="text-sm text-text-secondary mb-4">Verified proof of completion.</p>
                            <Button
                                onClick={() => onDownload('certificate')}
                                className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-all flex items-center justify-center gap-2"
                                disabled={downloading === 'certificate'}
                            >
                                {downloading === 'certificate' ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
                                Download PDF
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Not Issued Warning */}
                            <div className="glass-card p-6 border border-yellow-500/30 bg-yellow-500/5 rounded-xl flex items-center gap-4">
                                <div className="p-3 bg-yellow-500/20 rounded-full text-yellow-500">
                                    <AlertCircle size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Certificate Not Yet Issued</h3>
                                    <p className="text-sm text-text-secondary">
                                        Your certificate will be generated automatically once your internship status is marked as 'Completed'.
                                    </p>
                                </div>
                            </div>

                            {/* Internship Promotion */}
                            <div className="glass-card p-1 rounded-2xl border border-brand-primary/30 relative overflow-hidden group cursor-pointer hover:border-brand-primary/60 transition-all">
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity" />

                                <div className="p-6 relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-white">
                                            <span className="text-brand-primary">Level Up</span> Your Skills
                                        </h3>
                                        <span className="bg-brand-secondary text-dark-bg text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider animate-pulse">
                                            New Batches
                                        </span>
                                    </div>

                                    <p className="text-sm text-text-secondary mb-6">
                                        While you wait, explore our advanced internship programs in AI, Cyber Security, and Cloud Computing.
                                    </p>

                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        {['Full Stack Dev', 'AI & ML', 'Data Science', 'Cyber Security'].map((tag) => (
                                            <div key={tag} className="bg-dark-bg/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-text-muted text-center">
                                                {tag}
                                            </div>
                                        ))}
                                    </div>

                                    <a
                                        href="/products"
                                        className="block w-full text-center py-3 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
                                    >
                                        Explore Programs 🚀
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between text-xs text-text-muted">
                    <span className="font-mono">SECURE CONNECTION ESTABLISHED</span>
                    <span className="flex items-center gap-1">
                        KineTrexa Systems <ArrowRight size={10} />
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
