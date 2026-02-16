'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { MapPin, Clock, Briefcase } from 'lucide-react';

const positions = [
    {
        title: "Frontend Developer (React/Next.js)",
        type: "Full-Time",
        location: "Remote / Hybrid",
        desc: "Looking for a React specialist who loves crafting pixel-perfect UIs and cares about performance."
    },
    {
        title: "Backend Developer (Node.js/Python)",
        type: "Full-Time",
        location: "Remote",
        desc: "Join our API team to build scalable microservices and robust server-side logic."
    },
    {
        title: "UI/UX Designer",
        type: "Part-Time / Contract",
        location: "Remote",
        desc: "Help us design intuitive and beautiful interfaces for our SaaS products."
    },
    {
        title: "Business Development Executive",
        type: "Full-Time",
        location: "On-site (Bangalore)",
        desc: "Drive growth and build relationships with potential clients and partners."
    }
];

export default function OpenPositions() {
    return (
        <section className="section bg-gray-50 dark:bg-gray-900/50" id="openings">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Roles</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Find your next challenge.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {positions.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                                    {job.title}
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-1.5">
                                    <Briefcase size={16} />
                                    <span>{job.type}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={16} />
                                    <span>{job.location}</span>
                                </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm">
                                {job.desc}
                            </p>

                            <Link href="/contact">
                                <Button className="w-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 group-hover:bg-primary-600 group-hover:text-white dark:group-hover:bg-primary-600 dark:group-hover:text-white border-0">
                                    Apply Now
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
