'use client';
import { motion } from 'framer-motion';
import { Code, Server, Smartphone, Layout } from 'lucide-react';

const learningPoints = [
    {
        icon: Code,
        title: "Production-Grade Code",
        desc: "Learn to write clean, maintainable, and scalable code that meets industry standards."
    },
    {
        icon: Server,
        title: "Modern Tech Stack",
        desc: "Get hands-on experience with technologies like Next.js, React, Node.js, and cloud platforms."
    },
    {
        icon: Smartphone,
        title: "Agile Workflows",
        desc: "Participate in daily standups, sprint planning, and code reviews just like a full-time employee."
    },
    {
        icon: Layout,
        title: "Product Ownership",
        desc: "Take ownership of features from concept to deployment. See your work live in production."
    }
];

export default function InternshipLearning() {
    return (
        <section className="section-padding bg-white dark:bg-dark-bg">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">What You Will Learn</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        This is not just about watching tutorials. It is about doing the work.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {learningPoints.map((point, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/30 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors"
                        >
                            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-xl flex items-center justify-center mb-4">
                                <point.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{point.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {point.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
