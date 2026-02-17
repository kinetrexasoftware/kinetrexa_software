'use client';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function TrainingPhilosophy({ content }) {
    const {
        title = 'Empowering Future Tech Leaders',
        paragraphs = [
            "At KineTrexa, we believe that the best way to learn is by doing. Our training and internship programs are designed not just to teach syntax, but to teach engineering.",
            "We don't settle for \"Hello World.\" Our interns work on live production code, tackle real architectural challenges, and learn the soft skills necessary to thrive in a modern agile team."
        ]
    } = content || {};

    return (
        <section className="section-padding relative overflow-hidden bg-dark-bg">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full -z-10" />

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-block px-3 py-1 mb-6 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest">
                            Training Philosophy
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 brand-gradient-text leading-tight">{title}</h2>
                        <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
                            {paragraphs.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-4 mt-10">
                            <Link href="/internship">
                                <Button size="lg" className="min-w-[180px]">
                                    Browse Internships
                                </Button>
                            </Link>
                            <Link href="/services#training">
                                <Button size="lg" variant="outline" className="min-w-[180px] border-white/10 hover:bg-white/5 text-white">
                                    View Syllabus
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid sm:grid-cols-2 gap-6"
                    >
                        <div className="glass-card-hover border-white/5 p-8 flex flex-col items-start h-full">
                            <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center mb-6">
                                <GraduationCap className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-text-primary">Skill-First Approach</h3>
                            <p className="text-sm text-text-secondary leading-relaxed">Curriculum updated monthly to match real-world industry demands and trends.</p>
                        </div>
                        <div className="glass-card-hover border-white/5 p-8 flex flex-col items-start h-full mt-0 sm:mt-12">
                            <div className="w-14 h-14 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center mb-6">
                                <Briefcase className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-text-primary">Real Experience</h3>
                            <p className="text-sm text-text-secondary leading-relaxed">You won't just study—you'll ship production-grade code to actual customers.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
