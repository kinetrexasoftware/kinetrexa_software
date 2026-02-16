'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function ProductsCTA() {
    return (
        <section className="py-24 bg-dark-bg text-white border-t border-white/5">
            <div className="container-custom text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">See KineTrexa in Action</h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Interested in using our products for your business? Let's get you set up with a personalized demo.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <Button size="lg" className="w-full sm:w-auto px-8">
                                Request Access
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white hover:bg-white/10 px-8">
                                Contact Sales
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
