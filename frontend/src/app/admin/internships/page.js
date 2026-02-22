'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Search, Filter, ChevronDown, MoreHorizontal, X, Save, Upload, Loader2, Calendar, MapPin, DollarSign, Clock, GraduationCap } from 'lucide-react';
import adminApi, { fetchAdminInternships, createInternship, updateInternship, deleteInternship } from '@/lib/adminApi';
import toast from 'react-hot-toast';

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
        const res = await adminApi.post('/upload/image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return res.data; // { success: true, url: '...' }
    } catch (error) {
        console.error("Upload error:", error);
        throw error;
    }
};

export default function InternshipsPage() {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingInternship, setEditingInternship] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        type: 'Free', // Free, Paid
        mode: 'Remote', // Remote, Hybrid, Onsite
        duration: '',
        stipend: { amount: 0, currency: 'INR', isPaid: false },
        applicationFee: { amount: 0, currency: 'INR', isMandatory: false },
        location: 'Remote',
        startDate: '',
        deadline: '',
        technologies: '',
        requirements: '',
        responsibilities: '', // Added
        perks: '', // Added
        description: '',
        shortDescription: '',
        image: '',
        isActive: true
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchInternships();
    }, []);

    const fetchInternships = async () => {
        try {
            setLoading(true);
            const data = await fetchAdminInternships();
            // The API returns { success: true, count: ..., internships: [...] }
            if (data) {
                setInternships(Array.isArray(data) ? data : (data.internships || []));
            } else {
                setInternships([]);
            }

        } catch (error) {
            console.error(error);
            toast.error('Failed to load internships');
            setInternships([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            // Process array fields
            const processedData = {
                ...formData,
                technologies: typeof formData.technologies === 'string' ? formData.technologies.split(',').map(item => item.trim()).filter(i => i) : formData.technologies,
                requirements: typeof formData.requirements === 'string' ? formData.requirements.split('\n').map(item => item.trim()).filter(i => i) : formData.requirements,
                responsibilities: typeof formData.responsibilities === 'string' ? formData.responsibilities.split('\n').map(item => item.trim()).filter(i => i) : formData.responsibilities,
                perks: typeof formData.perks === 'string' ? formData.perks.split('\n').map(item => item.trim()).filter(i => i) : formData.perks,
                // Ensure numeric values
                amount: formData.amount ? Number(formData.amount) : 0,
            };

            if (editingInternship) {
                await updateInternship(editingInternship._id || editingInternship.id, processedData);
                toast.success('Internship updated');
            } else {
                await createInternship(processedData);
                toast.success('Internship created');
            }
            closeModal();
            fetchInternships();
        } catch (error) {
            console.error(error);
            toast.error('Failed to save internship');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this internship?')) return;
        try {
            await deleteInternship(id);
            setInternships(internships.filter(i => (i._id || i.id) !== id));
            toast.success('Internship deleted');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete');
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            await adminApi.put(`/internships/${id}/toggle`);
            setInternships(internships.map(i =>
                (i._id || i.id) === id ? { ...i, isActive: !currentStatus } : i
            ));
            toast.success(`Internship ${!currentStatus ? 'Activated' : 'Deactivated'}`);
        } catch (error) {
            console.error(error);
            toast.error('Failed to update status');
        }
    };


    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploading(true);
            const res = await uploadImage(file);
            // Verify the response structure from your uploadImage function or backend
            // Assuming res.url or res.imageUrl is the key
            const url = res.url || res.imageUrl;

            if (url) {
                setFormData({ ...formData, image: url });
                toast.success('Image uploaded');
            } else {
                toast.error('Upload failed: No URL returned');
            }
        } catch (error) {
            console.error(error);
            toast.error('Scan failed');
        } finally {
            setUploading(false);
        }
    };

    const openModal = (internship = null) => {
        if (internship) {
            setEditingInternship(internship);
            setFormData({
                ...internship,
                technologies: Array.isArray(internship.technologies) ? internship.technologies.join(', ') : (internship.technologies || ''),
                requirements: Array.isArray(internship.requirements) ? internship.requirements.join('\n') : (internship.requirements || ''),
                responsibilities: Array.isArray(internship.responsibilities) ? internship.responsibilities.join('\n') : (internship.responsibilities || ''),
                perks: Array.isArray(internship.perks) ? internship.perks.join('\n') : (internship.perks || ''),
                // Dates might need formatting for input type="date"
                startDate: internship.startDate ? new Date(internship.startDate).toISOString().split('T')[0] : '',
                deadline: internship.deadline ? new Date(internship.deadline).toISOString().split('T')[0] : '',
            });
        } else {
            setEditingInternship(null);
            setFormData({
                title: '',
                type: 'Free',
                mode: 'Remote',
                duration: '',
                stipend: { amount: 0, currency: 'INR', isPaid: false },
                applicationFee: { amount: 0, currency: 'INR', isMandatory: false },
                location: 'Remote',
                startDate: '',
                deadline: '',
                technologies: '',
                requirements: '',
                responsibilities: '',
                perks: '',
                description: '',
                shortDescription: '',
                image: '',
                isActive: true
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingInternship(null);
    };

    // Filter logic
    const filteredInternships = internships.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All'
            ? true
            : filterStatus === 'Active' ? item.isActive
                : !item.isActive;
        return matchesSearch && matchesStatus;
    });

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary-600" /></div>;

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Internships</h1>
                    <p className="text-gray-500 text-sm">Manage internship programs and applications.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors shadow-sm"
                >
                    <Plus size={18} /> New Internship
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search internships..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    {['All', 'Active', 'Inactive'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border
                                ${filterStatus === status
                                    ? 'bg-primary-50 border-primary-100 text-primary-700 dark:bg-primary-900/30 dark:border-primary-800 dark:text-primary-400'
                                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredInternships.map((internship) => (
                    <motion.div
                        key={internship._id || internship.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
                    >
                        {/* Image Header */}
                        <div className="h-40 bg-gray-100 dark:bg-gray-700 relative">
                            {internship.image ? (
                                <img src={internship.image} alt={internship.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-purple-500/20">
                                    <GraduationCap className="text-primary-500/50" size={48} />
                                </div>
                            )}
                            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md
                                ${internship.isActive ? 'bg-green-100/90 text-green-700' : 'bg-gray-100/90 text-gray-600'}`}>
                                {internship.isActive ? 'Active' : 'Inactive'}
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1" title={internship.title}>{internship.title}</h3>
                                {/* Actions */}
                                <div className="flex gap-2">
                                    <button onClick={() => openModal(internship)} className="text-gray-400 hover:text-blue-500 transition-colors"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(internship._id || internship.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                </div>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
                                    <Clock size={14} />
                                    <span>{internship.duration}</span>
                                    <span className="mx-1">•</span>
                                    <span>{internship.type}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
                                    <Calendar size={14} />
                                    <span>DL: {new Date(internship.deadline).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {(internship.technologies || []).slice(0, 3).map((tech, i) => (
                                    <span key={i} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                                        {tech}
                                    </span>
                                ))}
                                {(internship.technologies || []).length > 3 && (
                                    <span className="text-xs px-2 py-1 bg-gray-50 text-gray-400 rounded">+{internship.technologies.length - 3}</span>
                                )}
                            </div>


                            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {internship.type === 'Paid'
                                        ? `₹${internship.amount || 0}`
                                        : 'Free'}
                                </div>
                                <button
                                    onClick={() => handleToggleStatus(internship._id || internship.id, internship.isActive)}
                                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors
                                        ${internship.isActive
                                            ? 'border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400'
                                            : 'border-green-200 text-green-600 bg-green-50 hover:bg-green-100 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400'
                                        }`}
                                >
                                    {internship.isActive ? 'Deactivate' : 'Activate'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
                        >
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur z-10">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {editingInternship ? 'Edit Internship' : 'New Internship'}
                                </h3>
                                <button onClick={closeModal}><X className="text-gray-500 hover:text-gray-900 dark:hover:text-white" /></button>
                            </div>

                            <form onSubmit={handleSave} className="p-6 space-y-6">
                                {/* Banner Image */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Banner Image</label>
                                    <div className="relative h-48 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-700 group transition-colors hover:border-primary-400">
                                        {formData.image ? (
                                            <>
                                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <p className="text-white font-medium">Click to change</p>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                                <Upload size={32} className="mb-2" />
                                                <p className="text-sm">Upload Banner</p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={handleImageUpload}
                                            accept="image/*"
                                            disabled={uploading}
                                        />
                                        {uploading && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                <Loader2 className="animate-spin text-white" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                                        <input
                                            required
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                                        <select
                                            value={formData.type}
                                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                                            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                        >
                                            <option value="Free">Free</option>
                                            <option value="Paid">Paid</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mode</label>
                                        <select
                                            value={formData.mode}
                                            onChange={e => setFormData({ ...formData, mode: e.target.value })}
                                            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                        >
                                            <option value="Remote">Remote</option>
                                            <option value="Hybrid">Hybrid</option>
                                            <option value="Onsite">Onsite</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration</label>
                                        <input
                                            placeholder="e.g. 3 Months"
                                            value={formData.duration}
                                            onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                                        <input
                                            value={formData.location}
                                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                                        <input
                                            type="date"
                                            value={formData.startDate}
                                            onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deadline</label>
                                        <input
                                            type="date"
                                            value={formData.deadline}
                                            onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                                            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Financial details */}
                                {formData.type === 'Paid' && (
                                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Price Amount (₹)</label>
                                        <input
                                            type="number"
                                            placeholder="Enter amount"
                                            value={formData.amount || ''}
                                            onChange={e => setFormData({ ...formData, amount: Number(e.target.value) })}
                                            onWheel={(e) => e.target.blur()}
                                            className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Technologies (comma separated)</label>
                                    <input
                                        placeholder="React, Node.js, Python..."
                                        value={formData.technologies}
                                        onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Description</label>
                                    <textarea
                                        required
                                        rows={2}
                                        value={formData.shortDescription}
                                        onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (Markdown supported)</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                    />
                                </div>


                                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <button
                                        type="submit"
                                        disabled={uploading}
                                        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {uploading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                                        {editingInternship ? 'Update Internship' : 'Create Internship'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
