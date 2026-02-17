'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { internshipAPI } from '@/lib/api';
import { Loader2, Sparkles } from 'lucide-react';
import InternshipCard from '@/components/internship/InternshipCard';
import ApplicationModal from '@/components/internship/ApplicationModal';
import InternshipHero from '@/components/internship/InternshipHero';
import InternshipLearning from '@/components/internship/InternshipLearning';
import InternshipProcess from '@/components/internship/InternshipProcess';
import InternshipBenefits from '@/components/internship/InternshipBenefits';
import InternshipEligibility from '@/components/internship/InternshipEligibility';
import InternshipCTA from '@/components/internship/InternshipCTA';

export default function InternshipPage() {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedInternship, setSelectedInternship] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchInternships();
    }, []);

    const fetchInternships = async () => {
        try {
            setLoading(true);
            const data = await internshipAPI.getAll({});
            setInternships(data.internships || []);
        } catch (error) {
            console.error('Error fetching internships:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = (internship) => {
        setSelectedInternship(internship);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedInternship(null);
    };

    return (
        <div className="min-h-screen">
            <InternshipHero />

            {/* Internship Opportunities Section */}
            <section id="openings" className="section-padding relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-brand-primary/[0.03] blur-[120px] -z-10" />

                <div className="container-custom relative z-10">
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-6"
                        >
                            <Sparkles size={12} className="animate-pulse" />
                            <span>Exploration Window</span>
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 brand-gradient-text tracking-tight">Current Openings</h2>
                        <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                            Find the specialized role that aligns with your career goals. We are currently accepting applications for the following cohorts.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-32">
                            <Loader2 className="w-12 h-12 animate-spin text-brand-primary" />
                        </div>
                    ) : internships.length === 0 ? (
                        <div className="glass-card p-20 text-center border-white/5">
                            <h3 className="text-2xl font-bold mb-4 text-text-primary">No Active Openings</h3>
                            <p className="text-text-secondary max-w-md mx-auto">
                                All our current cohorts are full. Please check back next week or join our waitlist for upcoming specializations.
                            </p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {internships.map((internship, index) => (
                                <motion.div
                                    key={internship.id || internship._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <InternshipCard
                                        internship={internship}
                                        onApply={() => handleApply(internship)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <InternshipLearning />
            <InternshipProcess />
            <InternshipBenefits />
            <InternshipEligibility />
            <InternshipCTA />

            {/* Application Modal */}
            {showModal && selectedInternship && (
                <ApplicationModal
                    internship={selectedInternship}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}