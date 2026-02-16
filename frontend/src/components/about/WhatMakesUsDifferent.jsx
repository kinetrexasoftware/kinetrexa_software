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
        <section className="section">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {itemsToDisplay.map((item, index) => {
                        const IconComponent = iconMap[item.icon] || Zap;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex gap-4"
                            >
                                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 flex items-center justify-center flex-shrink-0">
                                    <IconComponent size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
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
