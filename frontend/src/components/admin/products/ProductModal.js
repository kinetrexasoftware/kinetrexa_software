'use client';
import { useState, useEffect } from 'react';
import { X, PlusCircle, MinusCircle, Layers, Shield, Zap, Home, BarChart3, Users, Globe, Smartphone, Cloud, Database, Code, Cpu, Activity, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

const iconList = [
    { name: 'Home', Icon: Home },
    { name: 'BarChart3', Icon: BarChart3 },
    { name: 'Users', Icon: Users },
    { name: 'Globe', Icon: Globe },
    { name: 'Smartphone', Icon: Smartphone },
    { name: 'Cloud', Icon: Cloud },
    { name: 'Database', Icon: Database },
    { name: 'Layers', Icon: Layers },
    { name: 'Code', Icon: Code },
    { name: 'Cpu', Icon: Cpu },
    { name: 'Activity', Icon: Activity },
    { name: 'Zap', Icon: Zap },
    { name: 'Shield', Icon: Shield },
    { name: 'Sparkles', Icon: Sparkles }
];

const gradientThemes = [
    { label: 'Blue Ocean', value: 'from-blue-600 to-cyan-500' },
    { label: 'Indigo Night', value: 'from-indigo-600 to-blue-700' },
    { label: 'Purple Haze', value: 'from-purple-600 to-violet-600' },
    { label: 'Sunset Orange', value: 'from-amber-500 to-orange-600' },
    { label: 'Emerald Forest', value: 'from-emerald-600 to-teal-500' },
    { label: 'Deep Crimson', value: 'from-rose-600 to-red-600' }
];

const ListInput = ({ label, items, onChange }) => {
    const addItem = () => onChange([...items, ""]);
    const removeItem = (index) => onChange(items.filter((_, i) => i !== index));
    const updateItem = (index, value) => {
        const newItems = [...items];
        newItems[index] = value;
        onChange(newItems);
    };

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                <button type="button" onClick={addItem} className="text-primary-600 hover:text-primary-700 flex items-center text-xs font-semibold">
                    <PlusCircle size={14} className="mr-1" /> Add
                </button>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto p-1">
                {items.map((item, index) => (
                    <div key={index} className="flex gap-2">
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => updateItem(index, e.target.value)}
                            className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                            placeholder={`Enter ${label.toLowerCase()}`}
                        />
                        <button type="button" onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700">
                            <MinusCircle size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function ProductModal({ isOpen, onClose, onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        name: '',
        tagline: '',
        shortDescription: '',
        longDescription: '',
        logo: 'Box',
        status: 'Coming Soon',
        category: 'SaaS',
        features: [],
        gradientTheme: 'from-blue-600 to-cyan-500',
        websiteLink: '',
        androidLink: '',
        iosLink: '',
        isFeatured: false,
        isActive: true
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                features: initialData.features || []
            });
        } else {
            setFormData({
                name: '',
                tagline: '',
                shortDescription: '',
                longDescription: '',
                logo: 'Box',
                status: 'Coming Soon',
                category: 'SaaS',
                features: [],
                gradientTheme: 'from-blue-600 to-cyan-500',
                websiteLink: '',
                androidLink: '',
                iosLink: '',
                isFeatured: false,
                isActive: true
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white dark:bg-[#0B1220] rounded-2xl w-full max-w-2xl my-8 shadow-2xl border border-gray-100 dark:border-white/10">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-white/10 sticky top-0 bg-white dark:bg-[#0B1220] z-10">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {initialData ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Product Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tagline</label>
                            <input
                                type="text"
                                value={formData.tagline}
                                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Short Description</label>
                        <input
                            type="text"
                            value={formData.shortDescription}
                            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            placeholder="Brief catchy description"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Long Description</label>
                        <textarea
                            value={formData.longDescription}
                            onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            rows={4}
                            required
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                            <input
                                type="text"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            >
                                <option value="Live">Live</option>
                                <option value="Beta">Beta</option>
                                <option value="Coming Soon">Coming Soon</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Logo Icon</label>
                            <div className="grid grid-cols-7 gap-2 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                                {iconList.map(({ name, Icon }) => (
                                    <button
                                        key={name}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, logo: name })}
                                        className={`flex items-center justify-center p-2 rounded-md transition-all ${formData.logo === name ? 'bg-primary-500 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                    >
                                        <Icon size={18} />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Gradient Theme</label>
                            <select
                                value={formData.gradientTheme}
                                onChange={(e) => setFormData({ ...formData, gradientTheme: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            >
                                {gradientThemes.map(theme => (
                                    <option key={theme.value} value={theme.value}>{theme.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>



                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Website Link</label>
                            <input
                                type="url"
                                value={formData.websiteLink}
                                onChange={(e) => setFormData({ ...formData, websiteLink: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                placeholder="https://..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Android Link</label>
                            <input
                                type="url"
                                value={formData.androidLink}
                                onChange={(e) => setFormData({ ...formData, androidLink: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                placeholder="Play Store URL"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">iOS Link</label>
                            <input
                                type="url"
                                value={formData.iosLink}
                                onChange={(e) => setFormData({ ...formData, iosLink: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                placeholder="App Store URL"
                            />
                        </div>
                    </div>

                    <ListInput
                        label="Product Features"
                        items={formData.features}
                        onChange={(features) => setFormData({ ...formData, features })}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-white/10">
                            <input
                                type="checkbox"
                                checked={formData.isFeatured}
                                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Featured on Home</label>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-white/10">
                            <select
                                value={formData.isActive ? "true" : "false"}
                                onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "true" })}
                                className="w-full bg-transparent border-none text-sm font-semibold focus:ring-0"
                            >
                                <option value="true">Active (Public)</option>
                                <option value="false">Archived (Hidden)</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-white/10">
                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="px-8 py-2 rounded-lg bg-primary-600 text-white text-sm font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-colors">
                            {initialData ? 'Update Product' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
}
