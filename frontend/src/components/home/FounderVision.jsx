'use client';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function FounderVision({ content }) {
    const {
        quote = "At KineTrexa, we don't just write code; we engineer possibilities. Our vision is to bridge the gap between academic learning and industry demands while delivering world-class digital solutions to our clients.",
        author = "Shahe Alam",
        designation = "Founder & CEO, KineTrexa"
    } = content || {};

    return (
        <section className="py-20 bg-dark-bg text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary-900/20 to-transparent pointer-events-none" />
            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <Quote className="w-12 h-12 text-primary-500 mx-auto mb-8 opacity-50" />

                        <h2 className="text-2xl md:text-4xl font-light italic leading-relaxed mb-8">
                            "{quote}"
                        </h2>

                        <div>
                            <h3 className="text-xl font-bold">{author}</h3>
                            <p className="text-primary-400">{designation}</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
