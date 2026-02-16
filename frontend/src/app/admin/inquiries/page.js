'use client';
import { useState, useEffect } from 'react';
import DataTable from '@/components/admin/ui/DataTable';
import Button from '@/components/ui/Button';
import { Mail, Eye, Trash, AlertTriangle, X, Reply } from 'lucide-react';
import { fetchAdminInquiries, updateInquiryStatus, deleteInquiry, replyToInquiry } from '@/lib/adminApi';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

export default function InquiriesManagement() {
    const [inquiries, setInquiries] = useState([]);
    const [filteredInquiries, setFilteredInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [isSendingReply, setIsSendingReply] = useState(false);

    const loadData = async () => {
        try {
            const data = await fetchAdminInquiries();
            setInquiries(data);
            setFilteredInquiries(data);
        } catch (error) {
            console.error("Failed to load inquiries", error);
            toast.error("Failed to load inquiries");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        let result = inquiries;
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            result = result.filter(item =>
                item.name.toLowerCase().includes(lowerSearch) ||
                item.email.toLowerCase().includes(lowerSearch) ||
                item.subject.toLowerCase().includes(lowerSearch)
            );
        }
        setFilteredInquiries(result);
    }, [searchTerm, inquiries]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateInquiryStatus(id, newStatus.toLowerCase());
            toast.success(`Status updated to ${newStatus}`);
            loadData();
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async () => {
        if (!selectedInquiry) return;
        try {
            await deleteInquiry(selectedInquiry.id);
            setInquiries(inquiries.filter(item => item.id !== selectedInquiry.id));
            toast.success("Inquiry deleted successfully");
            setIsDeleteModalOpen(false);
            setSelectedInquiry(null);
        } catch (error) {
            toast.error("Failed to delete inquiry");
        }
    };

    const handleReply = async () => {
        if (!replyText.trim()) return;
        setIsSendingReply(true);
        try {
            await replyToInquiry(selectedInquiry.id, replyText);
            toast.success("Reply sent successfully");
            setIsReplyModalOpen(false);
            setReplyText('');
            loadData();
        } catch (error) {
            toast.error("Failed to send reply");
        } finally {
            setIsSendingReply(false);
        }
    };

    const columns = [
        {
            header: 'Name',
            accessor: 'name',
            className: 'min-w-[150px]'
        },
        {
            header: 'Email',
            accessor: 'email',
            className: 'min-w-[180px]'
        },
        {
            header: 'Subject',
            accessor: 'subject',
            truncate: true,
            className: 'max-w-[200px]'
        },
        { header: 'Date', accessor: 'date' },
        {
            header: 'Status',
            render: (row) => (
                <select
                    value={row.status}
                    onChange={(e) => handleStatusChange(row.id, e.target.value)}
                    className={`px-2 py-1 rounded-full text-xs font-medium border-none focus:ring-1 focus:ring-primary-500 cursor-pointer ${row.status === 'New' ? 'bg-blue-100 text-blue-700' :
                            row.status === 'Received' ? 'bg-indigo-100 text-indigo-700' :
                                row.status === 'Replied' ? 'bg-green-100 text-green-700' :
                                    row.status === 'Read' ? 'bg-emerald-100 text-emerald-700' :
                                        'bg-gray-100 text-gray-700'
                        }`}
                >
                    <option value="Received">Received</option>
                    <option value="Replied">Replied</option>
                    <option value="Read">Read</option>
                    <option value="Archived">Archived</option>
                </select>
            )
        },
        {
            header: 'Actions',
            render: (row) => (
                <div className="flex gap-1">
                    <button
                        onClick={() => { setSelectedInquiry(row); setIsViewModalOpen(true); }}
                        className="p-1.5 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="View Details"
                    >
                        <Eye size={16} />
                    </button>
                    <button
                        onClick={() => { setSelectedInquiry(row); setIsReplyModalOpen(true); }}
                        className="p-1.5 rounded text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                        title="Reply"
                    >
                        <Reply size={16} />
                    </button>
                    <button
                        onClick={() => { setSelectedInquiry(row); setIsDeleteModalOpen(true); }}
                        className="p-1.5 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Inquiry"
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
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Inquiries</h1>
                <p className="text-gray-500 text-sm">Manage contact form submissions and leads.</p>
            </div>

            <DataTable
                columns={columns}
                data={filteredInquiries}
                onSearch={setSearchTerm}
            />

            {/* View Modal */}
            <AnimatePresence>
                {isViewModalOpen && selectedInquiry && (
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
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                                <h3 className="text-xl font-bold">Inquiry Details</h3>
                                <button onClick={() => setIsViewModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">From</label>
                                    <p className="text-lg font-semibold">{selectedInquiry.name}</p>
                                    <p className="text-primary-600">{selectedInquiry.email}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</label>
                                    <p className="font-medium text-gray-900 dark:text-gray-100">{selectedInquiry.subject}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Message</label>
                                    <div className="mt-1 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                        {selectedInquiry.message}
                                    </div>
                                </div>
                                {selectedInquiry.replyMessage && (
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Your Reply</label>
                                        <div className="mt-1 p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                            {selectedInquiry.replyMessage}
                                        </div>
                                    </div>
                                )}
                                <div className="text-xs text-gray-400">
                                    Received on {selectedInquiry.date}
                                </div>
                            </div>
                            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end">
                                <Button onClick={() => setIsViewModalOpen(false)}>Close</Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Reply Modal */}
            <AnimatePresence>
                {isReplyModalOpen && selectedInquiry && (
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
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                                <h3 className="text-xl font-bold">Reply to Inquiry</h3>
                                <button onClick={() => setIsReplyModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <p className="text-xs text-gray-500 mb-1">Replying to: <strong>{selectedInquiry.name}</strong></p>
                                    <p className="text-sm font-medium">Sub: {selectedInquiry.subject}</p>
                                </div>

                                <textarea
                                    className="w-full h-40 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                                    placeholder="Type your response email here..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setIsReplyModalOpen(false)}>Cancel</Button>
                                <Button onClick={handleReply} disabled={isSendingReply || !replyText.trim()}>
                                    {isSendingReply ? 'Sending...' : 'Send Reply'}
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && selectedInquiry && (
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
                                <h3 className="text-xl font-bold mb-2">Delete Inquiry?</h3>
                                <p className="text-gray-500 text-sm mb-6">
                                    Are you sure you want to delete this inquiry from <span className="font-semibold text-gray-900">{selectedInquiry.name}</span>?
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
