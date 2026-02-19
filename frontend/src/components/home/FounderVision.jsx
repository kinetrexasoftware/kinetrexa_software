'use client';
import { motion } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';

export default function FounderVision({ content }) {
    const {
        quote = "At KineTrexa, we don't just write code; we engineer possibilities. Our vision is to bridge the gap between academic learning and industry demands while delivering world-class digital solutions to our clients.",
        author = "Shahe Aalam Ansari",
        designation = "Director & Founder, KineTrexa"
    } = content || {};

    return (
        <section className="section-padding relative overflow-hidden">
            <div className="container-custom relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-12"
                        >
                            <Sparkles size={12} className="animate-pulse" />
                            <span>Leadership Vision</span>
                        </motion.div>

                        <div className="relative mb-12">
                            <Quote className="absolute -top-12 -left-4 w-24 h-24 text-brand-primary/5 -z-10" />
                            <h2 className="text-3xl md:text-5xl font-light italic leading-tight text-text-primary glass-card p-8 md:p-12 border-white/5 bg-brand-primary/[0.02]">
                                "{quote}"
                            </h2>
                            <Quote className="absolute -bottom-12 -right-4 w-24 h-24 text-brand-primary/5 rotate-180 -z-10" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold brand-gradient-text tracking-tight">{author}</h3>
                            <p className="text-brand-primary font-bold uppercase tracking-[0.2em] text-xs">{designation}</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Ambient glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-primary/5 blur-[150px] -z-10 rounded-[100%]" />
        </section>
    );
}
