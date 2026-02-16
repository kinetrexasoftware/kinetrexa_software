'use client';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export default function MissionVision({ mission, vision }) {
    return (
        <section className="section bg-gray-50 dark:bg-gray-900/50">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Mission */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-full border-l-4 border-l-primary-500">
                            <CardContent className="p-8">
                                <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-xl flex items-center justify-center mb-6">
                                    <Target className="w-7 h-7" />
                                </div>
                                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                                    {mission}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Vision */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-full border-l-4 border-l-secondary-500">
                            <CardContent className="p-8">
                                <div className="w-14 h-14 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 rounded-xl flex items-center justify-center mb-6">
                                    <Eye className="w-7 h-7" />
                                </div>
                                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                                    {vision}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
