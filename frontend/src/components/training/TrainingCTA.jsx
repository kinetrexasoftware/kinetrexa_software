'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function TrainingCTA() {
    return (
        <section className="py-24 bg-dark-bg border-t border-white/10 text-center">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Invest in Your Skills</h2>
                    <p className="text-xl text-gray-400 mb-10">
                        The tech industry is moving fast. Don't get left behind. Start your journey with KineTrexa today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <Button size="lg" className="w-full sm:w-auto px-10 bg-blue-600 hover:bg-blue-700 border-0">
                                Enroll Now
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-white/5 hover:text-white hover:border-white">
                                Talk to a Counselor
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
