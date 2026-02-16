'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Input, { Select } from '@/components/ui/Input';
import { Send, CheckCircle2, MapPin } from 'lucide-react';
import { contactAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        category: 'project',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            toast.error('Please fill in all required fields');
            return;
        }

        const subjectMapping = {
            project: 'Project Inquiry',
            product: 'Product Inquiry',
            training: 'Training Inquiry',
            internship: 'Internship Inquiry',
            other: 'General Inquiry',
        };

        const finalData = {
            ...formData,
            subject: subjectMapping[formData.category] || 'General Inquiry',
        };

        try {
            setLoading(true);
            await contactAPI.submit(finalData);
            setSuccess(true);
            toast.success('Message sent successfully!');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
                category: 'project',
            });
        } catch (error) {
            toast.error(error.message || 'Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section bg-gray-50 dark:bg-gray-900/50">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            Fill out the form below and our team will get back to you within 24 hours.
                        </p>

                        {success ? (
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">Message Sent!</h3>
                                <p className="text-green-700 dark:text-green-300 mb-6">
                                    Thank you for contacting us. We will be in touch shortly.
                                </p>
                                <Button onClick={() => setSuccess(false)} variant="outline">
                                    Send Another Message
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <Input
                                        label="Full Name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        error={errors.name}
                                    />
                                    <Input
                                        label="Phone Number (Optional)"
                                        placeholder="+1 (555) 000-0000"
                                        value={formData.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                    />
                                </div>

                                <Input
                                    label="Email Address"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    error={errors.email}
                                />

                                <Select
                                    label="I am interested in..."
                                    value={formData.category}
                                    onChange={(e) => handleChange('category', e.target.value)}
                                    options={[
                                        { value: 'project', label: 'Start a Project' },
                                        { value: 'product', label: 'Use a Product' },
                                        { value: 'training', label: 'Training / Course' },
                                        { value: 'internship', label: 'Internship Application' },
                                        { value: 'other', label: 'Other Inquiry' },
                                    ]}
                                />

                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                    <textarea
                                        className="w-full min-h-[150px] rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white resize-none"
                                        placeholder="Tell us more about your requirements..."
                                        value={formData.message}
                                        onChange={(e) => handleChange('message', e.target.value)}
                                    />
                                    {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                                </div>

                                <Button type="submit" loading={loading} size="lg" className="w-full">
                                    <Send className="w-5 h-5 mr-2" />
                                    Send Message
                                </Button>
                            </form>
                        )}
                    </motion.div>

                    {/* Map / Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col h-full"
                    >
                        <div className="flex-grow bg-gray-200 dark:bg-gray-800 rounded-3xl overflow-hidden min-h-[400px] relative">
                            {/* Placeholder Map Pattern */}
                            <div className="absolute inset-0 bg-[url('/map-pattern.svg')] opacity-20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl text-center max-w-xs">
                                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <MapPin size={24} />
                                    </div>
                                    <h3 className="font-bold mb-1">Visit Our Office</h3>
                                    <p className="text-sm text-gray-500">123 Tech Street, Silicon Valley, CA</p>
                                    <Button variant="outline" size="sm" className="mt-4 w-full">
                                        Get Directions
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
