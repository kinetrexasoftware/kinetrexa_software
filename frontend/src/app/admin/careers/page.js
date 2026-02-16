'use client';
import { useState, useEffect } from 'react';
import DataTable from '@/components/admin/ui/DataTable';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Plus, Edit2, Trash2, Users, MapPin, Briefcase, X, FileText } from 'lucide-react';
import { fetchAdminCareers, fetchJobApplications } from '@/lib/adminApi';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

export default function CareersManagement() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [formData, setFormData] = useState({ role: '', type: 'Full-time', location: '', status: 'Active' });

    useEffect(() => {
        const loadCareers = async () => {
            try {
                const data = await fetchAdminCareers();
                setJobs(data);
            } catch (error) {
                console.error("Failed to load careers", error);
            } finally {
                setLoading(false);
            }
        };
        loadCareers();
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        if (editingJob) {
            setJobs(jobs.map(j => j.id === editingJob.id ? { ...formData, id: j.id, applicants: j.applicants } : j));
            toast.success('Job updated');
        } else {
            setJobs([...jobs, { ...formData, id: Date.now().toString(), applicants: 0 }]);
            toast.success('Job posted');
        }
        setIsModalOpen(false);
    };

    const openModal = (job = null) => {
        if (job) {
            setEditingJob(job);
            setFormData(job);
        } else {
            setEditingJob(null);
            setFormData({ role: '', type: 'Full-time', location: '', status: 'Active' });
        }
        setIsModalOpen(true);
    };

    const viewApplicants = async (job) => {
        const apps = await fetchJobApplications(job.id);
        setApplicants(apps);
        setIsApplicantsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this job posting?')) {
            setJobs(jobs.filter(j => j.id !== id));
            toast.success('Job deleted');
        }
    };

    const columns = [
        { header: 'Role', accessor: 'role' },
        {
            header: 'Type',
            render: (row) => <div className="flex items-center gap-1"><Briefcase size={14} className="text-gray-400" />{row.type}</div>
        },
        {
            header: 'Location',
            render: (row) => <div className="flex items-center gap-1"><MapPin size={14} className="text-gray-400" />{row.location}</div>
        },
        {
            header: 'Applicants',
            render: (row) => (
                <div className="flex items-center gap-1 font-medium text-gray-700 dark:text-gray-300">
                    <Users size={14} className="text-primary-500" />
                    {row.applicants}
                </div>
            )
        },
        {
            header: 'Status',
            render: (row) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                    {row.status}
                </span>
            )
        },
        {
            header: 'Actions',
            render: (row) => (
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={() => viewApplicants(row)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-purple-500 transition-colors"
                        title="View Applicants"
                    >
                        <Users size={16} />
                    </button>
                    <button onClick={() => openModal(row)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-blue-500 transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(row.id)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-red-500 transition-colors"><Trash2 size={16} /></button>
                </div>
            )
        },
    ];

    return (
        <div>
            <Toaster position="top-right" />
            <DataTable
                title="Careers & Openings"
                subtitle="Manage current job openings and applications."
                columns={columns}
                data={jobs}
                actions={
                    <Button onClick={() => openModal()}>
                        <Plus size={16} className="mr-2" />
                        Post Job
                    </Button>
                }
            />

            {/* Post Job Modal */}
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
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
                        >
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                                <h3 className="text-lg font-bold">{editingJob ? 'Edit Job Opening' : 'Post New Job'}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="p-6 space-y-4">
                                <Input
                                    label="Role Title"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    required
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Location"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        required
                                        placeholder="e.g. Remote, New York"
                                    />
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Employment Type</label>
                                        <select
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        >
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Internship">Internship</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                    <select
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Closed">Closed</option>
                                    </select>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                    <Button type="submit">Publish Job</Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Applicants Modal */}
            <AnimatePresence>
                {isApplicantsModalOpen && (
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
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden h-[500px] flex flex-col"
                        >
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                                <h3 className="text-lg font-bold">Manage Applicants</h3>
                                <button onClick={() => setIsApplicantsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6">
                                {applicants.length > 0 ? (
                                    <table className="w-full text-left text-sm">
                                        <thead className="border-b border-gray-200 dark:border-gray-800">
                                            <tr>
                                                <th className="pb-3 font-semibold text-gray-900 dark:text-white">Name</th>
                                                <th className="pb-3 font-semibold text-gray-900 dark:text-white">Applied Date</th>
                                                <th className="pb-3 font-semibold text-gray-900 dark:text-white">Status</th>
                                                <th className="pb-3 font-semibold text-gray-900 dark:text-white">Resume</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                            {applicants.map(app => (
                                                <tr key={app.id}>
                                                    <td className="py-3">
                                                        <p className="font-medium text-gray-900 dark:text-white">{app.name}</p>
                                                        <p className="text-xs text-gray-500">{app.email}</p>
                                                    </td>
                                                    <td className="py-3 text-gray-500 dark:text-gray-400">{app.date}</td>
                                                    <td className="py-3">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${app.status === 'Applied' ? 'bg-blue-100 text-blue-700' :
                                                                app.status === 'Interviewing' ? 'bg-orange-100 text-orange-700' :
                                                                    'bg-red-100 text-red-700'
                                                            }`}>
                                                            {app.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-3">
                                                        <button className="flex items-center text-primary-600 hover:text-primary-700 text-xs font-medium">
                                                            <FileText size={14} className="mr-1" />
                                                            View Resume
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="text-center py-10 text-gray-500">
                                        <Users size={48} className="mx-auto mb-2 opacity-20" />
                                        <p>No job applications received yet.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
