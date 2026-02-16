'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CTA() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <section className="section relative overflow-hidden py-24">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-800" />

            <div className="container-custom relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto text-white"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">
                        Ready to Build the Extraordinary?
                    </h2>

                    <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
                        Whether you need a cutting-edge product or want to kickstart your career, KineTrexa is your partner in success.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <Button
                                size="lg"
                                className="bg-white text-primary-700 hover:bg-gray-100 shadow-xl border-2 border-transparent w-full sm:w-auto"
                            >
                                Start a Project
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-2 border-white text-white hover:bg-white/10 w-full sm:w-auto"
                            >
                                Contact Us
                            </Button>
                        </Link>
                        <Link href="/internship">
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-2 border-white/50 text-white hover:bg-white/10 w-full sm:w-auto"
                            >
                                Join as Intern
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}