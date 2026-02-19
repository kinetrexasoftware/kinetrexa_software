'use client';
import { motion } from 'framer-motion';

const upcoming = [
    {
        quarter: "Q3 2024",
        title: "KineFlow Mobile App",
        desc: "Manage your workflows on the go with dedicated iOS and Android apps."
    },
    {
        quarter: "Q4 2024",
        title: "EduMate Parent Connect",
        desc: "A direct communication channel between teachers and parents."
    },
    {
        quarter: "Q1 2025",
        title: "AI Analytics Suite",
        desc: "Advanced predictive analytics for all our SaaS platforms."
    }
];

export default function ProductRoadmap() {
    return (
        <section className="section-padding bg-dark-bg relative">
            <div className="container-custom">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 brand-gradient-text">What's Next?</h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Innovation never stops. Here is what's cooking in our labs.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent -z-10" />

                    {upcoming.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="glass-card border-white/5 p-8 rounded-2xl relative group hover:border-brand-primary/30 transition-all duration-300"
                        >
                            {/* Dot on line */}
                            <div className="hidden md:block absolute -top-12 left-1/2 -translate-x-1/2 w-4 h-4 bg-dark-bg border-2 border-brand-primary rounded-full z-10">
                                <div className="absolute inset-0 bg-brand-primary/50 animate-ping rounded-full" />
                            </div>

                            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-4 block bg-brand-primary/10 px-3 py-1 rounded w-fit">
                                {item.quarter}
                            </span>
                            <h3 className="text-xl font-bold mb-3 text-text-primary group-hover:text-brand-primary transition-colors">{item.title}</h3>
                            <p className="text-text-secondary leading-relaxed text-sm">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
