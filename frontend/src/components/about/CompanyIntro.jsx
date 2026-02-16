'use client';
import { motion } from 'framer-motion';

export default function CompanyIntro() {
    return (
        <section className="py-16 md:py-24 bg-white dark:bg-dark-bg">
            <div className="container-custom">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold mb-6"
                    >
                        Our Story
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="space-y-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed"
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
