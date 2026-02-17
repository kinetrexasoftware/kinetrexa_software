'use client';
import { motion } from 'framer-motion';
import { CheckCircle2, CloudLightning, ShieldCheck, Users, Clock, HeartHandshake, Zap, Award, BarChart, Lock, Globe, Sparkles } from 'lucide-react';

const iconMap = {
    CheckCircle2, CloudLightning, ShieldCheck, Users, Clock, HeartHandshake, Zap, Award, BarChart, Lock, Globe
};

export default function WhyChooseUs({ content }) {
    const {
        title = 'Why Choose KineTrexa?',
        subtitle = 'We combine technical expertise with a commitment to your growth.',
        items = []
    } = content || {};

    if (!items || items.length === 0) return null;

    return (
        <section className="section-padding relative overflow-hidden">
            <div className="container-custom relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-6"
                    >
                        <Sparkles size={12} className="animate-pulse" />
                        <span>Our Core Value</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6 brand-gradient-text"
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((reason, index) => {
                        const IconComponent = iconMap[reason.icon] || CheckCircle2;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card-hover p-8 border-white/5"
                            >
                                <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-primary/20 transition-all duration-300">
                                    <IconComponent className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-text-primary group-hover:text-brand-primary transition-colors">
                                    {reason.title}
                                </h3>
                                <p className="text-text-secondary leading-relaxed">
                                    {reason.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-primary/[0.02] blur-[150px] -z-10 pointer-events-none" />
        </section>
    );
}
