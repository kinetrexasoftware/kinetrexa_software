'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Code, Smartphone, Rocket, GraduationCap, Users, Settings,
    Globe, Megaphone, PenTool, Cloud, Database, Server, Layers,
    ArrowRight, Sparkles, CheckCircle2
} from 'lucide-react';
import { serviceAPI } from '@/lib/api';
import Button from '@/components/ui/Button';

const iconMap = {
    Code, Smartphone, Rocket, GraduationCap, Users, Settings,
    Globe, Megaphone, PenTool, Cloud, Database, Server, Layers
};

export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await serviceAPI.getPublic();
                setServices(data || []);
            } catch (error) {
                console.error("Failed to load services", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-dark-bg">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-8 shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:bg-brand-primary/20 transition-colors cursor-default"
                        >
                            <span>Our Expertise</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-[1.1]">
                            <span className="block text-white mb-2">Transforming Ideas into</span>
                            <span className="block brand-gradient-text">Digital Reality.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                            We provide end-to-end technology solutions tailored to your business needs. From custom software to digital marketing, we help you scale.
                        </p>
                    </motion.div>
                </div>

                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 -z-10" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10" />
            </section>

            {/* Services Grid */}
            <section className="section-padding bg-dark-bg relative overflow-hidden">
                <div className="container-custom">
                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-80 bg-white/5 rounded-2xl border border-white/10 animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => {
                                const IconComponent = iconMap[service.icon] || Layers;

                                return (
                                    <motion.div
                                        key={service.id || index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link href={`/services/${service.slug}`} className="block h-full group">
                                            <div className="relative h-full p-8 glass-card-hover border-white/5 flex flex-col transition-all duration-300 hover:-translate-y-2">

                                                {/* Icon */}
                                                <div className="mb-8 relative">
                                                    <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20 relative z-10 group-hover:scale-110 transition-transform duration-500">
                                                        <IconComponent className="w-8 h-8 text-brand-primary group-hover:drop-shadow-[0_0_8px_rgba(14,165,233,0.6)] transition-all" />
                                                    </div>
                                                    <div className="absolute inset-0 w-16 h-16 bg-brand-primary/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                </div>

                                                <h3 className="text-2xl font-bold mb-4 text-text-primary group-hover:text-brand-primary transition-colors">
                                                    {service.title}
                                                </h3>

                                                <p className="text-text-secondary mb-8 leading-relaxed flex-grow line-clamp-3">
                                                    {service.shortDescription || service.description}
                                                </p>

                                                <div className="space-y-3 mb-8">
                                                    {service.features?.slice(0, 3).map((feature, i) => (
                                                        <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                                            <CheckCircle2 size={16} className="text-brand-primary mt-0.5" />
                                                            <span>{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex items-center gap-2 text-brand-primary font-bold text-sm group-hover:gap-3 transition-all mt-auto">
                                                    <span>View Details</span>
                                                    <ArrowRight size={16} />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Simple CTA */}
            <section className="py-24 bg-white/5 border-t border-white/5">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to start your project?</h2>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10">
                        Contact us today to discuss how we can help you transform your business with our premier technology solutions.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="rounded-full px-10 h-14 text-lg shadow-[0_0_30px_rgba(14,165,233,0.3)]">
                            Get in Touch
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
