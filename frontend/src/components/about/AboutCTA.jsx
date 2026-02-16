'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function AboutCTA() {
    return (
        <section className="py-24 bg-gray-900 text-white text-center">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to work with us?</h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Whether you need a digital solution or are looking to start your career, we'd love to hear from you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <Button size="lg" className="w-full sm:w-auto">
                                Contact Us
                            </Button>
                        </Link>
                        <Link href="/internship">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white hover:bg-white/10">
                                Join Our Training
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
