'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mail, Fingerprint, Loader2, AlertCircle, ShieldCheck, FileBadge } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function VerificationTerminal({ onVerify, loading, error }) {
    const [mode, setMode] = useState('status'); // 'status' | 'certificate'
    const [email, setEmail] = useState('');
    const [applicationId, setApplicationId] = useState('');
    const [certificateId, setCertificateId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === 'status') {
            onVerify({ email, applicationId });
        } else {
            onVerify({ certificateId });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full"
        >
            <div className="glass-card overflow-hidden border border-brand-primary/20 shadow-[0_0_30px_rgba(14,165,233,0.05)]">
                {/* Terminal Header */}
                <div className="bg-white/5 border-b border-white/5 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
                        SECURE_ACCESS_V4.2
                    </div>
                </div>

                <div className="p-8">
                    {/* Mode Toggle */}
                    <div className="flex bg-white/5 p-1 rounded-lg mb-8 border border-white/5">
                        <button
                            onClick={() => setMode('status')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${mode === 'status' ? 'bg-brand-primary text-white shadow-lg' : 'text-text-secondary hover:text-white'}`}
                        >
                            <ShieldCheck size={14} /> Status Check
                        </button>
                        <button
                            onClick={() => setMode('certificate')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${mode === 'certificate' ? 'bg-brand-primary text-white shadow-lg' : 'text-text-secondary hover:text-white'}`}
                        >
                            <FileBadge size={14} /> Verify Cert
                        </button>
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center border border-brand-primary/20">
                            {mode === 'status' ? <ShieldCheck size={20} /> : <FileBadge size={20} />}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">
                                {mode === 'status' ? 'Identity Verification' : 'Certificate Validation'}
                            </h2>
                            <p className="text-xs text-text-secondary font-mono">
                                {mode === 'status' ? 'Authenticate to access records' : 'Enter Public Certificate ID'}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AnimatePresence mode="wait">
                            {mode === 'status' ? (
                                <motion.div
                                    key="status-form"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-brand-primary uppercase tracking-widest flex items-center gap-2">
                                            <Mail className="w-3 h-3" /> User_Email
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-4 pr-4 py-3 bg-dark-bg/50 border border-white/10 rounded-lg focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-all outline-none font-mono text-sm text-white placeholder-white/20"
                                                placeholder="user@example.com"
                                            />
                                            <div className="absolute inset-0 rounded-lg bg-brand-primary/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-brand-primary uppercase tracking-widest flex items-center gap-2">
                                            <Fingerprint className="w-3 h-3" /> Application_Key
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                required
                                                value={applicationId}
                                                onChange={(e) => setApplicationId(e.target.value)}
                                                className="w-full pl-4 pr-4 py-3 bg-dark-bg/50 border border-white/10 rounded-lg focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-all outline-none font-mono text-sm text-white uppercase placeholder-white/20"
                                                placeholder="KTX-_______"
                                            />
                                            <div className="absolute inset-0 rounded-lg bg-brand-primary/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="cert-form"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-brand-primary uppercase tracking-widest flex items-center gap-2">
                                            <FileBadge className="w-3 h-3" /> Certificate_ID
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                required
                                                value={certificateId}
                                                onChange={(e) => setCertificateId(e.target.value)}
                                                className="w-full pl-4 pr-4 py-3 bg-dark-bg/50 border border-white/10 rounded-lg focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-all outline-none font-mono text-sm text-white uppercase placeholder-white/20"
                                                placeholder="e.g. ABC123XYZ"
                                            />
                                            <div className="absolute inset-0 rounded-lg bg-brand-primary/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
                                        </div>
                                        <p className="text-[10px] text-text-secondary font-mono mt-2">
                                            * Enter the unique ID found on bottom-left of the certificate.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Button
                            type="submit"
                            className="w-full py-4 text-sm font-mono uppercase tracking-widest border border-brand-primary/30 shadow-[0_0_20px_rgba(14,165,233,0.1)] hover:shadow-[0_0_30px_rgba(14,165,233,0.2)]"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Search className="w-4 h-4" /> {mode === 'status' ? 'Verify Identity' : 'Validate Certificate'}
                                </span>
                            )}
                        </Button>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="pt-2"
                                >
                                    <div className="flex items-start gap-3 text-red-400 bg-red-500/5 border border-red-500/10 p-4 rounded-lg text-xs font-mono">
                                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-bold block mb-1">ACCESS_DENIED</span>
                                            {error}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </div>

            {/* Decorative Matrix Text */}
            <div className="mt-4 flex justify-between text-[10px] font-mono text-white/10 select-none">
                <span>ENCRYPTION: AES-256</span>
                <span>NODE: KTX-01</span>
            </div>
        </motion.div>
    );
}
