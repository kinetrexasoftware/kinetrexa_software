'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowRight, Sparkles, Home, BarChart3, Users,
    Globe, Smartphone, Cloud, Database, Layers,
    Code, Cpu, Activity, Zap, Shield, ExternalLink
} from 'lucide-react';
import { productAPI } from '@/lib/api';
import Button from '@/components/ui/Button';

const iconMap = {
    Home, BarChart3, Users, Globe, Smartphone,
    Cloud, Database, Layers, Code, Cpu, Activity, Zap, Shield
};

const StatusBadge = ({ status }) => {
    const styles = {
        'Live': 'badge-live',
        'Beta': 'badge-beta',
        'Coming Soon': 'badge-coming'
    };

    return (
        <span className={`badge ${styles[status] || 'bg-white/5 text-gray-400'}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {status}
        </span>
    );
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
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-[450px] rounded-2xl bg-white/5 animate-pulse border border-white/10"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    const featuredProducts = products.filter(p => p.isActive).slice(0, 3);
    const hasMore = products.length > 3;

    return (
        <section className="relative section-padding overflow-hidden">
            <div className="container-custom relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-6"
                    >
                        <Sparkles size={12} className="animate-pulse" />
                        <span>Our Marketplace</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6 brand-gradient-text"
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed"
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
                                className="h-full"
                            >
                                <Link href={`/products/${product.slug}`} className="block h-full group">
                                    <div className="h-full glass-card-hover p-8 flex flex-col items-center text-center">

                                        {/* Logo Section */}
                                        <div className="mb-10 relative">
                                            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-5 shadow-2xl relative z-10 group-hover:scale-110 group-hover:border-brand-primary/30 transition-all duration-500">
                                                <IconComponent className="w-full h-full text-brand-primary drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]" />
                                            </div>
                                            {/* Glow Background */}
                                            <div className="absolute inset-0 bg-brand-primary/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>

                                        {/* Content */}
                                        <div className="mb-8 flex-grow">
                                            <div className="mb-4">
                                                <StatusBadge status={product.status} />
                                            </div>
                                            <h3 className="text-2xl font-bold mb-2 text-text-primary group-hover:text-brand-primary transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-xs font-bold text-brand-primary/80 uppercase tracking-widest mb-4">
                                                {product.tagline}
                                            </p>
                                            <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                                                {product.shortDescription || product.description}
                                            </p>
                                        </div>

                                        {/* CTA Button */}
                                        <div className="w-full mt-auto mb-2">
                                            <Button
                                                className="w-full h-12"
                                                variant={product.status === 'Live' ? 'primary' : 'outline'}
                                            >
                                                <span>{product.status === 'Live' ? 'Visit Product' : 'View Details'}</span>
                                                {product.status === 'Live' ? <ExternalLink className="ml-2 w-4 h-4" /> : <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                            </Button>
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
                        viewport={{ once: true }}
                        className="mt-20 text-center"
                    >
                        <Link href="/products">
                            <Button variant="outline" size="lg" className="rounded-full shadow-lg h-14 px-10">
                                <span>Explore Full Ecosystem</span>
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

