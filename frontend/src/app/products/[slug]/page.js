'use client';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft, ExternalLink, CheckCircle2, Sparkles,
    Home, BarChart3, Users, Globe, Smartphone,
    Cloud, Database, Layers, Code, Cpu, Activity, Zap, Shield
} from 'lucide-react';
import { productAPI } from '@/lib/api';
import Button from '@/components/ui/Button';

const iconMap = {
    Home, BarChart3, Users, Globe, Smartphone,
    Cloud, Database, Layers, Code, Cpu, Activity, Zap, Shield
};

const getStatusStyles = (status) => {
    switch (status) {
        case 'Live':
            return 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]';
        case 'Beta':
            return 'bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]';
        case 'Coming Soon':
            return 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]';
        default:
            return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
};

export default function ProductDetailPage({ params }) {
    const { slug } = use(params);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await productAPI.getBySlug(slug);
                setProduct(res.data);
            } catch (error) {
                console.error("Error fetching product", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0B1220] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#0B1220] flex flex-col items-center justify-center text-white p-4">
                <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
                <p className="text-gray-400 mb-8">The product you are looking for does not exist or has been moved.</p>
                <Link href="/">
                    <Button>Back to Home</Button>
                </Link>
            </div>
        );
    }

    const IconComponent = iconMap[product.logo] || Sparkles;

    return (
        <main className="min-h-screen bg-[#0B1220] text-white selection:bg-primary-500/30">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Dynamic Gradient Background */}
                <div className={`absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b ${product.gradientTheme || 'from-primary-600/20'} to-transparent opacity-30 pointer-events-none`}></div>
                <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-primary-500/10 blur-[100px] rounded-full"></div>

                <div className="container-custom relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Ecosystem</span>
                    </Link>

                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative"
                        >
                            <div className={`w-32 h-32 md:w-48 md:h-48 rounded-[2rem] bg-gradient-to-br ${product.gradientTheme} flex items-center justify-center p-8 md:p-12 shadow-2xl relative z-10`}>
                                <IconComponent className="w-full h-full text-white drop-shadow-lg" />
                            </div>
                            <div className={`absolute inset-0 bg-gradient-to-br ${product.gradientTheme} blur-3xl opacity-30`}></div>
                        </motion.div>

                        <div className="flex-1 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`inline-flex px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest mb-6 ${getStatusStyles(product.status)}`}
                            >
                                {product.status}
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
                            >
                                {product.name}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl md:text-2xl text-primary-400 font-medium mb-6 uppercase tracking-wider"
                            >
                                {product.tagline}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-wrap justify-center lg:justify-start gap-4"
                            >
                                {product.status === 'Live' ? (
                                    <a href={product.websiteLink} target="_blank" rel="noopener noreferrer">
                                        <Button className="px-8 py-6 text-lg shadow-xl shadow-primary-500/20">
                                            Start Using Now
                                            <ExternalLink size={18} className="ml-2" />
                                        </Button>
                                    </a>
                                ) : (
                                    <Button className="px-8 py-6 text-lg shadow-xl shadow-primary-500/20">
                                        Join Waitlist
                                        <Sparkles size={18} className="ml-2" />
                                    </Button>
                                )}
                                <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm font-semibold flex items-center">
                                    {product.category}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Product */}
            <section className="py-20 bg-white/[0.02]">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                <Activity className="text-primary-500" />
                                About the Product
                            </h2>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-line">
                                    {product.longDescription}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                <Shield className="text-primary-500" />
                                Core Capabilities
                            </h2>
                            <div className="grid sm:grid-cols-1 gap-4">
                                {product.features?.map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-4 group hover:bg-white/[0.05] transition-colors"
                                    >
                                        <div className="mt-1 p-2 rounded-lg bg-primary-500/10 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-lg">{feature}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases Section (Visual Placeholder/Optional) */}
            <section className="py-24 border-t border-white/5">
                <div className="container-custom text-center">
                    <h2 className="text-4xl font-bold mb-16">Future-Proof Architecture</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-10 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10">
                            <Zap className="w-12 h-12 text-primary-500 mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-4">High Performance</h3>
                            <p className="text-gray-400">Optimized for low latency and high throughput in enterprise environments.</p>
                        </div>
                        <div className="p-10 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10">
                            <Cloud className="w-12 h-12 text-indigo-500 mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-4">Cloud Native</h3>
                            <p className="text-gray-400">Designed to scale horizontally across global cloud infrastructures.</p>
                        </div>
                        <div className="p-10 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10">
                            <Shield className="w-12 h-12 text-emerald-500 mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-4">Bank-Grade Security</h3>
                            <p className="text-gray-400">End-to-end encryption and multi-factor compliance as standard.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${product.gradientTheme} opacity-10 blur-[100px]`}></div>
                <div className="container-custom relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to evolve your workflow?</h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                        Experience the power of {product.name} and transform how you manage your {product.category.toLowerCase()}.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        {product.status === 'Live' ? (
                            <a href={product.websiteLink} target="_blank" rel="noopener noreferrer">
                                <Button className="px-12 py-8 text-xl">Get Started with {product.name}</Button>
                            </a>
                        ) : (
                            <Button className="px-12 py-8 text-xl">Request Early Access</Button>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
