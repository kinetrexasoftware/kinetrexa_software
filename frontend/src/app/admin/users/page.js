'use client';
import { useState, useEffect } from 'react';
import DataTable from '@/components/admin/ui/DataTable';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Plus, Edit2, Trash2, User, Shield, CheckCircle, XCircle, Lock, Mail, Users, X } from 'lucide-react';
import { fetchAdminUsers } from '@/lib/adminApi';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

export default function UsersManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'Admin', status: 'Active', permissions: [] });

    const allPermissions = [
        { id: 'services', label: 'Manage Services' },
        { id: 'training', label: 'Manage Training' },
        { id: 'internships', label: 'Manage Internships' },
        { id: 'content', label: 'Edit Content' },
        { id: 'users', label: 'Manage Users' },
    ];

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchAdminUsers();
                setUsers(data);
            } catch (error) {
                console.error("Failed to load users", error);
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    const handleSave = (e) => {
        e.preventDefault();

        // Auto-assign permission 'all' if Super Admin
        const finalPermissions = formData.role === 'Super Admin' ? ['all'] : formData.permissions;

        if (editingUser) {
            setUsers(users.map(u => u.id === editingUser.id ? { ...formData, id: u.id, permissions: finalPermissions, lastActive: u.lastActive } : u));
            toast.success('User updated');
        } else {
            setUsers([...users, { ...formData, id: Date.now().toString(), permissions: finalPermissions, lastActive: 'Never' }]);
            toast.success('User created');
        }
        setIsModalOpen(false);
    };

    const openModal = (user = null) => {
        if (user) {
            setEditingUser(user);
            setFormData(user);
        } else {
            setEditingUser(null);
            setFormData({ name: '', email: '', role: 'Admin', status: 'Active', permissions: [] });
        }
        setIsModalOpen(true);
    };

    const togglePermission = (permId) => {
        if (formData.permissions.includes(permId)) {
            setFormData({ ...formData, permissions: formData.permissions.filter(p => p !== permId) });
        } else {
            setFormData({ ...formData, permissions: [...formData.permissions, permId] });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(u => u.id !== id));
            toast.success('User deleted');
        }
    };

    const columns = [
        {
            header: 'User',
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-xs">
                        {row.name.charAt(0)}
                    </div>
                    <div>
                        <div className="font-medium text-gray-900 dark:text-white">{row.name}</div>
                        <div className="text-xs text-gray-500">{row.email}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Role',
            render: (row) => (
                <div className="flex items-center gap-1">
                    {row.role === 'Super Admin' ? <Shield size={14} className="text-yellow-500" /> : <User size={14} className="text-gray-400" />}
                    {row.role}
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
        { header: 'Last Active', accessor: 'lastActive' },
        {
            header: 'Actions',
            render: (row) => (
                <div className="flex gap-2 justify-end">
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
                title="Admin Users"
                subtitle="Manage team access and permissions."
                columns={columns}
                data={users}
                actions={
                    <Button onClick={() => openModal()}>
                        <Plus size={16} className="mr-2" />
                        Add User
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
                                <h3 className="text-lg font-bold">{editingUser ? 'Edit User' : 'Create New User'}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="p-6 space-y-4">
                                <Input
                                    label="Full Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    icon={User}
                                />
                                <Input
                                    label="Email Address"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    icon={Mail}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                                        <select
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        >
                                            <option value="Admin">Admin</option>
                                            <option value="Super Admin">Super Admin</option>
                                            <option value="Editor">Editor</option>
                                            <option value="Viewer">Viewer</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                        <select
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Permissions Section - Hidden for Super Admin */}
                                {formData.role !== 'Super Admin' && (
                                    <div className="pt-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Module Access</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {allPermissions.map((perm) => (
                                                <div key={perm.id} className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        id={`perm-${perm.id}`}
                                                        checked={formData.permissions.includes(perm.id)}
                                                        onChange={() => togglePermission(perm.id)}
                                                        className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 cursor-pointer"
                                                    />
                                                    <label htmlFor={`perm-${perm.id}`} className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none">
                                                        {perm.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end gap-3 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                    <Button type="submit">Save User</Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
