'use client';
import { motion } from 'framer-motion';

const upcoming = [
    {
        quarter: "Q3 2024",
        title: "KineFlow Mobile App",
        desc: "Manage your workflows on the go with dedicated iOS and Android apps."
    },
    {
        quarter: "Q4 2024",
        title: "EduMate Parent Connect",
        desc: "A direct communication channel between teachers and parents."
    },
    {
        quarter: "Q1 2025",
        title: "AI Analytics Suite",
        desc: "Advanced predictive analytics for all our SaaS platforms."
    }
];

export default function ProductRoadmap() {
    return (
        <section className="section bg-white dark:bg-dark-bg">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Next?</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Innovation never stops. Here is what's cooking in our labs.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {upcoming.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl border-l-4 border-l-primary-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <span className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-2 block">
                                {item.quarter}
                            </span>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
