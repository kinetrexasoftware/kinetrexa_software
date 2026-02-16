'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Smartphone, Database, Layout, ArrowRight, Layers, Box, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { trainingAPI } from '@/lib/api';

// Map icon strings to components
const iconMap = {
    'Code2': Code2,
    'Smartphone': Smartphone,
    'Database': Database,
    'Layout': Layout,
    'Layers': Layers,
    'Box': Box,
    'CheckCircle2': CheckCircle2
};

// Fallback colors if not specified (though we'd typically want these from backend or generated)
const getColors = (index) => {
    const colors = [
        { text: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
        { text: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
        { text: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" },
        { text: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20" },
    ];
    return colors[index % colors.length];
};

export default function TrainingPrograms() {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const data = await trainingAPI.getPublic();
                setPrograms(data || []);
            } catch (error) {
                console.error("Failed to load training programs", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []);

    if (loading) {
        return (
            <section className="section bg-gray-50 dark:bg-gray-900/50 min-h-[400px] flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500">Loading programs...</p>
                </div>
            </section>
        );
    }

    // Only show empty state if not loading and no programs
    if (!loading && programs.length === 0) {
        return (
            <section className="section bg-gray-50 dark:bg-gray-900/50">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Training Programs</h2>
                    <p className="text-gray-500">No training programs available at the moment. Please check back later.</p>
                </div>
            </section>
        )
    }

    return (
        <section className="section bg-gray-50 dark:bg-gray-900/50">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Training Programs</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Curriculum curated by industry experts to ensure you learn what matters.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {programs.map((program, index) => {
                        // Use icon from map or fallback
                        // Note: Backend might not have 'icon' field yet for training, 
                        // so we might default to Code2 if undefined.
                        const IconComponent = iconMap[program.icon] || Code2;
                        const colors = getColors(index);

                        return (
                            <motion.div
                                key={program.id || program._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-sm group">
                                    <CardContent className="p-8">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`w-14 h-14 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center`}>
                                                <IconComponent size={28} />
                                            </div>
                                            {program.level && (
                                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
                                                    {program.level}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                                            {program.name}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed line-clamp-3">
                                            {program.description}
                                        </p>

                                        <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-500 font-medium">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-gray-300" />
                                                {program.duration}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-gray-300" />
                                                {program.mode}
                                            </div>
                                        </div>

                                        <Button className="w-full group-hover:bg-primary-600">
                                            View Details
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
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
