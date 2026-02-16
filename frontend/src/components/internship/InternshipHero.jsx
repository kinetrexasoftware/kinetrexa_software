'use client';
import { motion } from 'framer-motion';

export default function InternshipHero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-primary-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-3xl" />

            <div className="container-custom relative z-10 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-secondary-900/50 border border-secondary-500/50 text-secondary-400 font-semibold text-sm mb-6">
                        CAREER ACCELERATOR
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Launch Your Career with <br />
                        <span className="text-secondary-400">
                            Real-World Experience
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Join KineTrexa's internship program to work on live projects, learn from industry experts, and build a portfolio that stands out.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
