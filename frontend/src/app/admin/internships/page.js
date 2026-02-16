'use client';
import { useState, useEffect } from 'react';
import DataTable from '@/components/admin/ui/DataTable';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Plus, Edit2, Trash2, Users, X, Briefcase, Clock, MapPin, DollarSign, Filter, Check, Calendar } from 'lucide-react';
import { fetchAdminInternships, createInternship, updateInternship, deleteInternship, fetchInternshipApplications } from '@/lib/adminApi';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

export default function InternshipManagement() {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);
    const [editingInternship, setEditingInternship] = useState(null);
    const [applicants, setApplicants] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        description: '',
        duration: '',
        startDate: '',
        deadline: '',
        type: 'Free',
        amount: 0,
        mode: 'Remote',
        technologies: '',
        requirements: '',
        isActive: true
    });

    const loadInternships = async () => {
        try {
            setLoading(true);
            const data = await fetchAdminInternships();
            setInternships(Array.isArray(data) ? data : (data.internships || []));
        } catch (error) {
            console.error("Failed to load internships", error);
            toast.error("Failed to load internships");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInternships();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();

        // Prepare payload
        const payload = {
            title: formData.title,
            shortDescription: formData.shortDescription,
            description: formData.description || formData.requirements,
            duration: formData.duration,
            startDate: formData.startDate,
            deadline: formData.deadline,
            type: formData.type,
            amount: formData.type === 'Paid' ? parseInt(formData.amount || 0) : 0,
            mode: formData.mode,
            isActive: formData.isActive,
            technologies: formData.technologies.split(',').map(s => s.trim()).filter(Boolean),
            requirements: formData.requirements.split(',').map(s => s.trim()).filter(Boolean),
            stipend: {
                isPaid: formData.type === 'Paid',
                amount: formData.type === 'Paid' ? parseInt(formData.amount || 0) : 0,
                currency: 'INR'
            }
        };

        try {
            if (editingInternship) {
                await updateInternship(editingInternship.id || editingInternship._id, payload);
                toast.success('Internship updated');
            } else {
                await createInternship(payload);
                toast.success('Internship posted');
            }
            setIsModalOpen(false);
            loadInternships(); // Reload from DB
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Failed to save');
        }
    };

    const openModal = (internship = null) => {
        if (internship) {
            setEditingInternship(internship);
            setFormData({
                title: internship.title,
                shortDescription: internship.shortDescription || '',
                description: internship.description || '',
                duration: internship.duration,
                startDate: internship.startDate ? new Date(internship.startDate).toISOString().split('T')[0] : '',
                deadline: internship.deadline ? new Date(internship.deadline).toISOString().split('T')[0] : '',
                type: internship.type || 'Free',
                amount: internship.amount || 0,
                mode: internship.mode || 'Remote',
                technologies: internship.technologies?.join(', ') || '',
                requirements: internship.requirements?.join(', ') || '',
                isActive: internship.isActive
            });
        } else {
            setEditingInternship(null);
            setFormData({
                title: '',
                shortDescription: '',
                description: '',
                duration: '',
                startDate: '',
                deadline: '',
                type: 'Free',
                amount: 0,
                mode: 'Remote',
                technologies: '',
                requirements: '',
                isActive: true
            });
        }
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this internship posting?')) {
            try {
                await deleteInternship(id);
                toast.success('Internship deleted');
                setInternships(internships.filter(i => i.id !== id && i._id !== id));
            } catch (error) {
                toast.error('Failed to delete');
            }
        }
    };

    // Columns matching REAL schema
    const columns = [
        { header: 'Role', accessor: 'title' },
        {
            header: 'Duration',
            render: (row) => <div className="flex items-center gap-1"><Clock size={14} className="text-gray-400" />{row.duration}</div>
        },
        {
            header: 'Type',
            render: (row) => <div className="flex items-center gap-1"><MapPin size={14} className="text-gray-400" />{row.mode}</div>
        },
        {
            header: 'Compensation',
            render: (row) => (
                <div className="flex items-center gap-1 font-medium">
                    {row.type === 'Paid' ? (
                        <span className="text-green-600">₹{row.amount}</span>
                    ) : (
                        <span className="text-gray-500">Free</span>
                    )}
                </div>
            )
        },
        {
            header: 'Deadline',
            render: (row) => (
                <div className="flex items-center gap-1 text-xs">
                    <Calendar size={14} className="text-gray-400" />
                    {row.deadline ? new Date(row.deadline).toLocaleDateString() : 'N/A'}
                </div>
            )
        },
        {
            header: 'Status',
            render: (row) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.isActive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                    {row.isActive ? 'Active' : 'Inactive'}
                </span>
            )
        },
        {
            header: 'Actions',
            render: (row) => (
                <div className="flex gap-2 justify-end">
                    <button onClick={() => openModal(row)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-blue-500 transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(row.id || row._id)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-red-500 transition-colors"><Trash2 size={16} /></button>
                </div>
            )
        },
    ];

    return (
        <div>
            <Toaster position="top-right" />
            <DataTable
                title="Internship Programs"
                subtitle="Manage internship openings and track applications."
                columns={columns}
                data={internships}
                actions={
                    <Button onClick={() => openModal()}>
                        <Plus size={16} className="mr-2" />
                        Post Internship
                    </Button>
                }
            />

            {/* Post/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg overflow-y-auto max-h-[90vh]"
                        >
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                                <h3 className="text-lg font-bold">{editingInternship ? 'Edit Internship' : 'Post New Internship'}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="p-6 space-y-4">
                                <Input
                                    label="Role Title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    icon={Briefcase}
                                    placeholder="e.g. Frontend developer"
                                />

                                <Input
                                    label="Short Description"
                                    value={formData.shortDescription}
                                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                                    required
                                    placeholder="Brief summary for internship card"
                                    maxlength={200}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Duration"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        required
                                        placeholder="e.g. 1 Month"
                                    />
                                    <Input
                                        label="Start Date"
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Application Deadline"
                                        type="date"
                                        value={formData.deadline}
                                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                        required
                                    />
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                        <select
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                            value={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                                        >
                                            <option value={true}>Active</option>
                                            <option value={false}>Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mode</label>
                                        <select
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                            value={formData.mode}
                                            onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                                        >
                                            <option value="Remote">Remote</option>
                                            <option value="Hybrid">Hybrid</option>
                                            <option value="Onsite">Onsite</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Internship Type</label>
                                        <select
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        >
                                            <option value="Free">Free</option>
                                            <option value="Paid">Paid</option>
                                        </select>
                                    </div>
                                </div>

                                {formData.type === 'Paid' && (
                                    <Input
                                        label="Amount (₹)"
                                        type="number"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        required
                                        icon={DollarSign}
                                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        onWheel={(e) => e.target.blur()}
                                    />
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Technologies (comma separated)
                                    </label>
                                    <textarea
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                        rows={2}
                                        value={formData.technologies}
                                        onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                        placeholder="React, Node.js, MongoDB"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Full Description / Requirements
                                    </label>
                                    <textarea
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                        rows={3}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Full details and requirements..."
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                    <Button type="submit">Save</Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
