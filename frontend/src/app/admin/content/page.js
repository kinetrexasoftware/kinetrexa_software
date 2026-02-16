'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Save, RefreshCw, LayoutTemplate, Info, FileText, CheckCircle2, CloudLightning, ShieldCheck, Users, Clock, HeartHandshake, Zap, Award, BarChart, Lock, Globe, MessageSquare, PenTool, Code2, Rocket, Search, Lightbulb, Settings, Flag, Trash, Plus } from 'lucide-react';
import { fetchContent, saveContent } from '@/lib/adminApi';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamic import for Quill editor to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const whyChooseIcons = [
    'CheckCircle2', 'CloudLightning', 'ShieldCheck', 'Users', 'Clock', 'HeartHandshake', 'Zap', 'Award', 'BarChart', 'Lock', 'Globe'
];

const processIcons = [
    'MessageSquare', 'PenTool', 'Code2', 'Rocket', 'Search', 'Lightbulb', 'Settings', 'Flag'
];

export default function ContentManagement() {
    const [activeTab, setActiveTab] = useState('home');
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState({});

    useEffect(() => {
        loadContent(activeTab);
    }, [activeTab]);

    const loadContent = async (section) => {
        setLoading(true);
        try {
            const data = await fetchContent(section);
            // Ensure array structures exist
            if (section === 'why-choose-us' && (!data.items || !Array.isArray(data.items))) {
                data.items = [];
            }
            if (section === 'how-we-work' && (!data.steps || !Array.isArray(data.steps))) {
                data.steps = [];
            }
            if (section === 'about' && (!data.team || !Array.isArray(data.team))) {
                data.team = [];
            }
            setContent(data || {});
        } catch (error) {
            console.error("Failed to load content", error);
            setContent({});
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        const payload = {
            section: activeTab,
            content: content
        };

        toast.promise(
            saveContent(payload),
            {
                loading: 'Saving changes...',
                success: 'Content updated successfully!',
                error: (err) => `Could not save: ${err.message || 'Unknown error'}`,
            }
        );
    };

    // Helper for array manipulation
    const handleArrayItemChange = (arrayName, index, field, value) => {
        const newArray = [...(content[arrayName] || [])];
        if (!newArray[index]) return;
        newArray[index] = { ...newArray[index], [field]: value };
        setContent({ ...content, [arrayName]: newArray });
    };

    const addItem = (arrayName, defaultItem) => {
        const newArray = [...(content[arrayName] || []), defaultItem];
        setContent({ ...content, [arrayName]: newArray });
    };

    const removeItem = (arrayName, index) => {
        const newArray = [...(content[arrayName] || [])].filter((_, i) => i !== index);
        setContent({ ...content, [arrayName]: newArray });
    };

    const tabs = [
        { id: 'global', label: 'Global Info (Footer/Contact)', icon: Globe },
        { id: 'home', label: 'Home Page', icon: LayoutTemplate },
        { id: 'why-choose-us', label: 'Why Choose Us', icon: CheckCircle2 },
        { id: 'how-we-work', label: 'How We Work', icon: Rocket },
        { id: 'about', label: 'About Us', icon: Info },
        { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
        { id: 'terms', label: 'Terms & Conditions', icon: FileText },
    ];

    return (
        <div>
            <Toaster position="top-right" />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Management</h1>
                    <p className="text-gray-500 text-sm">Update website content in real-time without coding.</p>
                </div>
                <Button onClick={handleSave} disabled={loading}>
                    <Save size={16} className="mr-2" />
                    Save Changes
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
                <div className="flex-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 min-h-[500px]">
                    {loading ? (
                        <div className="flex h-full items-center justify-center">
                            <RefreshCw className="animate-spin text-primary-500" size={32} />
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === 'global' && (
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-bold border-b border-gray-100 dark:border-gray-800 pb-2">Global Contact Information</h3>
                                        <p className="text-sm text-gray-500 mb-4">This information will be displayed in the Footer and Contact Page.</p>
                                        <div className="grid gap-6">
                                            <Input
                                                label="Company Phone"
                                                value={content.phone || ''}
                                                onChange={(e) => setContent({ ...content, phone: e.target.value })}
                                            />
                                            <Input
                                                label="Company Email"
                                                value={content.email || ''}
                                                onChange={(e) => setContent({ ...content, email: e.target.value })}
                                            />
                                            <Input
                                                label="Address Line 1"
                                                value={content.address1 || ''}
                                                onChange={(e) => setContent({ ...content, address1: e.target.value })}
                                            />
                                            <Input
                                                label="Address Line 2"
                                                value={content.address2 || ''}
                                                onChange={(e) => setContent({ ...content, address2: e.target.value })}
                                            />
                                            <Input
                                                label="Facebook Link"
                                                value={content.facebook || ''}
                                                onChange={(e) => setContent({ ...content, facebook: e.target.value })}
                                            />
                                            <Input
                                                label="Twitter Link"
                                                value={content.twitter || ''}
                                                onChange={(e) => setContent({ ...content, twitter: e.target.value })}
                                            />
                                            <Input
                                                label="Instagram Link"
                                                value={content.instagram || ''}
                                                onChange={(e) => setContent({ ...content, instagram: e.target.value })}
                                            />
                                            <Input
                                                label="LinkedIn Link"
                                                value={content.linkedin || ''}
                                                onChange={(e) => setContent({ ...content, linkedin: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'home' && (
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-bold border-b border-gray-100 dark:border-gray-800 pb-2">Hero Section</h3>
                                        <div className="grid gap-6">
                                            <Input
                                                label="Hero Title"
                                                value={content.heroTitle || ''}
                                                onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                                            />
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hero Subtitle</label>
                                                <ReactQuill
                                                    theme="snow"
                                                    value={content.heroSubtitle || ''}
                                                    onChange={(value) => setContent({ ...content, heroSubtitle: value })}
                                                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg h-32 mb-12"
                                                />
                                            </div>
                                            <div className="flex items-center gap-4 pt-4">
                                                <Input
                                                    label="CTA Button Text"
                                                    value={content.ctaText || ''}
                                                    onChange={(e) => setContent({ ...content, ctaText: e.target.value })}
                                                    className="flex-1"
                                                />
                                                <div className="flex items-center gap-2 mt-6">
                                                    <input
                                                        type="checkbox"
                                                        checked={content.featuresEnabled || false}
                                                        onChange={(e) => setContent({ ...content, featuresEnabled: e.target.checked })}
                                                        className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                                                    />
                                                    <label className="text-sm text-gray-700 dark:text-gray-300">Show Feature Section</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'why-choose-us' && (
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-bold border-b border-gray-100 dark:border-gray-800 pb-2">Why Choose Us Section</h3>
                                        <div className="grid gap-6">
                                            <Input
                                                label="Section Title"
                                                value={content.title || ''}
                                                onChange={(e) => setContent({ ...content, title: e.target.value })}
                                            />
                                            <Input
                                                label="Section Subtitle"
                                                value={content.subtitle || ''}
                                                onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                                            />

                                            <div className="mt-4">
                                                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">Reasons Items</label>
                                                <div className="space-y-4">
                                                    {(content.items || []).map((item, index) => (
                                                        <div key={index} className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800/50 relative">
                                                            <button
                                                                onClick={() => removeItem('items', index)}
                                                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                                            >
                                                                <Trash size={16} />
                                                            </button>
                                                            <div className="grid gap-3">
                                                                <div className="grid grid-cols-2 gap-3">
                                                                    <Input
                                                                        label="Title"
                                                                        value={item.title || ''}
                                                                        onChange={(e) => handleArrayItemChange('items', index, 'title', e.target.value)}
                                                                    />
                                                                    <div>
                                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icon</label>
                                                                        <select
                                                                            value={item.icon || ''}
                                                                            onChange={(e) => handleArrayItemChange('items', index, 'icon', e.target.value)}
                                                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                                                        >
                                                                            <option value="">Select Icon</option>
                                                                            {whyChooseIcons.map(icon => (
                                                                                <option key={icon} value={icon}>{icon}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                                                    <textarea
                                                                        value={item.desc || ''}
                                                                        onChange={(e) => handleArrayItemChange('items', index, 'desc', e.target.value)}
                                                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                                                        rows={2}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <Button variant="outline" size="sm" onClick={() => addItem('items', { title: '', desc: '', icon: 'CheckCircle2' })}>
                                                        <Plus size={16} className="mr-2" /> Add Reason
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'how-we-work' && (
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-bold border-b border-gray-100 dark:border-gray-800 pb-2">How We Work Section</h3>
                                        <div className="grid gap-6">
                                            <Input
                                                label="Section Title"
                                                value={content.title || ''}
                                                onChange={(e) => setContent({ ...content, title: e.target.value })}
                                            />
                                            <Input
                                                label="Section Subtitle"
                                                value={content.subtitle || ''}
                                                onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                                            />

                                            <div className="mt-4">
                                                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">Process Steps</label>
                                                <div className="space-y-4">
                                                    {(content.steps || []).map((step, index) => (
                                                        <div key={index} className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800/50 relative">
                                                            <div className="absolute -left-3 top-4 bg-primary-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                                                                {index + 1}
                                                            </div>
                                                            <button
                                                                onClick={() => removeItem('steps', index)}
                                                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                                            >
                                                                <Trash size={16} />
                                                            </button>
                                                            <div className="grid gap-3 ml-3">
                                                                <div className="grid grid-cols-2 gap-3">
                                                                    <Input
                                                                        label="Step Title"
                                                                        value={step.title || ''}
                                                                        onChange={(e) => handleArrayItemChange('steps', index, 'title', e.target.value)}
                                                                    />
                                                                    <div>
                                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icon</label>
                                                                        <select
                                                                            value={step.icon || ''}
                                                                            onChange={(e) => handleArrayItemChange('steps', index, 'icon', e.target.value)}
                                                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                                                        >
                                                                            <option value="">Select Icon</option>
                                                                            {processIcons.map(icon => (
                                                                                <option key={icon} value={icon}>{icon}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                                                    <textarea
                                                                        value={step.desc || ''}
                                                                        onChange={(e) => handleArrayItemChange('steps', index, 'desc', e.target.value)}
                                                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                                                        rows={2}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <Button variant="outline" size="sm" onClick={() => addItem('steps', { title: '', desc: '', icon: 'MessageSquare' })}>
                                                        <Plus size={16} className="mr-2" /> Add Step
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'about' && (
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-bold border-b border-gray-100 dark:border-gray-800 pb-2">Company Info</h3>
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Our Mission</label>
                                                <textarea
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                                    rows={4}
                                                    value={content.mission || ''}
                                                    onChange={(e) => setContent({ ...content, mission: e.target.value })}
                                                ></textarea>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Our Vision</label>
                                                <textarea
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                                    rows={4}
                                                    value={content.vision || ''}
                                                    onChange={(e) => setContent({ ...content, vision: e.target.value })}
                                                ></textarea>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={content.teamVisible || false}
                                                    onChange={(e) => setContent({ ...content, teamVisible: e.target.checked })}
                                                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                                                />
                                                <label className="text-sm text-gray-700 dark:text-gray-300">Display Team Members Section</label>
                                            </div>

                                            {content.teamVisible && (
                                                <div className="mt-4">
                                                    <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">Team Members</label>
                                                    <div className="space-y-4">
                                                        {(content.team || []).map((member, index) => (
                                                            <div key={index} className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800/50 relative">
                                                                <button
                                                                    onClick={() => removeItem('team', index)}
                                                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                                                >
                                                                    <Trash size={16} />
                                                                </button>
                                                                <div className="grid gap-3">
                                                                    <div className="grid grid-cols-2 gap-3">
                                                                        <Input
                                                                            label="Name"
                                                                            value={member.name || ''}
                                                                            onChange={(e) => handleArrayItemChange('team', index, 'name', e.target.value)}
                                                                        />
                                                                        <Input
                                                                            label="Role"
                                                                            value={member.role || ''}
                                                                            onChange={(e) => handleArrayItemChange('team', index, 'role', e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                                                                        <textarea
                                                                            value={member.bio || ''}
                                                                            onChange={(e) => handleArrayItemChange('team', index, 'bio', e.target.value)}
                                                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                                                            rows={2}
                                                                        />
                                                                    </div>
                                                                    <div className="grid grid-cols-3 gap-3">
                                                                        <Input
                                                                            label="LinkedIn"
                                                                            value={member.linkedin || ''}
                                                                            onChange={(e) => handleArrayItemChange('team', index, 'linkedin', e.target.value)}
                                                                        />
                                                                        <Input
                                                                            label="Twitter"
                                                                            value={member.twitter || ''}
                                                                            onChange={(e) => handleArrayItemChange('team', index, 'twitter', e.target.value)}
                                                                        />
                                                                        <Input
                                                                            label="GitHub"
                                                                            value={member.github || ''}
                                                                            onChange={(e) => handleArrayItemChange('team', index, 'github', e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <Button variant="outline" size="sm" onClick={() => addItem('team', { name: '', role: '', bio: '', linkedin: '', twitter: '', github: '' })}>
                                                            <Plus size={16} className="mr-2" /> Add Team Member
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'privacy' && (
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-bold border-b border-gray-100 dark:border-gray-800 pb-2">Privacy Policy Editor</h3>
                                        <div>
                                            <ReactQuill
                                                theme="snow"
                                                value={content.content || ''}
                                                onChange={(value) => setContent({ ...content, content: value })}
                                                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg h-[400px]"
                                            />
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'terms' && (
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-bold border-b border-gray-100 dark:border-gray-800 pb-2">Terms & Conditions Editor</h3>
                                        <div>
                                            <ReactQuill
                                                theme="snow"
                                                value={content.content || ''}
                                                onChange={(value) => setContent({ ...content, content: value })}
                                                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg h-[400px]"
                                            />
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    );
}
