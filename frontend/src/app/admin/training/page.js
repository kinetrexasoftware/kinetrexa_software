'use client';
import { useState, useEffect } from 'react';
import DataTable from '@/components/admin/ui/DataTable';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Plus, Edit2, Trash2, Users, X, BookOpen, Clock, DollarSign, Monitor } from 'lucide-react';
import { fetchAdminTraining, fetchAdminTrainingStudents, createTraining, updateTraining, deleteTraining } from '@/lib/adminApi';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

export default function TrainingManagement() {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    const [editingProgram, setEditingProgram] = useState(null);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [formData, setFormData] = useState({ name: '', duration: '', mode: 'Online', price: '', status: 'Open' });

    const loadPrograms = async () => {
        try {
            const data = await fetchAdminTraining();
            setPrograms(data);
        } catch (error) {
            console.error("Failed to load training programs", error);
            toast.error("Failed to load programs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPrograms();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingProgram) {
                await updateTraining(editingProgram.id || editingProgram._id, formData);
                toast.success('Program updated');
            } else {
                await createTraining(formData);
                toast.success('Program created');
            }
            setIsModalOpen(false);
            loadPrograms();
        } catch (error) {
            console.error(error);
            toast.error('Operation failed');
        }
    };

    const openModal = (program = null) => {
        if (program) {
            setEditingProgram(program);
            setFormData(program);
        } else {
            setEditingProgram(null);
            setFormData({ name: '', duration: '', mode: 'Online', price: '', status: 'Open' });
        }
        setIsModalOpen(true);
    };

    const viewStudents = async (program) => {
        try {
            const students = await fetchAdminTrainingStudents(program.id || program._id);
            setSelectedStudents(students || []);
            setIsStudentModalOpen(true);
        } catch (error) {
            toast.error('Failed to load students');
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this program?')) {
            try {
                await deleteTraining(id);
                toast.success('Program deleted');
                loadPrograms();
            } catch (error) {
                toast.error('Failed to delete program');
            }
        }
    };

    const columns = [
        { header: 'Program Name', accessor: 'name' },
        {
            header: 'Duration',
            render: (row) => <div className="flex items-center gap-1"><Clock size={14} className="text-gray-400" />{row.duration}</div>
        },
        {
            header: 'Mode',
            render: (row) => <div className="flex items-center gap-1"><Monitor size={14} className="text-gray-400" />{row.mode}</div>
        },
        { header: 'Price', accessor: 'price' },
        {
            header: 'Enrollments',
            render: (row) => (
                <div className="flex items-center gap-1 font-medium text-gray-700 dark:text-gray-300">
                    <Users size={14} className="text-primary-500" />
                    {row.students}
                </div>
            )
        },
        {
            header: 'Status',
            render: (row) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === 'Open' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    row.status === 'Closing Soon' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
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
                        onClick={() => viewStudents(row)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-purple-500 transition-colors"
                        title="View Students"
                    >
                        <Users size={16} />
                    </button>
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
                title="Training Programs"
                subtitle="Manage your courses, batches, and student enrollments."
                columns={columns}
                data={programs}
                actions={
                    <Button onClick={() => openModal()}>
                        <Plus size={16} className="mr-2" />
                        Add Program
                    </Button>
                }
            />

            {/* Add/Edit Modal */}
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
                                <h3 className="text-lg font-bold">{editingProgram ? 'Edit Program' : 'Create New Batch'}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="p-6 space-y-4">
                                <Input
                                    label="Program Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    icon={BookOpen}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Duration"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        required
                                        placeholder="e.g. 3 Months"
                                    />
                                    <Input
                                        label="Price"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        required
                                        icon={DollarSign}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                    <textarea
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                        rows={3}
                                        value={formData.description || ''}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                        placeholder="Brief description of what students will learn..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mode</label>
                                        <select
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                            value={formData.mode}
                                            onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                                        >
                                            <option value="Online">Online</option>
                                            <option value="Offline">Offline</option>
                                            <option value="Hybrid">Hybrid</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                        <select
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        >
                                            <option value="Open">Open</option>
                                            <option value="Closing Soon">Closing Soon</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                    <Button type="submit">Save Program</Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Students List Modal */}
            <AnimatePresence>
                {isStudentModalOpen && (
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
                                <h3 className="text-lg font-bold">Enrolled Students</h3>
                                <button onClick={() => setIsStudentModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6">
                                {selectedStudents.length > 0 ? (
                                    <table className="w-full text-left text-sm">
                                        <thead className="border-b border-gray-200 dark:border-gray-800">
                                            <tr>
                                                <th className="pb-3 font-semibold text-gray-900 dark:text-white">Name</th>
                                                <th className="pb-3 font-semibold text-gray-900 dark:text-white">Email</th>
                                                <th className="pb-3 font-semibold text-gray-900 dark:text-white">Enrolled On</th>
                                                <th className="pb-3 font-semibold text-gray-900 dark:text-white">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                            {selectedStudents.map(student => (
                                                <tr key={student.id}>
                                                    <td className="py-3 text-gray-900 dark:text-white font-medium">{student.name}</td>
                                                    <td className="py-3 text-gray-500 dark:text-gray-400">{student.email}</td>
                                                    <td className="py-3 text-gray-500 dark:text-gray-400">{student.enrolledDate}</td>
                                                    <td className="py-3">
                                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                            }`}>
                                                            {student.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="text-center py-10 text-gray-500">
                                        <Users size={48} className="mx-auto mb-2 opacity-20" />
                                        <p>No students enrolled yet.</p>
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
