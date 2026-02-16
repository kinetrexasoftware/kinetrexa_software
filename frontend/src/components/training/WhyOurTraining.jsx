'use client';
import { motion } from 'framer-motion';
import { Briefcase, Users, BookOpen, MonitorPlay } from 'lucide-react';

const benefits = [
    {
        icon: MonitorPlay,
        title: "Real-World Projects",
        desc: "No toy apps. You will build functional clones of popular platforms and custom solutions."
    },
    {
        icon: BookOpen,
        title: "Industry-Relevant Curriculum",
        desc: "Updated every quarter to include the latest libraries, frameworks, and best practices."
    },
    {
        icon: Users,
        title: "Expert Mentorship",
        desc: "Learn from developers who are currently working in the industry, not just academics."
    },
    {
        icon: Briefcase,
        title: "Portfolio Development",
        desc: "By the end of the course, you will have a GitHub profile worth showing to recruiters."
    }
];

export default function WhyOurTraining() {
    return (
        <section className="section bg-white dark:bg-dark-bg">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Training?</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Designed for results. We focus on what fundamentally makes a good developer.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 dark:bg-gray-800/30 p-6 rounded-2xl text-center hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="w-12 h-12 mx-auto bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-xl flex items-center justify-center mb-4">
                                <benefit.icon size={24} />
                            </div>
                            <h3 className="font-bold mb-2 text-lg">{benefit.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {benefit.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
