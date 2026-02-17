'use client';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export default function MissionVision({ mission, vision }) {
    return (
        <section className="section-padding relative overflow-hidden bg-dark-bg">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Mission */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="glass-card-hover border-white/5 p-10 h-full">
                            <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(14,165,233,0.2)]">
                                <Target className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold mb-6 text-text-primary">Our Mission</h2>
                            <p className="text-text-secondary text-lg leading-relaxed">
                                {mission}
                            </p>
                        </div>
                    </motion.div>

                    {/* Vision */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="glass-card-hover border-white/5 p-10 h-full">
                            <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(14,165,233,0.2)]">
                                <Eye className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold mb-6 text-text-primary">Our Vision</h2>
                            <p className="text-text-secondary text-lg leading-relaxed">
                                {vision}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
