'use client';
import { motion } from 'framer-motion';
import { Check, Zap, Users, Shield } from 'lucide-react';

const iconMap = {
    Zap, Users, Shield, Check
};

export default function WhatMakesUsDifferent({ content }) {
    const {
        title = 'What Makes Us Different',
        subtitle = "In a sea of tech companies, here's why KineTrexa stands out.",
        items = []
    } = content || {};

    const itemsToDisplay = items.length > 0 ? items : [];

    return (
        <section className="section-padding relative overflow-hidden bg-dark-bg">
            <div className="container-custom">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 brand-gradient-text">{title}</h2>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                    {itemsToDisplay.map((item, index) => {
                        const IconComponent = iconMap[item.icon] || Zap;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card-hover border-white/5 p-8 flex gap-6 group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(14,165,233,0.1)] group-hover:scale-110 transition-transform">
                                    <IconComponent size={28} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-3 text-text-primary">{item.title}</h3>
                                    <p className="text-text-secondary text-lg leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
