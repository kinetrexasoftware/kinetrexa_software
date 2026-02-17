'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function AboutCTA() {
    return (
        <section className="section-padding relative overflow-hidden bg-dark-bg">
            {/* High-impact background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-primary/10 blur-[120px] rounded-full -z-10" />

            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 brand-gradient-text">Ready to Build the Future?</h2>
                    <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
                        Whether you need a digital solution or are looking to start your career, we'd love to hear from you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/contact" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto min-w-[200px] text-lg">
                                Contact Us
                            </Button>
                        </Link>
                        <Link href="/internship" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] text-lg group">
                                Join Our Training
                                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
