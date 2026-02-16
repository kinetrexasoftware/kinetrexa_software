'use client';
import { motion } from 'framer-motion';
import { UserCheck, ShieldCheck, Zap, RefreshCw } from 'lucide-react';

const philosophy = [
    {
        icon: UserCheck,
        title: "User-First Design",
        desc: "We prioritize usability. Features are useless if they are hard to use. We design for clarity and ease."
    },
    {
        icon: Zap,
        title: "Scalable Architecture",
        desc: "Built for growth. Our products handle increased loads seamlessly without performance degradation."
    },
    {
        icon: RefreshCw,
        title: "Continuous Improvement",
        desc: "We iterate fast. Regular updates based on user feedback ensure our products get better every day."
    },
    {
        icon: ShieldCheck,
        title: "Security & Privacy",
        desc: "Data safety is paramount. We implement enterprise-grade security standards across all products."
    }
];

export default function ProductPhilosophy() {
    return (
        <section className="section bg-gray-50 dark:bg-gray-900/50">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Build Philosophy</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        We adhere to strict principles to ensure every product we release is world-class.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {philosophy.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                        >
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 text-primary-600 rounded-lg flex items-center justify-center mb-6">
                                <item.icon size={24} />
                            </div>
                            <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
