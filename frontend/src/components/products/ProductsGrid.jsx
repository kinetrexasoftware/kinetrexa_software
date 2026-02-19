'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Box, CreditCard, Activity, Globe, Smartphone, Cloud, Database, Layers, Code, Cpu, Zap, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { productAPI } from '@/lib/api';

const iconMap = {
    Box, CreditCard, Activity, Globe, Smartphone, Cloud, Database, Layers, Code, Cpu, Zap, Shield, Sparkles
};

export default function ProductsGrid() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const getStatusColor = (status) => {
        switch (status) {
            case 'Live': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-500/20';
            case 'Beta': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-500/20';
            default: return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border-orange-500/20'; // Coming Soon
        }
    };

    const getIconColor = (status) => {
        switch (status) {
            case 'Live': return 'text-green-600';
            case 'Beta': return 'text-blue-600';
            default: return 'text-orange-600';
        }
    };

    if (loading) {
        return (
            <section className="section-padding bg-dark-bg">
                <div className="container-custom text-center text-gray-500">Loading products...</div>
            </section>
        );
    }

    return (
        <section className="section-padding bg-dark-bg relative overflow-hidden" id="products">
            <div className="container-custom">
                <div className="grid md:grid-cols-3 gap-8">
                    {products.map((product, index) => {
                        const IconComponent = iconMap[product.logo] || Box;
                        const statusColor = getStatusColor(product.status);
                        const iconColor = getIconColor(product.status);

                        return (
                            <motion.div
                                key={product._id || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="block h-full group">
                                    <div className="glass-card-hover border-white/5 p-8 h-full flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-2">
                                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <IconComponent size={120} className={`transform group-hover:rotate-12 transition-transform duration-700 ${iconColor}`} />
                                        </div>

                                        <div className="flex justify-between items-start mb-8 relative z-10">
                                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 bg-white/5 border border-white/10`}>
                                                <IconComponent size={32} className={iconColor} />
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${statusColor}`}>
                                                {product.status}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-brand-primary transition-colors relative z-10">
                                            {product.name}
                                        </h3>
                                        <p className="text-text-secondary mb-8 min-h-[50px] leading-relaxed relative z-10">
                                            {product.tagline}
                                        </p>

                                        <div className="mt-auto relative z-10 space-y-3">
                                            {/* Android Link */}
                                            {product.androidLink && (
                                                <Link href={product.androidLink} target="_blank" className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-medium text-white group/btn">
                                                    <Smartphone size={16} className="text-brand-primary" />
                                                    <span>Download App</span>
                                                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 group-hover/btn:ml-0 transition-all" />
                                                </Link>
                                            )}

                                            {/* Web Link */}
                                            {product.websiteLink && (
                                                <Link href={product.websiteLink} target="_blank" className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-medium text-white group/btn">
                                                    <Globe size={16} className="text-brand-secondary" />
                                                    <span>Web Portal</span>
                                                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 group-hover/btn:ml-0 transition-all" />
                                                </Link>
                                            )}

                                            {/* Fallback View Details if Coming Soon or No Links */}
                                            {!product.androidLink && !product.websiteLink && (
                                                <div className={`flex items-center gap-2 font-bold text-sm uppercase tracking-wide opacity-50 cursor-not-allowed ${iconColor}`}>
                                                    <span>Details Coming Soon</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
