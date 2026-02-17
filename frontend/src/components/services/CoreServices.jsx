'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Globe, Smartphone, Rocket, Layers, Megaphone,
    PenTool, Cloud, Code, Server, Database, ArrowRight
} from 'lucide-react';
import { serviceAPI } from '@/lib/api';

const iconMap = {
    Globe, Smartphone, Rocket, Layers, Megaphone, PenTool, Cloud, Code, Server, Database
};

export default function CoreServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await serviceAPI.getPublic();
                setServices(data || []);
            } catch (error) {
                console.error("Failed to fetch services", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    if (loading) {
        return (
            <div className="py-20 bg-[#0B1220] flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <section className="section-padding bg-dark-bg relative overflow-hidden">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
                                <Link href={`/services/${service.slug}`} className="block group h-full">
                                    <div className="glass-card-hover border-white/5 p-8 h-full flex flex-col relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <IconComponent size={100} className="text-brand-primary transform group-hover:rotate-12 transition-transform duration-700" />
                                        </div>

                                        <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20 mb-6 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(14,165,233,0.1)] relative z-10">
                                            <IconComponent size={28} className="text-brand-primary group-hover:text-white transition-colors" />
                                        </div>

                                        <h3 className="text-2xl font-bold mb-4 text-text-primary group-hover:text-brand-primary transition-colors relative z-10">
                                            {service.title}
                                        </h3>
                                        <p className="text-text-secondary mb-8 leading-relaxed flex-grow relative z-10">
                                            {service.shortDescription || service.description}
                                        </p>

                                        <div className="flex items-center gap-2 text-brand-primary font-bold text-sm uppercase tracking-wide group-hover:gap-3 transition-all relative z-10">
                                            <span>Explore Details</span>
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
