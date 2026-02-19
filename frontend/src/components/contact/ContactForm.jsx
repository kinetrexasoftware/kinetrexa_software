'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Send, CheckCircle2, MapPin, Radio, Terminal } from 'lucide-react';
import { contactAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        category: 'project',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Mapping category to subject for backend compatibility
            const subjectMapping = {
                project: 'Project Inquiry',
                product: 'Product Inquiry',
                training: 'Training Inquiry',
                internship: 'Internship Inquiry',
                other: 'General Inquiry',
            };

            await contactAPI.submit({
                ...formData,
                subject: subjectMapping[formData.category]
            });

            setSuccess(true);
            toast.success('Transmission Successful!');
        } catch (error) {
            toast.error('Transmission Failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { id: 'project', label: 'Start Project' },
        { id: 'product', label: 'Product Inquiry' },
        { id: 'training', label: 'Training/Course' },
        { id: 'internship', label: 'Internship' },
        { id: 'other', label: 'Other' },
    ];

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-dark-bg -z-20" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] -z-10" />

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* Visual Side - Global Reach */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden min-h-[500px] flex flex-col">
                            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

                            {/* Map Visualization (CSS Only Abstract) */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                <div className="w-64 h-64 border border-brand-primary/30 rounded-full animate-[spin_10s_linear_infinite]" />
                                <div className="w-48 h-48 border border-brand-primary/20 rounded-full absolute animate-[spin_15s_linear_infinite_reverse]" />
                                <div className="w-32 h-32 border border-brand-primary/40 rounded-full absolute border-dashed animate-[spin_20s_linear_infinite]" />
                            </div>

                            <div className="relative z-10 mt-auto">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-xs font-mono text-brand-primary tracking-widest">SYSTEM ONLINE</span>
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-2">Global Connectivity</h2>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    Our digital infrastructure spans across continents. Connect with our command center for immediate assistance.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Side - Terminal Interface */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="glass-card p-8 md:p-10 rounded-2xl border border-white/10 relative overflow-hidden"
                        >
                            {/* Terminal Header */}
                            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                                <div className="flex items-center gap-3">
                                    <Terminal size={18} className="text-brand-primary" />
                                    <span className="text-sm font-mono text-text-muted">TRANSMISSION_PROTOCOL_V2.0</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/20" />
                                </div>
                            </div>

                            {success ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 size={40} className="text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Data Packet Sent</h3>
                                    <p className="text-text-secondary font-mono mb-8">Ref ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                                    <Button onClick={() => setSuccess(false)} variant="outline">
                                        Send New Transmission
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-mono text-text-muted uppercase tracking-wider">Agent Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-dark-bg/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all outline-none font-mono text-sm"
                                                placeholder="Enter identifier..."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-mono text-text-muted uppercase tracking-wider">Contact Frequency</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full bg-dark-bg/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all outline-none font-mono text-sm"
                                                placeholder="+1 (000) 000-0000"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-text-muted uppercase tracking-wider">Secure Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-dark-bg/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all outline-none font-mono text-sm"
                                            placeholder="agent@domain.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-text-muted uppercase tracking-wider">Directive Category</label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {categories.map((cat) => (
                                                <button
                                                    key={cat.id}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, category: cat.id })}
                                                    className={`px-3 py-2 rounded-lg text-xs font-mono border transition-all text-left flex items-center gap-2 ${formData.category === cat.id
                                                            ? 'bg-brand-primary/20 border-brand-primary text-brand-primary'
                                                            : 'bg-dark-bg/30 border-white/5 text-text-muted hover:border-white/20'
                                                        }`}
                                                >
                                                    <div className={`w-2 h-2 rounded-full ${formData.category === cat.id ? 'bg-brand-primary' : 'bg-gray-600'}`} />
                                                    {cat.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-text-muted uppercase tracking-wider">Message Data</label>
                                        <textarea
                                            name="message"
                                            required
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full bg-dark-bg/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all outline-none font-mono text-sm resize-none"
                                            placeholder="Enter transmission content..."
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        loading={loading}
                                        className="w-full group"
                                    >
                                        <span className="flex items-center gap-2">
                                            INITIATE TRANSMISSION
                                            <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
