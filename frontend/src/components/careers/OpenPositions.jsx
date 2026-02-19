'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { MapPin, Briefcase, Loader2 } from 'lucide-react';

export default function OpenPositions() {
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api'}/careers`);
                const data = await res.json();
                if (data.success) {
                    setPositions(data.data.filter(job => job.status === 'Active'));
                }
            } catch (error) {
                console.error('Failed to fetch jobs', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return (
            <section className="section bg-gray-50 dark:bg-gray-900/50 min-h-[400px] flex items-center justify-center">
                <Loader2 className="animate-spin text-brand-primary" size={40} />
            </section>
        );
    }

    return (
        <section className="section bg-gray-50 dark:bg-gray-900/50" id="openings">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Roles</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Find your next challenge.
                    </p>
                </div>

                {positions.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-500">No open positions at the moment. Check back later!</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {positions.map((job, index) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all group relative overflow-hidden"
                            >
                                {job.image && (
                                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                                        <img src={job.image} alt="" className="w-full h-full object-cover rounded-bl-3xl" />
                                    </div>
                                )}

                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                                        {job.role}
                                    </h3>
                                </div>

                                <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500 dark:text-gray-400 relative z-10">
                                    <div className="flex items-center gap-1.5">
                                        <Briefcase size={16} />
                                        <span>{job.type}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin size={16} />
                                        <span>{job.location}</span>
                                    </div>
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm relative z-10 line-clamp-3">
                                    {job.description}
                                </p>

                                <Link href="/contact" className="relative z-10 block">
                                    <Button className="w-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 group-hover:bg-primary-600 group-hover:text-white dark:group-hover:bg-primary-600 dark:group-hover:text-white border-0">
                                        Apply Now
                                    </Button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
