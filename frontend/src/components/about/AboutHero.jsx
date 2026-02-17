'use client';
import { motion } from 'framer-motion';

export default function AboutHero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="container-custom relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-8"
                    >
                        <span>Who We Are</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight brand-gradient-text leading-tight">
                        Innovators. Educators. <br />
                        Builders of Tomorrow.
                    </h1>

                    <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        KineTrexa is a technology startup focused on delivering high-quality digital solutions while empowering the next generation of tech talent.
                    </p>
                </motion.div>
            </div>

            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 -z-10" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 -z-10" />
        </section>
    );
}
