'use client';
import { motion } from 'framer-motion';
import { UserCheck, ShieldCheck, Zap, RefreshCw } from 'lucide-react';

const philosophy = [
    {
        icon: UserCheck,
        title: "User-First Design",
        desc: "We prioritize usability. Features are useless if they are hard to use. We design for clarity and ease."
    },
    {
        icon: Zap,
        title: "Scalable Architecture",
        desc: "Built for growth. Our products handle increased loads seamlessly without performance degradation."
    },
    {
        icon: RefreshCw,
        title: "Continuous Improvement",
        desc: "We iterate fast. Regular updates based on user feedback ensure our products get better every day."
    },
    {
        icon: ShieldCheck,
        title: "Security & Privacy",
        desc: "Data safety is paramount. We implement enterprise-grade security standards across all products."
    }
];

export default function ProductPhilosophy() {
    return (
        <section className="section bg-dark-bg relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] rounded-full -z-10" />

            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 brand-gradient-text">Our Build Philosophy</h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        We adhere to strict principles to ensure every product we release is world-class.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {philosophy.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card-hover border-white/5 p-8 rounded-2xl group"
                        >
                            <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                                <item.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-text-primary group-hover:text-brand-primary transition-colors">{item.title}</h3>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
