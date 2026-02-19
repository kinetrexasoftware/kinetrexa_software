import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Upload, X, Save, Loader2, Github, Linkedin, Twitter } from 'lucide-react';
import { api } from '../../lib/api';
import toast from 'react-hot-toast';

// Simple API service wrapper if not exists
const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const token = localStorage.getItem('token');

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

const TeamManager = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [formData, setFormData] = useState({
        name: '', role: '', bio: '', image: '',
        linkedin: '', twitter: '', github: ''
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchTeam();
    }, []);

    const fetchTeam = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/content/about');
            // Ensure we handle both structure types: content.team or just content array if legacy
            const teamData = data.content?.team || [];
            setTeam(teamData);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load team');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            let updatedTeam;
            if (editingMember !== null) {
                // Edit existing
                updatedTeam = team.map((member, idx) =>
                    idx === editingMember ? formData : member
                );
            } else {
                // Add new
                updatedTeam = [...team, formData];
            }

            // Update Backend
            // We use 'about' section update endpoint
            // If strict structure is enforced, we might need to fetch full content first, but let's try direct update
            await api.put('/content/section/about', {
                team: updatedTeam,
                teamVisible: true // Ensure visibility
            });

            setTeam(updatedTeam);
            toast.success(editingMember !== null ? 'Member updated' : 'Member added');
            closeModal();
        } catch (error) {
            console.error(error);
            toast.error('Failed to save changes');
        }
    };

    const handleDelete = async (index) => {
        if (!window.confirm('Are you sure you want to remove this member?')) return;

        try {
            const updatedTeam = team.filter((_, idx) => idx !== index);
            await api.put('/content/section/about', {
                team: updatedTeam
            });
            setTeam(updatedTeam);
            toast.success('Member removed');
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
            toast.success('Image uploaded');
        } catch (error) {
            toast.error('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const openModal = (member = null, index = null) => {
        if (member) {
            setFormData(member);
            setEditingMember(index);
        } else {
            setFormData({
                name: '', role: '', bio: '', image: '',
                linkedin: '', twitter: '', github: ''
            });
            setEditingMember(null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingMember(null);
    };

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-brand-primary" /></div>;

    return (
        <div className="bg-dark-secondary/30 rounded-xl border border-white/5 p-6 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Team Management</h2>
                    <p className="text-text-secondary">Manage your team members and their profiles.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-lg transition-colors"
                >
                    <Plus size={18} /> Add Member
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map((member, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-dark-bg border border-white/10 rounded-xl p-5 group hover:border-brand-primary/30 transition-colors relative"
                    >
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openModal(member, index)} className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg"><Edit2 size={16} /></button>
                            <button onClick={() => handleDelete(index)} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg"><Trash2 size={16} /></button>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-dark-secondary border border-white/10 shrink-0">
                                {member.image ? (
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xl font-bold text-brand-primary">
                                        {member.name?.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-white">{member.name}</h3>
                                <p className="text-brand-primary text-sm">{member.role}</p>
                            </div>
                        </div>
                        <p className="text-text-secondary text-sm mb-4 line-clamp-3">{member.bio}</p>

                        <div className="flex gap-3 mt-auto pt-4 border-t border-white/5">
                            {member.linkedin && <Linkedin size={16} className="text-gray-400" />}
                            {member.twitter && <Twitter size={16} className="text-gray-400" />}
                            {member.github && <Github size={16} className="text-gray-400" />}
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-dark-card border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white">
                                    {editingMember !== null ? 'Edit Member' : 'Add New Member'}
                                </h3>
                                <button onClick={closeModal}><X className="text-text-secondary hover:text-white" /></button>
                            </div>

                            <form onSubmit={handleSave} className="space-y-4">
                                <div className="flex justify-center mb-6">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-full overflow-hidden bg-dark-secondary border border-white/10">
                                            {formData.image ? (
                                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                                    <Upload size={24} />
                                                </div>
                                            )}
                                        </div>
                                        <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity rounded-full">
                                            {uploading ? <Loader2 className="animate-spin text-white" /> : <Upload className="text-white" />}
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                                        </label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary mb-1">Name</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-primary outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary mb-1">Role</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.role}
                                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                                            className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-primary outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-1">Bio</label>
                                    <textarea
                                        rows={3}
                                        value={formData.bio}
                                        onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                        className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-primary outline-none resize-none"
                                    />
                                </div>

                                <div className="space-y-3 pt-2">
                                    <p className="text-sm font-medium text-text-secondary border-b border-white/5 pb-2">Social Links (Optional)</p>
                                    <div className="flex items-center gap-3">
                                        <Linkedin size={18} className="text-blue-400 shrink-0" />
                                        <input
                                            placeholder="LinkedIn URL"
                                            value={formData.linkedin}
                                            onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                                            className="flex-1 bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-brand-primary outline-none"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Twitter size={18} className="text-sky-400 shrink-0" />
                                        <input
                                            placeholder="Twitter URL"
                                            value={formData.twitter}
                                            onChange={e => setFormData({ ...formData, twitter: e.target.value })}
                                            className="flex-1 bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-brand-primary outline-none"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Github size={18} className="text-gray-400 shrink-0" />
                                        <input
                                            placeholder="GitHub URL"
                                            value={formData.github}
                                            onChange={e => setFormData({ ...formData, github: e.target.value })}
                                            className="flex-1 bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-brand-primary outline-none"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="w-full mt-6 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                                >
                                    <Save size={18} /> {editingMember !== null ? 'Update Member' : 'Add Member'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TeamManager;
