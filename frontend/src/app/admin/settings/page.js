'use client';
import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Save, RefreshCw, Globe, Phone, Share2, Search, Sliders } from 'lucide-react';
import { fetchSiteSettings, updateSiteSettings } from '@/lib/adminApi';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function SiteSettings() {
    const [settings, setSettings] = useState({
        general: {}, contact: {}, social: {}, seo: {}
    });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('general');

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const data = await fetchSiteSettings();
                setSettings(data || { general: {}, contact: {}, social: {}, seo: {} });
            } catch (error) {
                console.error("Failed to load settings", error);
                toast.error("Failed to load settings");
            } finally {
                setLoading(false);
            }
        };
        loadSettings();
    }, []);

    const handleSave = async () => {
        toast.promise(
            updateSiteSettings(settings),
            {
                loading: 'Saving settings...',
                success: 'Settings updated successfully!',
                error: 'Could not save settings.',
            }
        );
    };

    const tabs = [
        { id: 'general', label: 'General Info', icon: Globe },
        { id: 'contact', label: 'Contact Info', icon: Phone },
        { id: 'social', label: 'Social Media', icon: Share2 },
        { id: 'seo', label: 'SEO & Meta', icon: Search },
    ];

    if (loading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <RefreshCw className="animate-spin text-primary-500" size={32} />
            </div>
        );
    }

    return (
        <div>
            <Toaster position="top-right" />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Site Settings</h1>
                    <p className="text-gray-500 text-sm">Configure global website parameters.</p>
                </div>
                <Button onClick={handleSave}>
                    <Save size={16} className="mr-2" />
                    Save Settings
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar Tabs */}
                <div className="w-full lg:w-64 flex flex-col gap-2 shrink-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                        >
                            <tab.icon size={18} className={`mr-3 ${activeTab === tab.id ? 'text-primary-600' : 'text-gray-400'}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'general' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-bold border-b border-gray-100 dark:border-gray-800 pb-2">General Information</h3>
                                    <div className="grid gap-6 max-w-xl">
                                        <Input
                                            label="Website Name"
                                            value={settings.general.name || ''}
                                            onChange={(e) => setSettings({ ...settings, general: { ...settings.general, name: e.target.value } })}
                                        />
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Logo URL</label>
                                            <div className="flex gap-4">
                                                <input
                                                    className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                                    value={settings.general.logo || ''}
                                                    onChange={(e) => setSettings({ ...settings, general: { ...settings.general, logo: e.target.value } })}
                                                />
                                                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center text-xs text-gray-400">
                                                    Img
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input
                                                label="Primary Currency"
                                                value={settings.general.currency || ''}
                                                onChange={(e) => setSettings({ ...settings, general: { ...settings.general, currency: e.target.value } })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'contact' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-bold border-b border-gray-100 dark:border-gray-800 pb-2">Contact Details</h3>
                                    <div className="grid gap-6 max-w-xl">
                                        <Input
                                            label="Support Email"
                                            type="email"
                                            value={settings.contact.email || ''}
                                            onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, email: e.target.value } })}
                                        />
                                        <Input
                                            label="Phone Number"
                                            value={settings.contact.phone || ''}
                                            onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, phone: e.target.value } })}
                                        />
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Office Address</label>
                                            <textarea
                                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                                rows={3}
                                                value={settings.contact.address || ''}
                                                onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, address: e.target.value } })}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'social' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-bold border-b border-gray-100 dark:border-gray-800 pb-2">Social Media Links</h3>
                                    <div className="grid gap-6 max-w-xl">
                                        <Input
                                            label="Facebook URL"
                                            value={settings.social.facebook || ''}
                                            onChange={(e) => setSettings({ ...settings, social: { ...settings.social, facebook: e.target.value } })}
                                            placeholder="https://facebook.com/..."
                                        />
                                        <Input
                                            label="Twitter (X) URL"
                                            value={settings.social.twitter || ''}
                                            onChange={(e) => setSettings({ ...settings, social: { ...settings.social, twitter: e.target.value } })}
                                            placeholder="https://twitter.com/..."
                                        />
                                        <Input
                                            label="LinkedIn URL"
                                            value={settings.social.linkedin || ''}
                                            onChange={(e) => setSettings({ ...settings, social: { ...settings.social, linkedin: e.target.value } })}
                                            placeholder="https://linkedin.com/..."
                                        />
                                        <Input
                                            label="Instagram URL"
                                            value={settings.social.instagram || ''}
                                            onChange={(e) => setSettings({ ...settings, social: { ...settings.social, instagram: e.target.value } })}
                                            placeholder="https://instagram.com/..."
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'seo' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-bold border-b border-gray-100 dark:border-gray-800 pb-2">SEO Configuration</h3>
                                    <div className="grid gap-6 max-w-xl">
                                        <Input
                                            label="Meta Title (Default)"
                                            value={settings.seo.title || ''}
                                            onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, title: e.target.value } })}
                                        />
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meta Description</label>
                                            <textarea
                                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                                rows={4}
                                                value={settings.seo.description || ''}
                                                onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, description: e.target.value } })}
                                                placeholder="Brief description of your site for search engines..."
                                            ></textarea>
                                            <p className="text-xs text-gray-400 mt-1">Recommended length: 150-160 characters.</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Keywords</label>
                                            <textarea
                                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                                rows={2}
                                                value={settings.seo.keywords || ''}
                                                onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, keywords: e.target.value } })}
                                                placeholder="Comma separated keywords..."
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
