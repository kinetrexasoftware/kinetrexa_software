'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';

export default function Hero({ content }) {
    // defaults
    const {
        title = 'Building the Future of Digital Innovation',
        subtitle = 'Web Apps • Mobile Apps • SaaS Products • Training • Internships',
        ctaText = 'Hire Us'
    } = content || {};

    // Parse HTML for subtitle if it comes from rich text editor
    const createMarkup = (html) => {
        return { __html: html };
    };

    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="container-custom relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                            {title}
                        </h1>

                        <div
                            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed prose dark:prose-invert"
                            dangerouslySetInnerHTML={createMarkup(subtitle)}
                        />

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/contact">
                                <Button size="lg" className="w-full sm:w-auto text-lg px-8 h-12 shadow-lg shadow-primary-500/25">
                                    {ctaText}
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="#products">
                                <Button variant="secondary" size="lg" className="w-full sm:w-auto text-lg px-8 h-12">
                                    Explore Products
                                </Button>
                            </Link>
                            <Link href="/internship">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 h-12">
                                    Apply for Internship
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl -z-10" />
        </section>
    );
}
