'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function ProductLearning() {
    return (
        <section className="py-24 bg-primary-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-secondary-400 font-bold tracking-wider text-sm mb-4 block">
                            THE KINETREXA ADVANTAGE
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Where Products Meet <br /> Practical Learning
                        </h2>
                        <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                            Our products aren't just for clients; they are the training ground for the next generation of engineers.
                        </p>
                        <ul className="space-y-4 mb-10 text-primary-50">
                            <li className="flex items-start gap-3">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary-400" />
                                <span>Interns contribute to live production codebases.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary-400" />
                                <span>Students learn product lifecycle management, not just syntax.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary-400" />
                                <span>Real users, real feedback, real responsibility.</span>
                            </li>
                        </ul>
                        <Link href="/internship">
                            <Button className="bg-white text-primary-900 hover:bg-gray-100 border-0">
                                Apply for Product Internship
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
                    >
                        <h3 className="text-2xl font-bold mb-2">Build Real Usage</h3>
                        <div className="flex items-end gap-2 mb-6">
                            <span className="text-5xl font-bold text-secondary-400">100+</span>
                            <span className="text-primary-200 mb-2">Commits/Week</span>
                        </div>
                        <p className="text-sm text-gray-300">
                            "I didn't just learn React; I learned how to deploy a scalable SaaS app. Working on KineFlow was the highlight of my internship."
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-secondary-500/20 flex items-center justify-center text-xs font-bold text-secondary-400">RJ</div>
                            <div className="text-xs text-primary-200">
                                <strong>Rahul J.</strong> • Former Intern, Now Junior Dev
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
