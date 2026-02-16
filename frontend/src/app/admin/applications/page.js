'use client';
import { useState, useEffect } from 'react';
import DataTable from '@/components/admin/ui/DataTable';
import Button from '@/components/ui/Button';
import { Download, Filter, MessageSquare, Briefcase, GraduationCap, Mail, FileText, X, Check, Eye, Trash, AlertTriangle, Plus } from 'lucide-react';
import { fetchAdminApplications, updateApplicationStatus, addNoteToApplication, deleteApplication, createAdminApplication, fetchAdminInternships } from '@/lib/adminApi'; // Added createAdminApplication, fetchAdminInternships
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

export default function ApplicationsManagement() {
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [internships, setInternships] = useState([]); // Added for dropdown
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');

    // Modals
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // New
    const [selectedApp, setSelectedApp] = useState(null);
    const [noteText, setNoteText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const loadData = async () => {
        try {
            const [appsData, internshipsData] = await Promise.all([
                fetchAdminApplications(),
                fetchAdminInternships()
            ]);
            setApplications(appsData);
            setFilteredApplications(appsData);
            setInternships(internshipsData);
        } catch (error) {
            console.error("Failed to load data", error);
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        let result = applications;

        // Filter by Search Term (Name, Email, Domain, ID)
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            result = result.filter(app =>
                app.name.toLowerCase().includes(lowerSearch) ||
                app.email.toLowerCase().includes(lowerSearch) ||
                app.subject.toLowerCase().includes(lowerSearch) ||
                app.applicationId.toLowerCase().includes(lowerSearch)
            );
        }

        if (filterType !== 'All') {
            result = result.filter(app => app.type === filterType);
        }
        if (filterStatus !== 'All') {
            result = result.filter(app => app.status === filterStatus);
        }
        setFilteredApplications(result);
    }, [filterType, filterStatus, searchTerm, applications]);

    const handleExport = () => {
        const headers = ["Application ID", "Name", "Email", "Subject / Role", "Status", "Payment Status", "Created By", "Document Status"];
        const csvContent = [
            headers.join(","),
            ...filteredApplications.map(row => {
                // Document Status Logic for Export
                let docStatus = "User has NOT downloaded anything";
                if (row.offerLetterDownloaded && row.taskDownloaded && row.certificateDownloaded) {
                    docStatus = "User downloaded ALL documents (Certificate issued)";
                } else if (row.offerLetterDownloaded && row.taskDownloaded) {
                    docStatus = "User downloaded Offer Letter + Task (User has reached task stage)";
                } else if (row.offerLetterDownloaded) {
                    docStatus = "User downloaded ONLY Offer Letter";
                }

                return [
                    row.applicationId,
                    `"${row.name}"`,
                    row.email,
                    `"${row.subject}"`,
                    row.status,
                    `"${row.paymentStatus || 'Pending'}"`,
                    `"${row.createdBy || 'User'}"`,
                    `"${docStatus}"`
                ].join(",");
            })
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "applications_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Exported to CSV");
    };

    const openNoteModal = (app) => {
        setSelectedApp(app);
        setNoteText(app.notes || '');
        setIsNoteModalOpen(true);
    };

    const openViewModal = (app) => {
        setSelectedApp(app);
        setIsViewModalOpen(true);
    };

    const openDeleteModal = (app) => {
        setSelectedApp(app);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (!selectedApp) return;
        try {
            await deleteApplication(selectedApp.id);
            setApplications(applications.filter(app => app.id !== selectedApp.id)); // Optimistic update
            toast.success("Application deleted successfully");
            setIsDeleteModalOpen(false);
            setSelectedApp(null);
        } catch (error) {
            toast.error("Failed to delete application");
        }
    };

    const saveNote = async () => {
        try {
            await addNoteToApplication(selectedApp.id, noteText);
            toast.success("Note saved");
            setIsNoteModalOpen(false);
            loadData(); // Reload to get updated data
        } catch (error) {
            toast.error("Failed to save note");
        }
    };

    const handleCreateApplication = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Find internship title for domain if selected
        const selectedInternship = internships.find(i => i._id === data.internshipId);
        if (selectedInternship) {
            data.domain = selectedInternship.title;
        }

        try {
            await createAdminApplication(data);
            toast.success("Application created successfully");
            setIsCreateModalOpen(false);
            loadData();
        } catch (error) {
            toast.error(error.message || "Failed to create application");
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateApplicationStatus(id, newStatus.toLowerCase());
            toast.success(`Status updated to ${newStatus}`);
            loadData();
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const columns = [
        {
            header: 'Application ID',
            render: (row) => (
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded w-fit">
                        {row.applicationId}
                    </span>
                    {row.createdBy === 'admin' && (
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 w-fit">
                            Admin Added
                        </span>
                    )}
                </div>
            )
        },
        {
            header: 'Name',
            accessor: 'name',
            className: 'min-w-[150px]'
        },
        {
            header: 'Email',
            accessor: 'email',
            truncate: true,
            className: 'max-w-[180px]'
        },
        {
            header: 'Subject / Role',
            accessor: 'subject',
            truncate: true,
            className: 'max-w-[200px]'
        },
        {
            header: 'Payment',
            render: (row) => (
                <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${row.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' :
                        row.paymentStatus === 'ADMIN_EXEMPTED' ? 'bg-purple-100 text-purple-700' :
                            row.paymentStatus === 'Not Required' ? 'bg-gray-100 text-gray-700' :
                                'bg-yellow-100 text-yellow-700'
                    }`}>
                    {row.paymentStatus || 'Pending'}
                </span>
            )
        },
        {
            header: 'Document Status',
            render: (row) => {
                const docs = [];
                if (row.offerLetterDownloaded) docs.push({ name: 'Offer Letter', color: 'bg-blue-100 text-blue-700' });
                if (row.taskDownloaded) docs.push({ name: 'Task', color: 'bg-purple-100 text-purple-700' });
                if (row.certificateDownloaded) docs.push({ name: 'Certificate', color: 'bg-green-100 text-green-700' });

                if (docs.length === 0) {
                    return <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-500">Not Downloaded</span>;
                }

                return (
                    <div className="flex flex-wrap gap-1">
                        {docs.map((doc, i) => (
                            <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${doc.color}`}>
                                {doc.name}
                            </span>
                        ))}
                    </div>
                );
            }
        },
        {
            header: 'Status',
            render: (row) => (
                <select
                    value={row.status}
                    onChange={(e) => handleStatusChange(row.id, e.target.value)}
                    className={`px-2 py-1 rounded-full text-xs font-medium border-none focus:ring-1 focus:ring-primary-500 cursor-pointer ${row.status === 'Selected' ? 'bg-green-100 text-green-700' :
                        row.status === 'Shortlisted' ? 'bg-blue-100 text-blue-700' :
                            row.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                row.status === 'Completed' ? 'bg-gray-100 text-gray-700' :
                                    'bg-yellow-100 text-yellow-700'
                        }`}
                >
                    <option value="Applied">Applied</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Completed">Completed</option>
                </select>
            )
        },
        {
            header: 'Actions',
            render: (row) => (
                <div className="flex gap-1">
                    <button
                        onClick={() => openViewModal(row)}
                        className="p-1.5 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="View Details"
                    >
                        <Eye size={16} />
                    </button>
                    <button
                        onClick={() => openNoteModal(row)}
                        className={`p-1.5 rounded transition-colors ${row.notes ? 'text-primary-600 bg-primary-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                        title={row.notes ? "View Note" : "Add Note"}
                    >
                        <FileText size={16} />
                    </button>
                    <button
                        onClick={() => openDeleteModal(row)}
                        className="p-1.5 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Application"
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

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Unified Inbox</h1>
                    <p className="text-gray-500 text-sm">Manage all your leads, applications, and enrollments in one place.</p>
                </div>
                <div className="flex gap-2">
                    <select
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="All">All Types</option>
                        <option value="Internship">Internship</option>
                        <option value="Training">Training</option>
                        <option value="Contact">Contact Inquiry</option>
                    </select>

                    <select
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Applied">Applied</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Completed">Completed</option>
                    </select>

                    <Button variant="ghost" onClick={() => setIsCreateModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus size={16} className="mr-2" />
                        Add Application
                    </Button>

                    <Button variant="outline" onClick={handleExport}>
                        <Download size={16} className="mr-2" />
                        Export CSV
                    </Button>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={filteredApplications}
                onSearch={setSearchTerm} // Pass search handler
            />

            {/* View Details Modal */}
            <AnimatePresence>
                {isViewModalOpen && selectedApp && (
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
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-bold">{selectedApp.name}</h3>
                                    <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                                        ID: {selectedApp.applicationId}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${selectedApp.status === 'Selected' ? 'bg-green-100 text-green-700' :
                                        selectedApp.status === 'Shortlisted' ? 'bg-blue-100 text-blue-700' :
                                            selectedApp.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                selectedApp.status === 'Completed' ? 'bg-gray-100 text-gray-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {selectedApp.status}
                                    </span>
                                </div>
                                <button onClick={() => setIsViewModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Basic Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Applying For</h4>
                                        <p className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{selectedApp.subject}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Applied Date</h4>
                                        <p className="text-gray-900 dark:text-gray-100">{selectedApp.date}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Amount Paid</h4>
                                        <p className="font-medium text-green-600">₹{selectedApp.amount || 0}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Payment Status</h4>
                                        <p className="text-gray-900 dark:text-gray-100">{selectedApp.paymentStatus || 'Pending'}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Email</h4>
                                        <a href={`mailto:${selectedApp.email}`} className="text-primary-600 hover:underline">{selectedApp.email}</a>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Phone</h4>
                                        <a href={`tel:${selectedApp.phone}`} className="text-gray-900 dark:text-gray-100 hover:underline">{selectedApp.phone}</a>
                                    </div>

                                </div>

                                <div className="h-px bg-gray-200 dark:bg-gray-800"></div>

                                {/* Education & Qualification */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Qualification</h4>
                                        <p className="text-gray-900 dark:text-gray-100">{selectedApp.qualification || 'Not Provided'}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-1">College/Institute</h4>
                                        <p className="text-gray-900 dark:text-gray-100">{selectedApp.college || 'N/A'}</p>
                                    </div>
                                </div>

                                {/* Skills */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-2">Skills / Technologies</h4>
                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-800 dark:text-gray-200">
                                        {selectedApp.skills || 'No skills listed'}
                                    </div>
                                </div>

                                {/* Message */}
                                {selectedApp.message && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-2">Message / Motivation</h4>
                                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                                            {selectedApp.message}
                                        </div>
                                    </div>
                                )}

                                {/* Resume */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-2">Resume / CV</h4>
                                        {selectedApp.resumeUrl ? (
                                            <a
                                                href={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${selectedApp.resumeUrl}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
                                            >
                                                <FileText size={16} className="mr-2 text-primary-500" />
                                                View Resume
                                            </a>
                                        ) : (
                                            <span className="text-sm text-gray-400 italic">No resume attached</span>
                                        )}
                                    </div>

                                    {/* Document Status */}
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                                            <Briefcase size={16} className="text-primary-500" />
                                            Document Status
                                        </h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg border border-gray-100 dark:border-gray-800">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-semibold">Offer Letter</span>
                                                    <span className="text-[10px] text-gray-500">{selectedApp.offerLetterDownloadedAt ? new Date(selectedApp.offerLetterDownloadedAt).toLocaleString() : '-'}</span>
                                                </div>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${selectedApp.offerLetterDownloaded ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {selectedApp.offerLetterDownloaded ? '✅ Downloaded' : '❌ Not Downloaded'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg border border-gray-100 dark:border-gray-800">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-semibold">Task Assignment</span>
                                                    <span className="text-[10px] text-gray-500">{selectedApp.taskDownloadedAt ? new Date(selectedApp.taskDownloadedAt).toLocaleString() : '-'}</span>
                                                </div>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${selectedApp.taskDownloaded ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {selectedApp.taskDownloaded ? '✅ Downloaded' : '❌ Not Downloaded'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg border border-gray-100 dark:border-gray-800">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-semibold">Certificate</span>
                                                    <span className="text-[10px] text-gray-500">{selectedApp.certificateDownloadedAt ? new Date(selectedApp.certificateDownloadedAt).toLocaleString() : '-'}</span>
                                                </div>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${selectedApp.certificateDownloaded ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {selectedApp.certificateDownloaded ? '✅ Downloaded' : '❌ Not Downloaded'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end">
                                <Button onClick={() => setIsViewModalOpen(false)}>Close</Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Note Modal */}
            <AnimatePresence>
                {isNoteModalOpen && (
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
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
                        >
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                                <h3 className="text-lg font-bold">Admin Note</h3>
                                <button onClick={() => setIsNoteModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6">
                                <p className="text-sm text-gray-500 mb-2">
                                    Add internal notes for <span className="font-semibold">{selectedApp?.name}</span>.
                                </p>
                                <textarea
                                    className="w-full h-32 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 resize-none"
                                    placeholder="Enter note here..."
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                ></textarea>

                                <div className="flex justify-end gap-3 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setIsNoteModalOpen(false)}>Cancel</Button>
                                    <Button onClick={saveNote}>Save Note</Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Create Application Modal */}
            <AnimatePresence>
                {isCreateModalOpen && (
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
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                                <h3 className="text-lg font-bold">Add Application (Admin)</h3>
                                <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleCreateApplication} className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Full Name *</label>
                                        <input required name="fullName" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Email *</label>
                                        <input required name="email" type="email" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600" placeholder="john@example.com" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Phone</label>
                                        <input name="phone" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600" placeholder="+91..." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Internship / Domain *</label>
                                        <select name="internshipId" required className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600">
                                            <option value="">Select Internship</option>
                                            {internships.map(i => (
                                                <option key={i.id || i._id} value={i.id || i._id}>{i.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Qualification *</label>
                                        <select name="qualification" required className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600">
                                            <option value="Undergraduate">Undergraduate</option>
                                            <option value="Postgraduate">Postgraduate</option>
                                            <option value="Diploma">Diploma</option>
                                            <option value="10+2">10+2</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">College</label>
                                        <input name="college" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600" placeholder="Institute Name" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Skills</label>
                                    <textarea name="skills" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm h-20 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 resize-none" placeholder="Java, Python..." />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Initial Status</label>
                                        <select name="status" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600">
                                            <option value="applied">Applied</option>
                                            <option value="shortlisted">Shortlisted</option>
                                            <option value="selected">Selected</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Payment Status</label>
                                        <div className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2 text-sm text-gray-500 italic dark:bg-gray-800 dark:border-gray-700">
                                            ADMIN_EXEMPTED (No Payment Required)
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                                    <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                                    <Button type="submit">Create Application</Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && selectedApp && (
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
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-gray-100 dark:border-gray-800"
                        >
                            <div className="p-6 text-center">
                                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 dark:text-red-500">
                                    <AlertTriangle size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Delete Application?</h3>
                                <p className="text-gray-500 text-sm mb-6">
                                    Are you sure you want to delete the application for <span className="font-semibold text-gray-900 dark:text-white">{selectedApp.name}</span>? This action cannot be undone.
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
