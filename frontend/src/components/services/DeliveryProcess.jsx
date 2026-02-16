'use client';
import { motion } from 'framer-motion';

const steps = [
    {
        num: "01",
        title: "Requirement Analysis",
        desc: "We start by listening. We define goals, scope, and technical requirements."
    },
    {
        num: "02",
        title: "Design & Development",
        desc: "We create UI prototypes and build the system using agile methodologies."
    },
    {
        num: "03",
        title: "Testing & QA",
        desc: "Rigorous testing to ensure bug-free, secure, and performant delivery."
    },
    {
        num: "04",
        title: "Deployment & Support",
        desc: "We launch your product and provide continuous maintenance and improvements."
    }
];

export default function DeliveryProcess() {
    return (
        <section className="section bg-gray-50 dark:bg-gray-900/50">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Deliver</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Our proven workflow ensures transparency and quality at every step.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:border-primary-500 transition-colors"
                        >
                            <div className="text-5xl font-bold text-gray-100 dark:text-gray-700 mb-4 group-hover:text-primary-50 dark:group-hover:text-primary-900/20 transition-colors">
                                {step.num}
                            </div>
                            <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
