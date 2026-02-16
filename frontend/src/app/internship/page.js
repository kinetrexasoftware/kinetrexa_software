'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { internshipAPI } from '@/lib/api';
import { Loader2 } from 'lucide-react';
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
            const data = await internshipAPI.getAll({}); // Fetch all internships
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
        <div className="min-h-screen pt-20">
            <InternshipHero />

            {/* Internship Opportunities Section */}
            <section id="openings" className="section bg-gray-50 dark:bg-gray-800/10">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Current Openings</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Find the role that fits you. We are hiring for multiple domains.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
                        </div>
                    ) : internships.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <h3 className="text-xl font-bold mb-2">No Openings Currently</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Please check back later or subscribe to our newsletter for updates.
                            </p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {internships.map((internship, index) => (
                                <motion.div
                                    key={internship.id || internship._id}
                                    initial={{ opacity: 0, y: 20 }}
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