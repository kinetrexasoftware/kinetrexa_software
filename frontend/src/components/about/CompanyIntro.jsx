'use client';
import { motion } from 'framer-motion';

export default function CompanyIntro() {
    return (
        <section className="section-padding relative overflow-hidden bg-dark-bg">
            {/* Ambient background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/[0.03] blur-[100px] rounded-full -z-10" />

            <div className="container-custom">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                            Our Story
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold brand-gradient-text leading-tight">
                            Building the Future, <br /> One Solution at a Time.
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8 text-text-secondary text-xl leading-relaxed max-w-3xl mx-auto"
                    >
                        <p>
                            KineTrexa started with a simple yet ambitious goal: to bridge the gap between complex technology and real-world business needs. We saw too many companies struggling with bloated software and confusing processes. We knew there had to be a better way.
                        </p>
                        <p>
                            Founded by a team of engineers and educators, we didn't just want to build apps; we wanted to build solutions that matter. From our first project to now serving global clients, our focus has remained unchanged: solving real problems with clean, efficient code.
                        </p>
                        <p>
                            But we didn't stop at development. Recognizing the gap in industry-ready talent, we launched our training and internship programs. Today, we're not just building software; we're building the next generation of developers who will shape the future of tech.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
