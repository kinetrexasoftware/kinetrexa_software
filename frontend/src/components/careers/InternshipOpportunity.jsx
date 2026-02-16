'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function InternshipOpportunity() {
    return (
        <section className="py-24 bg-gradient-to-br from-primary-900 to-primary-800 text-white relative overflow-hidden">

            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-sm mb-6">
                            STUDENT PROGRAM
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Start as an Intern, Be a Leader</h2>
                        <p className="text-lg text-primary-100 mb-8 leading-relaxed">
                            Looking for your first break? KineTrexa's internship program is designed for students and fresh graduates who want practical exposure. From Day 1, you write code that ships.
                        </p>
                        <div className="flex gap-4">
                            <Link href="/internship">
                                <Button className="bg-white text-primary-900 hover:bg-gray-100 border-0">
                                    View Internship Details
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
