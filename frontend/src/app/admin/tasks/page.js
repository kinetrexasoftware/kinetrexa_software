'use client';
import { useState, useEffect } from 'react';
import DataTable from '@/components/admin/ui/DataTable';
import Button from '@/components/ui/Button';
import {
    Plus,
    Pencil,
    Trash,
    AlertTriangle,
    X,
    FileText,
    Layers,
    CheckCircle,
    XCircle,
    Download
} from 'lucide-react';
import {
    fetchAdminTasks,
    createAdminTask,
    updateAdminTask,
    deleteAdminTask,
    toggleTaskStatus,
    fetchAdminInternships
} from '@/lib/adminApi';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

// Domains are fetched dynamically from active internships

export default function TasksManagement() {
    const [tasks, setTasks] = useState([]);
    const [internships, setInternships] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modals
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        internshipId: '',
        domain: '',
        startDate: '',
        endDate: '',
        duration: '',
        tasks: [{ title: '', description: '', requiresGithubLink: true, requiresLiveLink: true, requiresLinkedinLink: true }],
        isActive: true
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loadData = async () => {
        setLoading(true);
        try {
            const [tasksData, internshipsData] = await Promise.all([
                fetchAdminTasks(),
                fetchAdminInternships()
            ]);
            setTasks(tasksData);
            setFilteredTasks(tasksData);
            setInternships(internshipsData.filter(i => i.isActive));
        } catch (error) {
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            setFilteredTasks(tasks.filter(t =>
                t.domain.toLowerCase().includes(lowerSearch)
            ));
        } else {
            setFilteredTasks(tasks);
        }
    }, [searchTerm, tasks]);

    const handleOpenForm = (task = null) => {
        if (task) {
            setSelectedTask(task);
            setFormData({
                internshipId: task.internshipId?.id || task.internshipId || '',
                domain: task.domain,
                startDate: task.startDate ? new Date(task.startDate).toISOString().split('T')[0] : '',
                endDate: task.endDate ? new Date(task.endDate).toISOString().split('T')[0] : '',
                duration: task.duration,
                tasks: task.tasks && task.tasks.length > 0
                    ? task.tasks.map(t => ({
                        title: t.title,
                        description: t.description,
                        requiresGithubLink: t.requiresGithubLink !== undefined ? t.requiresGithubLink : true,
                        requiresLiveLink: t.requiresLiveLink !== undefined ? t.requiresLiveLink : true,
                        requiresLinkedinLink: t.requiresLinkedinLink !== undefined ? t.requiresLinkedinLink : true
                    }))
                    : [{ title: '', description: '', requiresGithubLink: true, requiresLiveLink: true, requiresLinkedinLink: true }],
                isActive: task.isActive
            });
        } else {
            setSelectedTask(null);
            setFormData({
                internshipId: '',
                domain: '',
                startDate: '',
                endDate: '',
                duration: '',
                tasks: [{ title: '', description: '', requiresGithubLink: true, requiresLiveLink: true, requiresLinkedinLink: true }],
                isActive: true
            });
        }
        setIsFormModalOpen(true);
    };

    const handleToggleStatus = async (id) => {
        try {
            await toggleTaskStatus(id);
            toast.success("Status updated");
            loadData();
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleInternshipChange = (id) => {
        const internship = internships.find(i => i.id === id);
        if (internship) {
            // Calculate end date based on duration if not present
            // Duration is usually "X months"
            let endDate = '';
            if (internship.startDate) {
                const months = parseInt(internship.duration) || 1;
                const start = new Date(internship.startDate);
                const end = new Date(start);
                end.setMonth(start.getMonth() + months);
                endDate = end.toISOString().split('T')[0];
            }

            setFormData({
                ...formData,
                internshipId: id,
                domain: internship.title,
                duration: internship.duration,
                startDate: internship.startDate ? new Date(internship.startDate).toISOString().split('T')[0] : '',
                endDate: endDate
            });
        } else {
            setFormData({
                ...formData,
                internshipId: '',
                domain: '',
                duration: '',
                startDate: '',
                endDate: ''
            });
        }
    };

    const addTaskField = () => {
        setFormData({
            ...formData,
            tasks: [...formData.tasks, { title: '', description: '', requiresGithubLink: true, requiresLiveLink: true, requiresLinkedinLink: true }]
        });
    };

    const removeTaskField = (index) => {
        setFormData({
            ...formData,
            tasks: formData.tasks.filter((_, i) => i !== index)
        });
    };

    const updateTaskField = (index, field, value) => {
        const newTasks = [...formData.tasks];
        newTasks[index][field] = value;
        setFormData({ ...formData, tasks: newTasks });
    };

    const handleDelete = async () => {
        try {
            await deleteAdminTask(selectedTask.id);
            toast.success("Task set deleted successfully");
            setIsDeleteModalOpen(false);
            loadData();
        } catch (error) {
            toast.error("Failed to delete task set");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.internshipId || formData.tasks.some(t => !t.title || !t.description)) {
            return toast.error("Please fill all required fields and task details");
        }

        setIsSubmitting(true);
        try {
            if (selectedTask) {
                await updateAdminTask(selectedTask.id, formData);
                toast.success("Domain tasks updated successfully");
            } else {
                await createAdminTask(formData);
                toast.success("Domain tasks created successfully");
            }
            setIsFormModalOpen(false);
            loadData();
        } catch (error) {
            toast.error(error.message || "Failed to save tasks");
        } finally {
            setIsSubmitting(false);
        }
    };

    const columns = [
        {
            header: 'Domain',
            render: (row) => (
                <div className="flex items-center gap-2">
                    <Layers size={14} className="text-primary-500" />
                    <span className="font-medium text-gray-900 dark:text-gray-100">{row.domain}</span>
                </div>
            )
        },
        {
            header: 'Tasks',
            render: (row) => (
                <span className="text-sm font-medium p-1 bg-blue-50 text-blue-700 rounded-md">
                    {row.tasks?.length || 0} Tasks
                </span>
            )
        },
        {
            header: 'Status',
            render: (row) => (
                <button
                    onClick={() => handleToggleStatus(row.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${row.isActive
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                >
                    {row.isActive ? <CheckCircle size={12} /> : <XCircle size={12} />}
                    {row.isActive ? 'Active' : 'Inactive'}
                </button>
            )
        },
        {
            header: 'Actions',
            render: (row) => (
                <div className="flex gap-1">
                    <button
                        onClick={() => handleOpenForm(row)}
                        className="p-1.5 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Edit Task"
                    >
                        <Pencil size={16} />
                    </button>
                    <button
                        onClick={() => { setSelectedTask(row); setIsDeleteModalOpen(true); }}
                        className="p-1.5 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Task"
                    >
                        <Trash size={16} />
                    </button>
                </div>
            )
        },
    ];

    return (
        <div>
            <Toaster position="top-right" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Task Assignments</h1>
                    <p className="text-gray-500 text-sm">Manage domain-specific tasks for selected candidates.</p>
                </div>
                <Button onClick={() => handleOpenForm()}>
                    <Plus size={18} className="mr-2" />
                    Add New Task
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={filteredTasks}
                loading={loading}
                onSearch={setSearchTerm}
            />

            {/* Create/Edit Modal */}
            <AnimatePresence>
                {isFormModalOpen && (
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
                                <h3 className="text-lg font-bold">{selectedTask ? 'Edit Task' : 'Add New Task'}</h3>
                                <button onClick={() => setIsFormModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Internship Program</label>
                                        <select
                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                            value={formData.internshipId}
                                            onChange={(e) => handleInternshipChange(e.target.value)}
                                            required
                                            disabled={!!selectedTask}
                                        >
                                            <option value="">Choose Internship...</option>
                                            {internships.map(i => (
                                                <option key={i.id} value={i.id}>{i.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Duration</label>
                                        <input
                                            type="text"
                                            readOnly
                                            className="w-full rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-500"
                                            value={formData.duration}
                                            placeholder="Auto-populated"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
                                        <input
                                            type="date"
                                            readOnly
                                            className="w-full rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-500"
                                            value={formData.startDate}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tentative End Date</label>
                                        <input
                                            type="date"
                                            readOnly
                                            className="w-full rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-500"
                                            value={formData.endDate}
                                        />
                                    </div>
                                </div>

                                <hr className="border-gray-200 dark:border-gray-800 my-2" />

                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400">Tasks List</h4>
                                </div>

                                <div className="space-y-4">
                                    {formData.tasks.map((task, index) => (
                                        <div key={index} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 space-y-3 bg-gray-50/50 dark:bg-white/5 relative group">
                                            {formData.tasks.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeTaskField(index)}
                                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-600 transition-colors"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-gray-500 uppercase">Task {index + 1} Title</label>
                                                <input
                                                    type="text"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                                    placeholder="e.g. Project Setup & Setup"
                                                    value={task.title}
                                                    onChange={(e) => updateTaskField(index, 'title', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                                                <textarea
                                                    className="w-full h-20 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 resize-none"
                                                    placeholder="What needs to be done..."
                                                    value={task.description}
                                                    onChange={(e) => updateTaskField(index, 'description', e.target.value)}
                                                    required
                                                ></textarea>
                                            </div>

                                            <div className="space-y-3 pt-2">
                                                <h5 className="font-bold text-sm text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-1">Project Submission Requirements</h5>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 italic space-y-1 pb-2">
                                                    <p>“All assigned tasks must be completed with professional quality, proper structure, and clear documentation. Each task requires a GitHub repository, live project link, and a LinkedIn post for verification.”</p>
                                                </div>

                                                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-100 dark:border-blue-800">
                                                    <p className="text-xs text-blue-700 dark:text-blue-300 font-medium text-center">
                                                        Submission Deadline: Auto-calculated based on internship duration
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <Button type="button" variant="outline" onClick={addTaskField} className="w-full border-dashed border-2 py-4 text-gray-500 hover:text-primary-600 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10 rounded-xl">
                                        <Plus size={18} className="mr-2" />
                                        + Add Another Task
                                    </Button>
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                    />
                                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700 dark:text-gray-300">Mark as Active</label>
                                </div>

                                <div className="flex justify-end gap-3 pt-6">
                                    <Button type="button" variant="outline" onClick={() => setIsFormModalOpen(false)}>Cancel</Button>
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Saving...' : (selectedTask ? 'Update Tasks' : 'Assign Tasks')}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && selectedTask && (
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
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden"
                        >
                            <div className="p-6 text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                                    <AlertTriangle size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Delete Task?</h3>
                                <p className="text-gray-500 text-sm mb-6">
                                    Are you sure you want to delete the task for <span className="font-semibold text-gray-900">{selectedTask.domain}</span>? This action cannot be undone.
                                </p>
                                <div className="flex gap-3 justify-center">
                                    <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                                    <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">Delete</Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
