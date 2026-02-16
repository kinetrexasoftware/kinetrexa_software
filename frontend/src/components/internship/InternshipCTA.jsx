'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function InternshipCTA() {
    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-900 text-center">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start?</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
                        Don't wait for graduation to get experience. Start building your future today with KineTrexa.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="#openings">
                            <Button size="lg" className="w-full sm:w-auto px-10">
                                Apply for Internship
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
