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
                        <div className="space-y-32">
                            {services.map((service, index) => {
                                const IconComponent = iconMap[service.icon] || Layers;
                                const isEven = index % 2 === 0;

                                return (
                                    <motion.div
                                        key={service.id || index}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.8 }}
                                        className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
                                    >
                                        {/* Image Side */}
                                        <div className="w-full lg:w-1/2 relative group">
                                            <div className="absolute inset-0 bg-brand-primary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
                                            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-dark-card/50 backdrop-blur-sm aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-500">
                                                {/* Fallback to icon if no image, but we expect images now */}
                                                {service.coverImage && service.coverImage !== 'default-service.jpg' ? (
                                                    <img
                                                        src={service.coverImage}
                                                        alt={service.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-brand-primary/5">
                                                        <IconComponent className="w-24 h-24 text-brand-primary/50" />
                                                    </div>
                                                )}

                                                {/* Overlay Gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent" />
                                            </div>
                                        </div>

                                        {/* Content Side */}
                                        <div className="w-full lg:w-1/2 space-y-8">
                                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit">
                                                <IconComponent className="w-5 h-5 text-brand-primary" />
                                                <span className="text-sm font-medium text-brand-secondary">{service.category || 'Service'}</span>
                                            </div>

                                            <h2 className="text-4xl md:text-5xl font-bold">
                                                <span className="text-white">{service.title}</span>
                                            </h2>

                                            <p className="text-lg text-text-secondary leading-relaxed">
                                                {service.description || service.shortDescription}
                                            </p>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {service.features?.slice(0, 6).map((feature, i) => (
                                                    <div key={i} className="flex items-start gap-3 group/feature">
                                                        <div className="mt-1 w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 group-hover/feature:bg-brand-primary/20 transition-colors">
                                                            <CheckCircle2 size={12} className="text-brand-primary" />
                                                        </div>
                                                        <span className="text-text-primary/80 group-hover/feature:text-white transition-colors">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="pt-4">
                                                <Link href="/contact">
                                                    <Button variant="outline" className="gap-2 group/btn">
                                                        <span>Get Started</span>
                                                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
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
