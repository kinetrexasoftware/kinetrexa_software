'use client';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function TrainingPhilosophy({ content }) {
    const {
        title = 'Empowering Future Tech Leaders',
        paragraphs = [
            "At KineTrexa, we believe that the best way to learn is by doing. Our training and internship programs are designed not just to teach syntax, but to teach engineering.",
            "We don't settle for \"Hello World.\" Our interns work on live production code, tackle real architectural challenges, and learn the soft skills necessary to thrive in a modern agile team."
        ]
    } = content || {};

    return (
        <section className="section bg-gradient-to-br from-primary-900 via-dark-bg to-secondary-900 text-white">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
                        <div className="space-y-6 text-lg text-gray-300">
                            {paragraphs.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-4 mt-8">
                            <Link href="/internship">
                                <Button className="bg-white text-primary-900 hover:bg-gray-100">
                                    Browse Internships
                                </Button>
                            </Link>
                            <Link href="/services#training">
                                <Button variant="outline" className="text-white border-white hover:bg-white/10">
                                    View Syllabus
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid sm:grid-cols-2 gap-6"
                    >
                        <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <GraduationCap className="w-10 h-10 text-primary-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Skill-First Approach</h3>
                            <p className="text-sm text-gray-400">Curriculum updated monthly to match industry demands.</p>
                        </div>
                        <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <Briefcase className="w-10 h-10 text-secondary-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Real Experience</h3>
                            <p className="text-sm text-gray-400">Work on projects that actually go live to users.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
