'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function ProductsCTA() {
    return (
        <section className="py-28 bg-dark-bg relative overflow-hidden border-t border-white/5">
            {/* High-impact background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-primary/10 blur-[120px] rounded-full -z-10" />

            <div className="container-custom text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 brand-gradient-text">See KineTrexa in Action</h2>
                    <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
                        Interested in using our products for your business? Let's get you set up with a personalized demo.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/contact" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto px-10 text-lg min-w-[200px]">
                                Request Access
                            </Button>
                        </Link>
                        <Link href="/contact" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-10 text-lg min-w-[200px] group">
                                Contact Sales
                                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
