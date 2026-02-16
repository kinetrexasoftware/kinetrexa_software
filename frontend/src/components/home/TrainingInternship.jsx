'use client';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Users } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function TrainingInternship({ content }) {
    const {
        trainingTitle = 'Expert-Led Training Programs',
        trainingDesc = 'Master the latest technologies with our hands-on training sessions. From web development to cloud computing, we cover it all.',
        internshipTitle = 'Join Our Internship Program',
        internshipDesc = 'Kickstart your career with real-world exposure. Work on live projects and gain invaluable experience.'
    } = content || {};

    return (
        <section className="section overflow-hidden">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Training Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <span className="text-primary-600 font-semibold mb-2 block">FOR STUDENTS</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">{trainingTitle}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                            {trainingDesc}
                        </p>

                        <div className="space-y-4 mb-8">
                            <Feature
                                icon={Users}
                                title="Mentorship"
                                desc="Learn directly from industry experts"
                            />
                            <Feature
                                icon={Award}
                                title="Certification"
                                desc="Get recognized for your skills"
                            />
                        </div>

                        <Link href="/services#training">
                            <Button>View Training Programs</Button>
                        </Link>
                    </motion.div>

                    {/* Internship Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary-900 to-secondary-900 text-white relative overflow-hidden"
                    >
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-6">
                                CAREER START
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">{internshipTitle}</h2>
                            <p className="text-primary-100 mb-8 text-lg">
                                {internshipDesc}
                            </p>

                            <ul className="space-y-3 mb-8 text-primary-50">
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                    Real-world projects
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                    Job assistance
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                    Flexible timings
                                </li>
                            </ul>

                            <Link href="/internship">
                                <Button className="bg-white text-primary-900 hover:bg-gray-100 border-0">
                                    Apply for Internship
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function Feature({ icon: Icon, title, desc }) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
            <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 flex items-center justify-center flex-shrink-0">
                <Icon size={20} />
            </div>
            <div>
                <h4 className="font-bold mb-1">{title}</h4>
                <p className="text-sm text-gray-500">{desc}</p>
            </div>
        </div>
    );
}
