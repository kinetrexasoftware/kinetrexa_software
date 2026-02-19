'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Upload, X, Save, Loader2, Github, Linkedin, Twitter } from 'lucide-react';
import adminApi, { fetchContent } from '@/lib/adminApi';
import toast from 'react-hot-toast';

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const res = await adminApi.post('/upload/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data; // Expecting { success: true, imageUrl: ... }
    } catch (error) {
        console.error("Upload error:", error);
        throw error;
    }
};

export default function TeamPage() {
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
            const content = await fetchContent('about');
            // Handle both legacy array and new object structure
            let teamData = [];
            if (content.team) {
                teamData = content.team;
            } else if (Array.isArray(content)) {
                teamData = content;
            }
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
            // Update Backend
            // Wrap in content object as expected by backend
            await adminApi.put('/content/section/about', {
                content: {
                    team: updatedTeam,
                    teamVisible: true
                }
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
            await adminApi.put('/content/section/about', {
                content: {
                    team: updatedTeam
                }
            });
            setTeam(updatedTeam);
            toast.success('Member removed');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete');
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploading(true);
            const res = await uploadImage(file);
            // res.data should contain imageUrl if backend returns standard response
            // check structure: { success: true, imageUrl: '...' }
            const imageUrl = res.imageUrl || res.url;

            if (imageUrl) {
                setFormData({ ...formData, image: imageUrl });
                toast.success('Image uploaded');
            } else {
                throw new Error('Invalid upload response');
            }
        } catch (error) {
            console.error(error);
            toast.error('Upload failed. Check Cloudinary config.');
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

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary-600" /></div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Team Management</h1>
                    <p className="text-gray-500 text-sm">Manage your team members and their profiles.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors shadow-sm"
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
                        className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 group hover:border-primary-500/30 transition-all shadow-sm relative"
                    >
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button onClick={() => openModal(member, index)} className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg dark:bg-blue-900/30 dark:text-blue-400"><Edit2 size={16} /></button>
                            <button onClick={() => handleDelete(index)} className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-400"><Trash2 size={16} /></button>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shrink-0">
                                {member.image ? (
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xl font-bold text-primary-600 dark:text-primary-400">
                                        {member.name?.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white">{member.name}</h3>
                                <p className="text-primary-600 dark:text-primary-400 text-sm">{member.role}</p>
                            </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{member.bio}</p>

                        <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                            {member.linkedin && <Linkedin size={16} className="text-gray-400 hover:text-blue-600 cursor-pointer" />}
                            {member.twitter && <Twitter size={16} className="text-gray-400 hover:text-sky-500 cursor-pointer" />}
                            {member.github && <Github size={16} className="text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer" />}
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {editingMember !== null ? 'Edit Member' : 'Add New Member'}
                                </h3>
                                <button onClick={closeModal}><X className="text-gray-500 hover:text-gray-900 dark:hover:text-white" /></button>
                            </div>

                            <form onSubmit={handleSave} className="space-y-4">
                                <div className="flex justify-center mb-6">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                            {formData.image ? (
                                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
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
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.role}
                                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                                            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                                    <textarea
                                        rows={3}
                                        value={formData.bio}
                                        onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none resize-none transition-all"
                                    />
                                </div>

                                <div className="space-y-3 pt-2">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-2">Social Links (Optional)</p>
                                    <div className="flex items-center gap-3">
                                        <Linkedin size={18} className="text-blue-600 dark:text-blue-400 shrink-0" />
                                        <input
                                            placeholder="LinkedIn URL"
                                            value={formData.linkedin}
                                            onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                                            className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Twitter size={18} className="text-sky-500 dark:text-sky-400 shrink-0" />
                                        <input
                                            placeholder="Twitter URL"
                                            value={formData.twitter}
                                            onChange={e => setFormData({ ...formData, twitter: e.target.value })}
                                            className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Github size={18} className="text-gray-700 dark:text-gray-300 shrink-0" />
                                        <input
                                            placeholder="GitHub URL"
                                            value={formData.github}
                                            onChange={e => setFormData({ ...formData, github: e.target.value })}
                                            className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-md"
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
