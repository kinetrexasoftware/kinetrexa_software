'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { contentAPI } from '@/lib/api';
import { Loader2 } from 'lucide-react';

export default function TermsAndConditions() {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTerms = async () => {
            try {
                const data = await contentAPI.getSection('terms');
                setContent(data?.content || '');
            } catch (error) {
                console.error("Failed to load terms", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTerms();
    }, []);

    return (
        <div className="pt-20">
            <section className="section gradient-bg">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
                        <p className="text-gray-600 dark:text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>
                    </motion.div>
                </div>
            </section>

            <section className="section">
                <div className="container-custom max-w-4xl">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
                        </div>
                    ) : (
                        <div
                            className="prose dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: content || '<p>Terms & Conditions not available yet.</p>' }}
                        />
                    )}
                </div>
            </section>
        </div>
    );
}
