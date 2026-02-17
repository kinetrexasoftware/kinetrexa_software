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

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex gap-6 items-start p-6 rounded-2xl hover:bg-white/[0.02] transition-colors"
                        >
                            <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(14,165,233,0.1)]">
                                <benefit.icon size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-3 text-text-primary">{benefit.title}</h3>
                                <p className="text-lg text-text-secondary leading-relaxed">
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
