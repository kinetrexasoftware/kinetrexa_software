'use client';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function InternshipHero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[100px] -z-10" />

            <div className="container-custom relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-8"
                    >
                        <Sparkles size={12} className="animate-pulse" />
                        <span>Internship Portal</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight brand-gradient-text leading-tight">
                        Launch Your Career <br />
                        with Real-World Impact
                    </h1>

                    <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        Join KineTrexa's specialized internship program to work on live projects, master cutting-edge stacks, and build a resume that commands attention in today's tech market.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
