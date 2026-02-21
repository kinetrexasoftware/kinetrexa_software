import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Save, Loader2, Briefcase, MapPin, Upload } from 'lucide-react';
import { api } from '../lib/api';
import toast from 'react-hot-toast';

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const token = localStorage.getItem('adminToken');

    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/upload/image`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });

    if (!res.ok) throw new Error('Image upload failed');
    return await res.json();
};

const Careers = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        role: '',
        type: 'Full-time',
        location: 'Remote',
        description: '',
        requirements: '', // text area, split by newline
        salary: '',
        image: '',
        status: 'Active'
    });

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/careers');
            setJobs(data.data || []);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load jobs');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                requirements: formData.requirements.split('\n').filter(r => r.trim())
            };

            if (editingJob) {
                await api.put(`/careers/${editingJob._id}`, payload);
                toast.success('Job updated');
            } else {
                await api.post('/careers', payload);
                toast.success('Job posted');
            }

            closeModal();
            fetchJobs();
        } catch (error) {
            console.error(error);
            toast.error('Failed to save job');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job posting?')) return;
        try {
            await api.delete(`/careers/${id}`);
            setJobs(jobs.filter(j => j._id !== id));
            toast.success('Job deleted');
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploading(true);
            const res = await uploadImage(file);
            setFormData({ ...formData, image: res.imageUrl });
            toast.success('Banner uploaded');
        } catch (error) {
            toast.error('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const openModal = (job = null) => {
        if (job) {
            setEditingJob(job);
            setFormData({
                ...job,
                requirements: job.requirements ? job.requirements.join('\n') : ''
            });
        } else {
            setEditingJob(null);
            setFormData({
                role: '',
                type: 'Full-time',
                location: 'Remote',
                description: '',
                requirements: '',
                salary: '',
                image: '',
                status: 'Active'
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingJob(null);
    };

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-brand-primary" /></div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Careers Management</h1>
                    <p className="text-text-secondary">Manage job openings and opportunities.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-lg transition-colors"
                >
                    <Plus size={18} /> Post Job
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {jobs.map((job) => (
                    <motion.div
                        key={job._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-dark-secondary/30 border border-white/10 rounded-xl p-6 flex justify-between items-center group hover:border-brand-primary/30 transition-all"
                    >
                        <div className="flex gap-4 items-center">
                            {job.image ? (
                                <img src={job.image} alt={job.role} className="w-16 h-16 rounded-lg object-cover border border-white/10" />
                            ) : (
                                <div className="w-16 h-16 rounded-lg bg-dark-bg border border-white/10 flex items-center justify-center text-brand-primary">
                                    <Briefcase size={24} />
                                </div>
                            )}

                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">{job.role}</h3>
                                <div className="flex gap-4 text-sm text-text-secondary">
                                    <span className="flex items-center gap-1"><Briefcase size={14} /> {job.type}</span>
                                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                                    <span className={`px-2 py-0.5 rounded text-xs ${job.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                        {job.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openModal(job)} className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg"><Edit2 size={18} /></button>
                            <button onClick={() => handleDelete(job._id)} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg"><Trash2 size={18} /></button>
                        </div>
                    </motion.div>
                ))}

                {jobs.length === 0 && (
                    <div className="text-center py-20 bg-dark-secondary/10 rounded-xl border border-white/5 border-dashed">
                        <p className="text-text-secondary">No active job postings. Create one to get started.</p>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-dark-card border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white">
                                    {editingJob ? 'Edit Job Posting' : 'Post New Job'}
                                </h3>
                                <button onClick={closeModal}><X className="text-text-secondary hover:text-white" /></button>
                            </div>

                            <form onSubmit={handleSave} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary mb-1">Job Role</label>
                                        <input
                                            required
                                            value={formData.role}
                                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                                            className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-primary outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary mb-1">Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={e => setFormData({ ...formData, status: e.target.value })}
                                            className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-primary outline-none"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary mb-1">Type</label>
                                        <select
                                            value={formData.type}
                                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                                            className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-primary outline-none"
                                        >
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Internship">Internship</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary mb-1">Location</label>
                                        <input
                                            required
                                            value={formData.location}
                                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-primary outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-primary outline-none resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-1">Requirements (One per line)</label>
                                    <textarea
                                        rows={4}
                                        value={formData.requirements}
                                        onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                                        placeholder="- React.js experience&#10;- Knowledge of Node.js"
                                        className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-primary outline-none resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-1">Job Banner (Optional)</label>
                                    <div className="flex items-center gap-4">
                                        {formData.image && (
                                            <img src={formData.image} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-white/10" />
                                        )}
                                        <label className="flex items-center gap-2 px-4 py-2 bg-dark-bg border border-white/10 rounded-lg cursor-pointer hover:border-brand-primary/50 transition-colors">
                                            {uploading ? <Loader2 className="animate-spin text-brand-primary" size={18} /> : <Upload size={18} className="text-gray-400" />}
                                            <span className="text-sm text-text-secondary">Upload Image</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="w-full mt-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                                >
                                    <Save size={18} /> {editingJob ? 'Update Job' : 'Post Job'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Careers;
