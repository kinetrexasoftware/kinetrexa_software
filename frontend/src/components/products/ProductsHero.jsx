'use client';
import { motion } from 'framer-motion';

export default function ProductsHero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white dark:bg-dark-bg">
            <div className="container-custom relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 font-semibold text-sm mb-6 border border-secondary-200 dark:border-secondary-800">
                        OUR PRODUCTS
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Software Designed to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-600 to-primary-600">
                            Solve & Simplify
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        We don't just write code; we build products. From productivity tools to enterprise platforms, our suite of SaaS applications addresses real-world challenges with elegance and speed.
                    </p>
                </motion.div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </section>
    );
}
