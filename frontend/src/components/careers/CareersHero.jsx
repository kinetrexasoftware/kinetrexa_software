'use client';
import { motion } from 'framer-motion';

export default function CareersHero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-primary-900 text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute top-20 right-20 w-[200px] h-[200px] bg-blue-500/10 rounded-full blur-2xl -z-10" />

            <div className="container-custom relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-secondary-900/50 border border-secondary-500/30 text-secondary-400 font-semibold text-sm mb-6">
                        GROW WITH US
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Build the Future. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-white">
                            Shape Your Career.
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        At KineTrexa, work is more than just a job. It's about learning, innovating, and solving real-world challenges with a team that supports your growth.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
