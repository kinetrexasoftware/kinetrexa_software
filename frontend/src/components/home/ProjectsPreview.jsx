'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { ExternalLink, Sparkles } from 'lucide-react';

export default function ProjectsPreview({ content }) {
    const {
        title = 'Featured Work',
        subtitle = 'A glimpse into what we can build for you.',
        items = []
    } = content || {};

    const displayProjects = items.length > 0 ? items : [];

    return (
        <section className="section-padding relative overflow-hidden">
            <div className="container-custom relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 mb-16">
                    <div className="text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-4"
                        >
                            <Sparkles size={12} className="animate-pulse" />
                            <span>Portfolio Showcase</span>
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 brand-gradient-text">{title}</h2>
                        <p className="text-lg text-text-secondary max-w-xl">
                            {subtitle}
                        </p>
                    </div>
                    <Button variant="ghost" className="hidden md:flex group h-12">
                        View All Projects
                        <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {displayProjects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="glass-card-hover border-white/5 flex flex-col h-full group">
                                <div className={`aspect-video ${project.image} relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-dark-bg/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                        <Button size="sm" variant="primary" className="h-10 px-5">
                                            View Details <ExternalLink className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 rounded-full bg-dark-bg/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-brand-primary uppercase tracking-widest">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <h3 className="text-xl font-bold mb-3 text-text-primary group-hover:text-brand-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
                                        {project.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Button variant="ghost" className="w-full h-12">View All Projects</Button>
                </div>
            </div>

            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary/5 blur-[100px] rounded-full -z-10" />
        </section>
    );
}
