'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function InternshipOpportunity() {
    return (
        <section className="section-padding relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/[0.03] blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-primary/5 blur-[100px] rounded-full -z-10" />

            <div className="container-custom relative z-10">
                <div className="glass-card-hover border-white/5 p-8 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/[0.02] blur-3xl -z-10" />

                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-8">
                            Student Program
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 brand-gradient-text leading-tight">Start as an Intern, Be a Leader</h2>
                        <p className="text-lg text-text-secondary mb-10 leading-relaxed max-w-2xl">
                            Looking for your first break? KineTrexa's internship program is designed for students and fresh graduates who want practical exposure. From Day 1, you write code that ships.
                        </p>
                        <div className="flex gap-4">
                            <Link href="/internship">
                                <Button variant="primary" size="lg" className="h-14 px-10">
                                    View Internship Details
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
