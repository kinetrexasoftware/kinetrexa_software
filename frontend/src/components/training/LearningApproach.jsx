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
        <section className="py-20 bg-primary-900 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/dots.svg')] opacity-20" />

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">How You Will Learn</h2>
                        <p className="text-lg text-primary-100 leading-relaxed mb-8">
                            We discourage rote memorization. Our 'Do-It-Yourself' approach ensures you build muscle memory for coding. You won't just watch videos; you'll write code everyday.
                        </p>
                        <p className="text-primary-200">
                            Each module is followed by a practical assessment where you have to build something to prove your understanding.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {steps.map((step, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                                <div className="text-4xl font-bold text-secondary-400 mb-2">0{index + 1}</div>
                                <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                                <p className="text-xs text-gray-300">{step.desc}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
