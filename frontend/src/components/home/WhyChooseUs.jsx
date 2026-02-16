'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, CloudLightning, ShieldCheck, Users, Clock, HeartHandshake, Zap, Award, BarChart, Lock, Globe } from 'lucide-react';
import { contentAPI } from '@/lib/api';

const iconMap = {
    CheckCircle2, CloudLightning, ShieldCheck, Users, Clock, HeartHandshake, Zap, Award, BarChart, Lock, Globe
};

export default function WhyChooseUs({ content }) {
    // No internal state needed, usage of content prop
    const {
        title = 'Why Choose KineTrexa?',
        subtitle = 'We combine technical expertise with a commitment to your growth.',
        items = []
    } = content || {};

    if (!items || items.length === 0) return null;

    return (
        <section className="section bg-white dark:bg-dark-bg">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((reason, index) => {
                        const IconComponent = iconMap[reason.icon] || CheckCircle2;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 rounded-xl flex items-center justify-center mb-4">
                                    <IconComponent className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {reason.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
