'use client';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export default function MissionVision({ mission, vision }) {
    return (
        <section className="section-padding relative overflow-hidden bg-dark-bg">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Mission */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="h-full"
                    >
                        <div className="glass-card-hover border-white/5 p-10 h-full relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Target className="w-32 h-32 text-brand-primary transform group-hover:scale-110 transition-transform duration-700" />
                            </div>

                            <div className="w-16 h-16 bg-brand-primary/20 text-brand-primary rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(14,165,233,0.2)] border border-brand-primary/20 backdrop-blur-md">
                                <Target className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold mb-6 text-white group-hover:text-brand-primary transition-colors">Our Mission</h2>
                            <p className="text-text-secondary text-lg leading-relaxed relative z-10">
                                {mission}
                            </p>
                        </div>
                    </motion.div>

                    {/* Vision */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="h-full"
                    >
                        <div className="glass-card-hover border-white/5 p-10 h-full relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Eye className="w-32 h-32 text-purple-500 transform group-hover:scale-110 transition-transform duration-700" />
                            </div>

                            <div className="w-16 h-16 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(168,85,247,0.2)] border border-purple-500/20 backdrop-blur-md">
                                <Eye className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold mb-6 text-white group-hover:text-purple-400 transition-colors">Our Vision</h2>
                            <p className="text-text-secondary text-lg leading-relaxed relative z-10">
                                {vision}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
