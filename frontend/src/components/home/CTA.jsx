'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Send } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CTA() {
    return (
        <section className="section-padding relative overflow-hidden">
            <div className="container-custom relative z-10">
                <div className="relative glass-card p-12 md:p-20 border-white/5 overflow-hidden group">
                    {/* Animated background highlights */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-primary/20 blur-[100px] rounded-full group-hover:bg-brand-primary/30 transition-all duration-700" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-primary/10 blur-[100px] rounded-full" />

                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-8"
                        >
                            <Sparkles size={12} className="animate-pulse" />
                            <span>Ready to Transform?</span>
                        </motion.div>

                        <h2 className="text-4xl md:text-6xl font-bold mb-8 brand-gradient-text tracking-tight">
                            Build the Extraordinary
                        </h2>

                        <p className="text-xl mb-12 text-text-secondary max-w-2xl mx-auto leading-relaxed">
                            Whether you need a cutting-edge digital product or want to kickstart your career with expert mentorship, KineTrexa is your bridge to the future.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link href="/contact" className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    variant="primary"
                                    className="w-full h-14 px-10 shadow-xl shadow-brand-primary/20"
                                >
                                    Start a Project
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/internship" className="w-full sm:w-auto">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full h-14 px-10 border-white/10"
                                >
                                    Join as Intern
                                    <Send className="ml-2 w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-brand-primary/5 blur-[150px] -z-10 rounded-[100%]" />
        </section>
    );
}