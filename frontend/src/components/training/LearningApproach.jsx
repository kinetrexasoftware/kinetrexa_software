'use client';
import { motion } from 'framer-motion';

const steps = [
    { title: "Concept", desc: "Understand the 'Why' behind every technology." },
    { title: "Practice", desc: "Hands-on coding exercises and mini-tasks." },
    { title: "Implement", desc: "Build full-scale projects applying learned concepts." },
    { title: "Review", desc: "Code reviews and optimization feedback from mentors." }
];

export default function LearningApproach() {
    return (
        <section className="section-padding relative overflow-hidden bg-dark-bg">
            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 brand-gradient-text leading-tight">How You Will Learn</h2>
                        <p className="text-lg text-text-secondary leading-relaxed mb-8">
                            We discourage rote memorization. Our 'Do-It-Yourself' approach ensures you build muscle memory for coding. You won't just watch videos; you'll write code everyday.
                        </p>
                        <p className="text-text-muted italic border-l border-brand-primary/20 pl-6">
                            Each module is followed by a practical assessment where you have to build something to prove your understanding.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {steps.map((step, index) => (
                            <div key={index} className="glass-card-hover border-white/5 p-8 relative overflow-hidden group">
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-primary/10 rounded-full blur-xl group-hover:bg-brand-primary/20 transition-colors" />
                                <div className="text-4xl font-black text-brand-primary mb-4 opacity-50 group-hover:opacity-100 transition-opacity">0{index + 1}</div>
                                <h3 className="font-bold text-xl mb-2 text-text-primary">{step.title}</h3>
                                <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
