'use client';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function ServicesHero() {
    return (
        <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-dark-bg">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Background Ambient Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />

            <div className="container-custom relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-8 shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:bg-brand-primary/20 transition-colors cursor-default"
                    >
                        <Sparkles size={14} className="animate-pulse" />
                        <span>Our Technical Expertise</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-[1.1]">
                        <span className="block text-white mb-2">Digital Solutions</span>
                        <span className="block brand-gradient-text">Built for Scale.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                        From disruptive MVPs to enterprise-grade systems, we deliver <span className="text-brand-primary font-semibold">high-performance architecture</span>, clean code, and user-centric design that propels your growth.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
