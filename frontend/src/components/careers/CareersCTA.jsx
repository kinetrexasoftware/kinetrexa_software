'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function CareersCTA() {
    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-center">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Didn't see a role for you?</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
                        We are always on the lookout for talent. Send us your resume, and we'll keep you in mind for future openings.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="mailto:careers@kinetrexa.com">
                            <Button size="lg" className="w-full sm:w-auto px-10">
                                Email HR
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                General Inquiry
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
