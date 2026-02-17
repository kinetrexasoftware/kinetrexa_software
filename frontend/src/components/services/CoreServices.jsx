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
        <section className="py-24 bg-[#0B1220]">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const IconComponent = iconMap[service.icon] || Layers;
                        return (
                            <motion.div
                                key={service.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={`/services/${service.slug}`} className="block group h-full">
                                    <div className="relative h-full p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-white/[0.08] group-hover:border-primary-500/50 flex flex-col">

                                        <div className="w-14 h-14 rounded-2xl bg-primary-500/10 flex items-center justify-center border border-primary-500/20 mb-6 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all duration-500">
                                            <IconComponent size={28} className="text-primary-400 group-hover:text-white" />
                                        </div>

                                        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary-400 transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-400 mb-8 leading-relaxed flex-grow">
                                            {service.shortDescription || service.description}
                                        </p>

                                        <div className="flex items-center gap-2 text-primary-400 font-semibold text-sm group-hover:gap-3 transition-all">
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
