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
        <section className="section-padding bg-dark-bg relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full -z-10" />

            <div className="container-custom relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 brand-gradient-text">How We Deliver</h2>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        Our proven workflow ensures transparency and quality at every step.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card-hover border-white/5 p-8 rounded-2xl relative overflow-hidden group"
                        >
                            <div className="text-6xl font-black text-white/5 mb-6 group-hover:text-brand-primary/10 transition-colors duration-500 font-mono select-none">
                                {step.num}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-brand-primary transition-colors">{step.title}</h3>
                            <p className="text-text-secondary leading-relaxed text-sm">{step.desc}</p>

                            {/* Subtle line connection */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-12 -right-4 w-8 h-[1px] bg-white/10" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
