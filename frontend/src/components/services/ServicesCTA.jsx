'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function ServicesCTA() {
    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="container-custom text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's Build Something Great</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
                        Got a project idea? Need to modernize your existing tech? We are ready to help you succeed.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <Button size="lg" className="w-full sm:w-auto px-8">
                                Start a Project
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
