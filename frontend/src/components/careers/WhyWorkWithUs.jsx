'use client';
import { motion } from 'framer-motion';
import { Rocket, GraduationCap, Users, Heart } from 'lucide-react';

const benefits = [
    {
        icon: Rocket,
        title: "Real Impact",
        desc: "Don't just fix bugs. Build features that actual people use."
    },
    {
        icon: GraduationCap,
        title: "Continuous Learning",
        desc: "We sponsor courses and provide mentorship to help you upskill."
    },
    {
        icon: Users,
        title: "Collaborative Culture",
        desc: "No silos. Work directly with founders, designers, and engineers."
    },
    {
        icon: Heart,
        title: "People First",
        desc: "Flexible hours, honest feedback, and a healthy work-life balance."
    }
];

export default function WhyWorkWithUs() {
    return (
        <section className="section bg-white dark:bg-dark-bg">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why KineTrexa?</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        We are a startup with big ambitions. If you have the hunger to learn, this is the place for you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center p-6 border-transparent border hover:border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl transition-all"
                        >
                            <div className="w-14 h-14 mx-auto bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-full flex items-center justify-center mb-4">
                                <item.icon size={26} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
