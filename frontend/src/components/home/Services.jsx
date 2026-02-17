'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Code, Smartphone, Rocket, GraduationCap, Users, Settings,
    Globe, Megaphone, PenTool, Cloud, Database, Server, Layers,
    ArrowRight, Sparkles
} from 'lucide-react';
import { serviceAPI } from '@/lib/api';

const iconMap = {
    Code, Smartphone, Rocket, GraduationCap, Users, Settings,
    Globe, Megaphone, PenTool, Cloud, Database, Server, Layers
};

export default function Services({ content }) {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const {
        title = 'Innovative Solutions',
        subtitle = 'Explore our comprehensive range of high-end technology services designed to empower your business.'
    } = content || {};

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

    if (loading) {
        return (
            <section className="py-24 bg-[#0B1220] text-white">
                <div className="container-custom text-center">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-10 w-64 bg-white/10 rounded-lg mb-4"></div>
                        <div className="h-4 w-96 bg-white/5 rounded-lg mb-16"></div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-64 bg-white/5 rounded-2xl border border-white/10"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    const featuredServices = services.slice(0, 6);
    const hasMore = services.length > 6;

    return (
        <section className="relative py-24 bg-gradient-to-b from-[#0B1220] to-[#0E1A2B] overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-primary-600/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary-600/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="container-custom relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-semibold mb-4"
                    >
                        <Sparkles size={14} />
                        <span>Professional Services</span>
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

                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredServices.map((service, index) => {
                        const IconComponent = iconMap[service.icon] || Layers;

                        return (
                            <motion.div
                                key={service.id || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={`/services/${service.slug}`} className="block group h-full">
                                    <div className="relative h-full p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-white/[0.08] group-hover:border-primary-500/50 group-hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.3)] flex flex-col">

                                        {/* Icon Container */}
                                        <div className="mb-8 relative">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 flex items-center justify-center border border-primary-500/20 relative z-10 group-hover:scale-110 transition-transform duration-500">
                                                <IconComponent className="w-7 h-7 text-primary-400 group-hover:text-primary-300 group-hover:drop-shadow-[0_0_8px_rgba(14,165,233,0.6)] transition-all" />
                                            </div>
                                            {/* Icon Glow */}
                                            <div className="absolute inset-0 w-14 h-14 bg-primary-500/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        </div>

                                        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary-400 transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-400 mb-8 leading-relaxed flex-grow">
                                            {service.shortDescription || service.description}
                                        </p>

                                        <div className="flex items-center gap-2 text-primary-400 font-semibold text-sm group-hover:gap-3 transition-all">
                                            <span>Learn More</span>
                                            <ArrowRight size={16} />
                                        </div>

                                        {/* Corner Accent */}
                                        <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-1 h-1 bg-primary-500 rounded-full shadow-[0_0_8px_#0ea5e9]"></div>
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
                        <Link href="/services" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 hover:border-primary-500/50 transition-all duration-300 group shadow-lg">
                            <span>View All Services</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

