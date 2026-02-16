'use client';
import { motion } from 'framer-motion';

export default function AboutHero() {
    return (
        <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-bg dark:to-gray-900 border-b dark:border-gray-800">
            <div className="container-custom relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 font-semibold text-sm mb-6">
                        WHO WE ARE
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Innovators. Educators. <br />
                        <span className="text-primary-600">Builders of Tomorrow.</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        KineTrexa is a technology startup focused on delivering high-quality digital solutions while empowering the next generation of tech talent.
                    </p>
                </motion.div>
            </div>
            {/* Decorative background blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </section>
    );
}
