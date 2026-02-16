'use client';
import { useState, useEffect } from 'react';
import DataTable from '@/components/admin/ui/DataTable';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Plus, Edit2, Trash2, Eye, GripVertical, Check, X, Globe, Smartphone, Megaphone, PenTool, Cloud, Code, Database, Server, Layers } from 'lucide-react';
import { fetchAdminServices, createService, updateService, deleteService } from '@/lib/adminApi';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const iconMap = {
    Globe, Smartphone, Megaphone, PenTool, Cloud, Code, Database, Server, Layers
};

export default function ServicesManagement() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({ title: '', category: '', price: '', status: 'Active', icon: 'Layers' });

    const loadServices = async () => {
        try {
            const data = await fetchAdminServices();
            setServices(data);
        } catch (error) {
            console.error("Failed to load services", error);
            toast.error("Failed to load services");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadServices();
    }, []);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(services);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setServices(items);
        // Optional: Save new order to backend
        toast.success('Order updated successfully');
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingService) {
                await updateService(editingService.id || editingService._id, formData);
                toast.success('Service updated');
            } else {
                await createService(formData);
                toast.success('Service added');
            }
            setIsModalOpen(false);
            loadServices();
        } catch (error) {
            console.error(error);
            toast.error('Operation failed');
        }
    };

    const openModal = (service = null) => {
        if (service) {
            setEditingService(service);
            setFormData(service);
        } else {
            setEditingService(null);
            setFormData({ title: '', category: '', price: '', status: 'Active', icon: 'Layers' });
        }
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this service?')) {
            try {
                await deleteService(id);
                toast.success('Service deleted');
                loadServices();
            } catch (error) {
                toast.error('Failed to delete service');
            }
        }
    };

    const columns = [
        {
            header: '',
            render: () => <GripVertical className="text-gray-400 cursor-grab active:cursor-grabbing" size={20} />
        },
        {
            header: 'Icon',
            render: (row) => {
                const IconComponent = iconMap[row.icon] || Layers;
                return <IconComponent className="text-primary-600" size={20} />;
            }
        },
        { header: 'Service Title', accessor: 'title' },
        { header: 'Category', accessor: 'category' },
        {
            header: 'Status',
            render: (row) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                    {row.status}
                </span>
            )
        },
        { header: 'Pricing', accessor: 'price' },
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

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Services Management</h1>
                    <p className="text-gray-500 text-sm">Drag and drop to reorder services on the website.</p>
                </div>
                <Button onClick={() => openModal()}>
                    <Plus size={16} className="mr-2" />
                    Add Service
                </Button>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 font-semibold text-sm text-gray-900 dark:text-white">
                    <div className="col-span-1"></div>
                    <div className="col-span-1">Icon</div>
                    <div className="col-span-3">Service Title</div>
                    <div className="col-span-2">Category</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Pricing</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>

                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="services-list">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="divide-y divide-gray-100 dark:divide-gray-800">
                                {services.map((service, index) => (
                                    <Draggable key={service.id} draggableId={service.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className={`grid grid-cols-12 gap-4 p-4 items-center text-sm hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${snapshot.isDragging ? 'bg-primary-50 dark:bg-primary-900/20 shadow-lg' : 'bg-white dark:bg-gray-900'
                                                    }`}
                                            >
                                                <div className="col-span-1" {...provided.dragHandleProps}>
                                                    <GripVertical className="text-gray-400 cursor-grab active:cursor-grabbing" size={20} />
                                                </div>
                                                <div className="col-span-1">
                                                    {(() => {
                                                        const Icon = iconMap[service.icon] || Layers;
                                                        return <Icon className="text-primary-600" size={20} />;
                                                    })()}
                                                </div>
                                                <div className="col-span-3 font-medium text-gray-900 dark:text-white">{service.title}</div>
                                                <div className="col-span-2 text-gray-600 dark:text-gray-400">{service.category}</div>
                                                <div className="col-span-2">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${service.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                                        }`}>
                                                        {service.status}
                                                    </span>
                                                </div>
                                                <div className="col-span-2 text-gray-600 dark:text-gray-400">{service.price}</div>
                                                <div className="col-span-1 text-right flex justify-end gap-2">
                                                    <button onClick={() => openModal(service)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-blue-500 transition-colors"><Edit2 size={16} /></button>
                                                    <button onClick={() => handleDelete(service.id)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-red-500 transition-colors"><Trash2 size={16} /></button>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>

            {/* Edit/Add Modal */}
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
                                <h3 className="text-lg font-bold">{editingService ? 'Edit Service' : 'Add New Service'}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="p-6 space-y-4">
                                <Input
                                    label="Service Title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Category"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        required
                                    />
                                    <Input
                                        label="Price Label"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
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
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icon</label>
                                        <select
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                            value={formData.icon}
                                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                        >
                                            {Object.keys(iconMap).map(icon => (
                                                <option key={icon} value={icon}>{icon}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                    <Button type="submit">Save Changes</Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
