'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowRight, Sparkles, Home, BarChart3, Users,
    Globe, Smartphone, Cloud, Database, Layers,
    Code, Cpu, Activity, Zap, Shield
} from 'lucide-react';
import { productAPI } from '@/lib/api';

const iconMap = {
    Home, BarChart3, Users, Globe, Smartphone,
    Cloud, Database, Layers, Code, Cpu, Activity, Zap, Shield
};

const getStatusStyles = (status) => {
    switch (status) {
        case 'Live':
            return 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_12px_rgba(34,197,94,0.3)]';
        case 'Beta':
            return 'bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_12px_rgba(168,85,247,0.3)]';
        case 'Coming Soon':
            return 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.3)]';
        default:
            return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
};

export default function OurProducts({ content }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const {
        title = 'Innovative Products',
        subtitle = 'Building the next generation of digital infrastructure and business tools.'
    } = content || {};

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productAPI.getPublic();
                setProducts(data || []);
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <section className="py-24 bg-[#0B1220]">
                <div className="container-custom">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-[400px] rounded-2xl bg-white/5 animate-pulse border border-white/10"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    const featuredProducts = products.filter(p => p.isActive).slice(0, 3);
    const hasMore = products.length > 3;

    return (
        <section className="relative py-24 bg-gradient-to-b from-[#0B1220] to-[#0E1A2B] overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-600/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container-custom relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <Sparkles size={14} />
                        <span>Featured Ecosystem</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight"
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {featuredProducts.map((product, index) => {
                        const IconComponent = iconMap[product.logo] || Sparkles;

                        return (
                            <motion.div
                                key={product.id || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={`/products/${product.slug}`} className="block group h-full">
                                    <div className="relative h-full p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-white/[0.07] group-hover:border-primary-500/50 group-hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.3)] flex flex-col">

                                        {/* Logo Container */}
                                        <div className="flex justify-center mb-8 relative">
                                            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${product.gradientTheme || 'from-primary-500 to-indigo-600'} flex items-center justify-center p-5 shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500`}>
                                                <IconComponent className="w-full h-full text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]" />
                                            </div>
                                            {/* Logo Reflection/Glow */}
                                            <div className={`absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br ${product.gradientTheme} blur-2xl rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-500 shadow-2xl`}></div>
                                        </div>

                                        <div className="text-center mb-6">
                                            <div className={`inline-flex px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest mb-4 transition-all duration-500 ${getStatusStyles(product.status)}`}>
                                                {product.status}
                                            </div>
                                            <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-primary-400 transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm font-semibold text-primary-400/80 uppercase tracking-wider">
                                                {product.tagline}
                                            </p>
                                        </div>

                                        <p className="text-gray-400 mb-8 leading-relaxed flex-grow text-center text-sm italic">
                                            "{product.shortDescription || product.description}"
                                        </p>

                                        <div className="flex justify-center">
                                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold text-sm transition-all duration-300 group-hover:bg-primary-500 group-hover:border-primary-500 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.5)]">
                                                <span>{product.status === 'Live' ? 'Visit Product' : 'View Details'}</span>
                                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>

                                        {/* Corner Accent */}
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Sparkles size={16} className="text-primary-500 animate-pulse" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {hasMore && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-20 text-center"
                    >
                        <Link href="/products" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 hover:border-primary-500/50 transition-all duration-300 group shadow-lg">
                            <span>Explore Full Ecosystem</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

