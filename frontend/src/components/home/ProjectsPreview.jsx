'use client';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ExternalLink } from 'lucide-react';

export default function ProjectsPreview({ content }) {
    const {
        title = 'Featured Work',
        subtitle = 'A glimpse into what we can build for you.',
        items = []
    } = content || {};

    // Use items from props if available
    const displayProjects = items.length > 0 ? items : [];

    return (
        <section className="section">
            <div className="container-custom">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
                            {subtitle}
                        </p>
                    </div>
                    <Button variant="ghost" className="hidden md:flex">View All Projects</Button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {displayProjects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="group overflow-hidden border-0 shadow-lg">
                                <div className={`aspect-video ${project.image} relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                                            View Details <ExternalLink className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                                        {project.category}
                                    </span>
                                    <h3 className="text-xl font-bold mt-2 mb-2 group-hover:text-primary-600 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        {project.desc}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-8 text-center md:hidden">
                    <Button variant="ghost">View All Projects</Button>
                </div>
            </div>
        </section>
    );
}
