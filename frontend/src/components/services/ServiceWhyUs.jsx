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
        <section className="section-padding relative overflow-hidden bg-dark-bg">
            <div className="container-custom">
                <div className="glass-card border-white/5 p-8 md:p-20 relative overflow-hidden rounded-3xl">
                    {/* Background Glows */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 blur-[120px] rounded-full -z-10" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full -z-10" />

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 brand-gradient-text leading-tight text-center md:text-left">Why Partner With Us?</h2>
                        <p className="text-xl text-text-secondary max-w-2xl mb-16 leading-relaxed text-center md:text-left">
                            We bring more than just technical skills. We bring a partnership mindset focused on your long-term scalability and business growth.
                        </p>

                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-6xl mx-auto">
                            {reasons.map((reason, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-center gap-4 bg-white/[0.03] border border-white/5 p-5 rounded-2xl backdrop-blur-sm group hover:bg-white/[0.08] hover:border-brand-primary/30 transition-all duration-300"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                                        <Check className="w-5 h-5 text-brand-primary group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="font-bold text-sm text-text-primary group-hover:text-white transition-colors">{reason}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
