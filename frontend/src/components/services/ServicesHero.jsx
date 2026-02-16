'use client';
import { motion } from 'framer-motion';

export default function ServicesHero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-dark-bg">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-900/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-900/20 rounded-full blur-3xl -z-10" />

            <div className="container-custom relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-primary-900/30 border border-primary-500/30 text-primary-400 font-semibold text-sm mb-6">
                        OUR EXPERTISE
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
                        Digital Solutions Built for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                            Scale & Performance
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        From MVP to Enterprise, we build technology that drives your business forward. Reliable code, modern architecture, and user-centric design.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
