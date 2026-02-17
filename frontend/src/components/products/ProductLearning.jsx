'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function ProductLearning() {
    return (
        <section className="section-padding relative overflow-hidden bg-dark-secondary/50">
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-primary/[0.02] blur-[120px] -z-10" />

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-brand-primary font-bold tracking-[0.2em] text-[10px] uppercase mb-6 block">
                            The KineTrexa Advantage
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 brand-gradient-text leading-tight">
                            Where Products Meet <br /> Practical Learning
                        </h2>
                        <p className="text-xl text-text-secondary mb-10 leading-relaxed">
                            Our products aren't just for clients; they are the high-stakes training ground for the next generation of software engineers.
                        </p>
                        <ul className="space-y-5 mb-12">
                            <li className="flex items-start gap-4">
                                <div className="mt-2 w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
                                <span className="text-text-secondary">Interns contribute directly to live, production-grade codebases.</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="mt-2 w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
                                <span className="text-text-secondary">Students master the full product lifecycle, from RFC to deployment.</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="mt-2 w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
                                <span className="text-text-secondary">Real users, high uptime requirements, and actual responsibility.</span>
                            </li>
                        </ul>
                        <Link href="/internship">
                            <Button variant="primary" size="lg" className="h-14 px-10">
                                Apply for Product Internship
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="glass-card-hover border-white/5 p-10 relative"
                    >
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-primary/10 blur-2xl rounded-full" />

                        <h3 className="text-2xl font-bold mb-4 text-text-primary">Engineering Impact</h3>
                        <div className="flex items-end gap-3 mb-8">
                            <span className="text-6xl font-black text-brand-primary">100+</span>
                            <span className="text-text-muted mb-2 font-bold uppercase tracking-widest text-xs">Commits Week</span>
                        </div>
                        <p className="text-lg text-text-secondary leading-relaxed italic border-l-2 border-brand-primary/30 pl-6 mb-8">
                            "I didn't just learn React; I learned how to deploy a scalable SaaS app with real-world constraints. Working on KineFlow was the absolute highlight of my journey."
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center font-bold text-brand-primary border border-brand-primary/20">RJ</div>
                            <div>
                                <h4 className="font-bold text-text-primary">Rahul J.</h4>
                                <p className="text-xs text-text-muted uppercase tracking-widest">Former Intern • Now Lead Dev</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
