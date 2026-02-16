'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function InternshipEligibility() {
    return (
        <section className="py-20 bg-primary-900 text-white">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Who Can Apply?</h2>
                        <ul className="space-y-4 text-lg text-primary-100 mb-8">
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-secondary-400 rounded-full" />
                                Students currently pursuing B.Tech, BCA, MCA, or related fields.
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-secondary-400 rounded-full" />
                                Recent graduates looking for their first break.
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-secondary-400 rounded-full" />
                                Anyone with basic knowledge of programming and a hunger to learn.
                            </li>
                        </ul>
                        <p className="text-primary-200 mb-8 italic">
                            *Prior project experience is a plus, but passion is mandatory.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/5 p-8 rounded-2xl border border-white/10"
                    >
                        <h3 className="text-2xl font-bold mb-4">Important Note</h3>
                        <p className="text-gray-300 mb-6">
                            This is a rigorous program. We expect commitment, punctuality, and a proactive attitude. In return, we provide mentorship that can change your career trajectory.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#openings">
                                <Button className="bg-white text-primary-900 hover:bg-gray-100">
                                    View Openings
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
