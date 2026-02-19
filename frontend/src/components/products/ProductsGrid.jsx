'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Box, CreditCard, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const products = [
    {
        id: "kineflow",
        icon: Box,
        name: "KineFlow",
        tagline: "Intelligent workflow automation platform.",
        status: "Beta",
        statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
        color: "text-blue-600"
    },
    {
        id: "edumate",
        icon: CreditCard,
        name: "EduMate",
        tagline: "Complete management system for educational institutes.",
        status: "Live",
        statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
        color: "text-green-600"
    },
    {
        id: "healthsync",
        icon: Activity,
        name: "HealthSync",
        tagline: "Patient monitoring and clinic management made easy.",
        status: "Coming Soon",
        statusColor: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
        color: "text-orange-600"
    }
];

export default function ProductsGrid() {
    return (
        <section className="section-padding bg-dark-bg relative overflow-hidden">
            <div className="container-custom">
                <div className="grid md:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`#${product.id}`} className="block h-full group">
                                <div className="glass-card-hover border-white/5 p-8 h-full flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-2">
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <product.icon size={120} className={`transform group-hover:rotate-12 transition-transform duration-700 ${product.color}`} />
                                    </div>

                                    <div className="flex justify-between items-start mb-8 relative z-10">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ${product.statusColor.replace('text-', 'bg-').split(' ')[0]} bg-opacity-10 border border-white/10`}>
                                            <product.icon size={32} className={product.color} />
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${product.statusColor.includes('blue') ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : product.statusColor.includes('green') ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'}`}>
                                            {product.status}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-brand-primary transition-colors relative z-10">
                                        {product.name}
                                    </h3>
                                    <p className="text-text-secondary mb-8 min-h-[50px] leading-relaxed relative z-10">
                                        {product.tagline}
                                    </p>

                                    <div className="mt-auto relative z-10">
                                        <div className={`flex items-center gap-2 font-bold text-sm uppercase tracking-wide group-hover:gap-3 transition-all ${product.color}`}>
                                            <span>View Details</span>
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
