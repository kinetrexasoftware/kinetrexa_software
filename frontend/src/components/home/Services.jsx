'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Rocket, GraduationCap, Users, Settings, Globe, Megaphone, PenTool, Cloud, Database, Server, Layers } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { serviceAPI } from '@/lib/api';

const iconMap = {
    Code, Smartphone, Rocket, GraduationCap, Users, Settings, Globe, Megaphone, PenTool, Cloud, Database, Server, Layers
};

export default function Services({ content }) {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const {
        title = 'What We Do',
        subtitle = 'Comprehensive technology services tailored to your needs'
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
        return <div className="py-20 text-center">Loading services...</div>;
    }

    if (services.length === 0) return null;

    return (
        <section className="section">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>
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
                                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-primary-500 bg-white dark:bg-gray-800">
                                    <CardHeader>
                                        <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4 transition-colors group-hover:bg-primary-100">
                                            <IconComponent className="w-6 h-6 text-primary-600" />
                                        </div>
                                        <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {service.description}
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
