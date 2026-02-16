'use client';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const reasons = [
    "Product-Driven Mindset",
    "Clean Code Practices",
    "Transparent Communication",
    "Scalable Solutions",
    "Dedicated Support Team",
    "Modern Tech Stack",
    "Agile Methodology",
    "User-Centric Design"
];

export default function ServiceWhyUs() {
    return (
        <section className="section">
            <div className="container-custom">
                <div className="bg-primary-900 rounded-3xl p-8 md:p-16 text-white text-center relative overflow-hidden">
                    {/* Background blob */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-600/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Partner With Us?</h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
                            We bring more than just coding skills to the table. We bring a partnership mindset focused on your long-term success.
                        </p>

                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-5xl mx-auto">
                            {reasons.map((reason, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-center gap-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm"
                                >
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4 text-green-400" />
                                    </div>
                                    <span className="font-medium text-sm">{reason}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
