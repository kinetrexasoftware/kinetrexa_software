import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Save, Globe, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

const ContactManager = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [contact, setContact] = useState({
        email: '',
        phone: '',
        address1: '',
        address2: '',
        facebook: '',
        twitter: '',
        linkedin: '',
        instagram: ''
    });

    useEffect(() => {
        fetchContactInfo();
    }, []);

    const fetchContactInfo = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/content/global');
            if (data && data.content) {
                // Merge with defaults to ensure controlled inputs
                setContact({
                    email: data.content.email || '',
                    phone: data.content.phone || '',
                    address1: data.content.address1 || '',
                    address2: data.content.address2 || '',
                    facebook: data.content.facebook || '',
                    twitter: data.content.twitter || '',
                    linkedin: data.content.linkedin || '',
                    instagram: data.content.instagram || ''
                });
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to load contact info');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            // Updating 'global' section
            await api.put('/content/section/global', {
                content: contact
            });
            toast.success('Contact information updated');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update information');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-white text-center py-10">Loading contact settings...</div>;

    return (
        <div className="bg-dark-secondary/30 rounded-xl border border-white/5 p-6 backdrop-blur-sm">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Contact & Social Info</h2>
                <p className="text-text-secondary">Update your company contact details and social media links appearing across the site.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* Contact Details Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-brand-primary border-b border-white/5 pb-2">Direct Contact</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                                <Mail size={16} /> Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={contact.email}
                                onChange={handleChange}
                                placeholder="hello@kinetrexa.com"
                                className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand-primary outline-none transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                                <Phone size={16} /> Phone Number
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={contact.phone}
                                onChange={handleChange}
                                placeholder="+91 98765 43210"
                                className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand-primary outline-none transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                                <MapPin size={16} /> Address Line 1
                            </label>
                            <input
                                type="text"
                                name="address1"
                                value={contact.address1}
                                onChange={handleChange}
                                placeholder="House No. 121B, Lacchiipu"
                                className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand-primary outline-none transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                                <MapPin size={16} /> Address Line 2
                            </label>
                            <input
                                type="text"
                                name="address2"
                                value={contact.address2}
                                onChange={handleChange}
                                placeholder="Gorakhpur, Uttar Pradesh, 273001"
                                className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand-primary outline-none transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Social Media Section */}
                <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-semibold text-brand-primary border-b border-white/5 pb-2">Social Media Handles</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                                <Linkedin size={16} className="text-blue-500" /> LinkedIn URL
                            </label>
                            <input
                                type="url"
                                name="linkedin"
                                value={contact.linkedin}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/company/..."
                                className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand-primary outline-none transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                                <Twitter size={16} className="text-sky-400" /> Twitter (X) URL
                            </label>
                            <input
                                type="url"
                                name="twitter"
                                value={contact.twitter}
                                onChange={handleChange}
                                placeholder="https://twitter.com/..."
                                className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand-primary outline-none transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                                <Facebook size={16} className="text-blue-600" /> Facebook URL
                            </label>
                            <input
                                type="url"
                                name="facebook"
                                value={contact.facebook}
                                onChange={handleChange}
                                placeholder="https://facebook.com/..."
                                className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand-primary outline-none transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                                <Instagram size={16} className="text-pink-500" /> Instagram URL
                            </label>
                            <input
                                type="url"
                                name="instagram"
                                value={contact.instagram}
                                onChange={handleChange}
                                placeholder="https://instagram.com/..."
                                className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-brand-primary outline-none transition-colors"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-8 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
                    >
                        {saving ? 'Saving...' : <><Save size={20} /> Update Information</>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactManager;
