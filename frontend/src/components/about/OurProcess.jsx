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
        <section className="section-padding relative overflow-hidden bg-dark-bg">
            <div className="container-custom">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 brand-gradient-text">{title}</h2>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-12">
                    {stepsToDisplay.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="text-7xl font-black text-brand-primary/10 mb-6 font-mono select-none group-hover:text-brand-primary/20 transition-colors">
                                {step.number}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-brand-primary group-hover:brand-gradient-text transition-all">{step.title}</h3>
                            <p className="text-text-secondary leading-relaxed">
                                {step.desc}
                            </p>

                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-12 right-0 w-1/2 h-[1px] bg-gradient-to-r from-brand-primary/30 to-transparent -z-10 translate-x-12" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
