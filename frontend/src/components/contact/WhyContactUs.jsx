'use client';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, MessageSquare } from 'lucide-react';

const reasons = [
    {
        icon: Clock,
        title: "Quick Response",
        desc: "We value your time. Expect a reply within 24 working hours."
    },
    {
        icon: ShieldCheck,
        title: "Data Privacy",
        desc: "Your details are safe with us. We never spam or share your data."
    },
    {
        icon: MessageSquare,
        title: "Transparent Communication",
        desc: "No hidden agendas. We believe in honest and open dialogue."
    }
];

export default function WhyContactUs() {
    return (
        <section className="section bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-gray-800">
            <div className="container-custom">
                <div className="grid md:grid-cols-3 gap-8">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex gap-4 items-start"
                        >
                            <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center flex-shrink-0">
                                <reason.icon size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">{reason.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{reason.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
