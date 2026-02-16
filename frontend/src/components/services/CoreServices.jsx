'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Rocket, LayoutDashboard, Database, Wrench, Layers, Megaphone, PenTool, Cloud, Code, Server } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { serviceAPI } from '@/lib/api';

const iconMap = {
    Globe, Smartphone, Rocket, LayoutDashboard, Database, Wrench, Layers, Megaphone, PenTool, Cloud, Code, Server
};

export default function CoreServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await serviceAPI.getAll();
                // Filter only active services
                const activeServices = Array.isArray(data) ? data.filter(s => s.active || s.status === 'Active') : [];
                setServices(activeServices);
            } catch (error) {
                console.error("Failed to fetch services", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    if (loading) {
        return <div className="py-20 text-center">Loading services...</div>;
    }

    return (
        <section className="section bg-white dark:bg-gray-900">
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
                                <Card className="h-full hover:shadow-lg transition-all duration-300 border-t-4 border-t-transparent hover:border-t-primary-500 group">
                                    <CardContent className="p-8">
                                        <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                            <IconComponent size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                            {service.desc || service.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
