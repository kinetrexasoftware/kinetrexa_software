'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function ContactCTA() {
    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-900 text-center">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Not ready to contact yet?</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
                        Check out our work or see what opportunities we have available.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/services">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                View Services
                            </Button>
                        </Link>
                        <Link href="/internship">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                Internship Openings
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
