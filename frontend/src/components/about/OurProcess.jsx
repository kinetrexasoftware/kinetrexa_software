'use client';
import { motion } from 'framer-motion';

export default function OurProcess({ content }) {
    const {
        title = 'Our Process',
        subtitle = 'A systematic approach to delivering excellence.',
        steps = []
    } = content || {};

    const stepsToDisplay = steps.length > 0 ? steps : [];

    return (
        <section className="section bg-dark-bg text-white">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {stepsToDisplay.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            <div className="text-6xl font-bold text-white/5 mb-4 font-mono select-none">
                                {step.number}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-primary-400">{step.title}</h3>
                            <p className="text-gray-400 text-sm">
                                {step.desc}
                            </p>
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 right-0 w-full h-[1px] bg-white/10 -z-10 translate-x-1/2" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
