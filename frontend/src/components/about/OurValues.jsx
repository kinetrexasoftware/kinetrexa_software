'use client';
import { motion } from 'framer-motion';
import { Heart, Lightbulb, TrendingUp, Users, ShieldCheck } from 'lucide-react';

const iconMap = {
    ShieldCheck, Lightbulb, Heart, TrendingUp, Users
};

export default function OurValues({ content }) {
    const {
        title = 'Our Core Values',
        subtitle = 'The principles that guide everything we do.',
        values = []
    } = content || {};

    const valuesToDisplay = values.length > 0 ? values : [];

    return (
        <section className="section">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">{subtitle}</p>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {valuesToDisplay.map((val, index) => {
                        const IconComponent = iconMap[val.icon] || ShieldCheck;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(20%-20px)] p-6 rounded-xl text-center bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="w-12 h-12 mx-auto bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-full flex items-center justify-center mb-4">
                                    <IconComponent size={24} />
                                </div>
                                <h3 className="font-bold mb-2">{val.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{val.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
