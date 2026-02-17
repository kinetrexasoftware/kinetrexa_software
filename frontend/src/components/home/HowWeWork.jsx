'use client';
import { motion } from 'framer-motion';
import { MessageSquare, PenTool, Code2, Rocket, Search, Lightbulb, Settings, Flag, Sparkles } from 'lucide-react';

const iconMap = {
    MessageSquare, PenTool, Code2, Rocket, Search, Lightbulb, Settings, Flag
};

export default function HowWeWork({ content }) {
    const {
        title = 'How We Work',
        subtitle = 'A transparent and efficient process to bring your vision to life.',
        steps = []
    } = content || {};

    const stepsToDisplay = steps.length > 0 ? steps : [];

    if (stepsToDisplay.length === 0) return null;

    return (
        <section className="section-padding relative overflow-hidden">
            <div className="container-custom relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-6"
                    >
                        <Sparkles size={12} className="animate-pulse" />
                        <span>Our Process</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6 brand-gradient-text"
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[45%] left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent z-0" />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {stepsToDisplay.map((step, index) => {
                            const IconComponent = iconMap[step.icon] || MessageSquare;

                            return (
                                <motion.div
                                    key={step.id || index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass-card-hover p-8 border-white/5 text-center flex flex-col items-center"
                                >
                                    <div className="w-20 h-20 mx-auto bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 group-hover:bg-brand-primary/20 transition-all duration-300">
                                        <IconComponent size={32} />
                                        <div className="absolute -inset-2 bg-brand-primary/10 blur-xl rounded-full -z-10 group-hover:bg-brand-primary/30 opacity-0 group-hover:opacity-100 transition-all" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-text-primary group-hover:text-brand-primary transition-colors">{step.title}</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">
                                        {step.desc}
                                    </p>

                                    <div className="absolute top-4 right-6 text-5xl font-black text-white/[0.03] group-hover:text-brand-primary/[0.05] transition-colors -z-10 select-none">
                                        {index + 1}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        </section>
    );
}
