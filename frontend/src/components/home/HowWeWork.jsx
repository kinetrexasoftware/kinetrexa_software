'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, PenTool, Code2, Rocket, Search, Lightbulb, Settings, Flag } from 'lucide-react';
import { contentAPI } from '@/lib/api';

const iconMap = {
    MessageSquare, PenTool, Code2, Rocket, Search, Lightbulb, Settings, Flag
};

export default function HowWeWork({ content }) {
    const {
        title = 'How We Work',
        subtitle = 'A transparent and efficient process to bring your vision to life.',
        steps = []
    } = content || {};

    const stepsToDisplay = steps.length > 0 ? steps : [];

    if (stepsToDisplay.length === 0) return null; // Or show defaults/loading logic if preferred, but seed has data.

    return (
        <section className="section bg-gray-50 dark:bg-gray-900/50">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0" />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {stepsToDisplay.map((step, index) => {
                            const IconComponent = iconMap[step.icon] || MessageSquare;

                            return (
                                <motion.div
                                    key={step.id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center relative group hover:shadow-lg transition-shadow"
                                >
                                    <div className="w-16 h-16 mx-auto bg-primary-600 text-white rounded-full flex items-center justify-center mb-6 text-xl font-bold group-hover:scale-110 transition-transform">
                                        <IconComponent size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        {step.desc}
                                    </p>

                                    <div className="absolute top-4 right-4 text-4xl font-bold text-gray-100 dark:text-gray-700 -z-10">
                                        0{index + 1}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
