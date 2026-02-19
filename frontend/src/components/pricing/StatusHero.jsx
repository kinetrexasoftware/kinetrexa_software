'use client';
import { motion } from 'framer-motion';
import { CheckCircle2, Activity, Wifi } from 'lucide-react';

export default function StatusHero() {
    return (
        <section className="relative py-20 overflow-hidden bg-dark-bg border-b border-white/5">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Status Ticker */}
            <div className="absolute top-0 left-0 w-full bg-brand-primary/5 border-b border-brand-primary/10 py-2 overflow-hidden">
                <div className="flex gap-8 animate-marquee whitespace-nowrap text-xs font-mono text-brand-primary/70 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Wifi size={12} /> System Normal</span>
                    <span className="flex items-center gap-2"><Activity size={12} /> API Latency: 24ms</span>
                    <span className="flex items-center gap-2"><CheckCircle2 size={12} /> Database: Connected</span>
                    <span className="flex items-center gap-2"><Wifi size={12} /> System Normal</span>
                    <span className="flex items-center gap-2"><Activity size={12} /> API Latency: 24ms</span>
                    <span className="flex items-center gap-2"><CheckCircle2 size={12} /> Database: Connected</span>
                    <span className="flex items-center gap-2"><Wifi size={12} /> System Normal</span>
                    <span className="flex items-center gap-2"><Activity size={12} /> API Latency: 24ms</span>
                    <span className="flex items-center gap-2"><CheckCircle2 size={12} /> Database: Connected</span>
                    <span className="flex items-center gap-2"><Wifi size={12} /> System Normal</span>
                    <span className="flex items-center gap-2"><Activity size={12} /> API Latency: 24ms</span>
                    <span className="flex items-center gap-2"><CheckCircle2 size={12} /> Database: Connected</span>
                </div>
            </div>

            <div className="container-custom relative z-10 text-center pt-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span>All Systems Operational</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold mb-6"
                >
                    <span className="block text-white mb-2">Mission Control</span>
                    <span className="block brand-gradient-text text-3xl md:text-5xl">Status & Documentation</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-text-secondary text-lg max-w-2xl mx-auto"
                >
                    Verify your application status, access secure documents, and monitor KineTrexa system performance in real-time.
                </motion.p>
            </div>

            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 w-[600px] h-[300px] bg-brand-primary/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 -z-10" />
        </section>
    );
}
