'use client';
import { motion } from 'framer-motion';
import { Award, Briefcase, FileText, UserPlus } from 'lucide-react';

const benefits = [
    {
        icon: FileText,
        title: "Experience Certificate",
        desc: "Receive a valid internship completion certificate verified by KineTrexa."
    },
    {
        icon: Briefcase,
        title: "Live Project Portfolio",
        desc: "Add real-world projects to your CV that you have actually built and deployed."
    },
    {
        icon: UserPlus,
        title: "Mentorship & Networking",
        desc: "Connect with senior developers and other interns. Grow your professional network."
    },
    {
        icon: Award,
        title: "Letter of Recommendation",
        desc: "Top performers receive a personalized LOR for future job applications."
    }
];

export default function InternshipBenefits() {
    return (
        <section className="section bg-white dark:bg-dark-bg">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits & Outcomes</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        More than just experience. We ensure you leave with tangible assets for your career.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex gap-4 items-start"
                        >
                            <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <benefit.icon size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {benefit.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
