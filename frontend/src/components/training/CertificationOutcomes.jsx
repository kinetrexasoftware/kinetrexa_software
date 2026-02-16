'use client';
import { motion } from 'framer-motion';
import { Award, FileCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export default function CertificationOutcomes() {
    return (
        <section className="section bg-gray-50 dark:bg-gray-900/50">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Mock Certification Visual */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border-8 border-gray-100 dark:border-gray-700 relative z-10 mx-auto max-w-sm rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="border-2 border-dashed border-gray-200 dark:border-gray-600 p-4 h-full rounded-lg text-center flex flex-col items-center justify-center min-h-[300px]">
                                <Award className="w-16 h-16 text-primary-500 mb-4" />
                                <h3 className="text-lg font-serif font-bold text-gray-900 dark:text-white mb-2">Certificate of Completion</h3>
                                <p className="text-xs text-gray-400 mb-4">Awarded to</p>
                                <div className="h-0.5 w-32 bg-gray-300 dark:bg-gray-600 mb-4" />
                                <p className="text-xs text-gray-500">For successfully completing the Full Stack Development Training</p>
                                <div className="mt-8 flex gap-8">
                                    <div className="h-0.5 w-16 bg-gray-300 dark:bg-gray-600" />
                                    <div className="h-0.5 w-16 bg-gray-300 dark:bg-gray-600" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-primary-500/10 rounded-full blur-3xl -z-10 transform scale-150" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Certification & Outcomes</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            A certificate is just paper, but the skills you gain are permanent. We validate your learning with a verifiable certificate, but our main focus is on what you can *do*.
                        </p>

                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center flex-shrink-0">
                                    <FileCheck size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Project Portfolio</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Leave with 2-3 live projects deployed on your personalized domain.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center flex-shrink-0">
                                    <Award size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Verified Certificate</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">A digital certificate with a unique ID that can be added to your LinkedIn profile.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
