'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import DataTable from '@/components/admin/ui/DataTable';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Plus, Edit2, Trash2, Eye, GripVertical, Check, X, Globe, Smartphone, Megaphone, PenTool, Cloud, Code, Database, Server, Layers, Rocket, PlusCircle, MinusCircle } from 'lucide-react';
import { fetchAdminServices, createService, updateService, deleteService, reorderServices } from '@/lib/adminApi';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const iconMap = {
    Globe, Smartphone, Megaphone, PenTool, Cloud, Code, Database, Server, Layers, Rocket
};

const ListInput = ({ label, items, onChange }) => {
    const addItem = () => onChange([...items, ""]);
    const removeItem = (index) => onChange(items.filter((_, i) => i !== index));
    const updateItem = (index, value) => {
        const newItems = [...items];
        newItems[index] = value;
        onChange(newItems);
    };

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                <button type="button" onClick={addItem} className="text-primary-600 hover:text-primary-700 flex items-center text-xs font-semibold">
                    <PlusCircle size={14} className="mr-1" /> Add
                </button>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto p-1">
                {items.map((item, index) => (
                    <div key={index} className="flex gap-2">
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => updateItem(index, e.target.value)}
                            className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                            placeholder={`Enter ${label.toLowerCase()}`}
                        />
                        <button type="button" onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700">
                            <MinusCircle size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function ServicesManagement() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        detailedDescription: '',
        icon: 'Layers',
        coverImage: 'default-service.jpg',
        gradientTheme: 'from-blue-600 to-cyan-500',
        features: [],
        technologies: [],
        processSteps: [],
        isActive: true
    });

    const loadServices = async () => {
        try {
            const data = await fetchAdminServices();
            setServices(data || []);
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

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const items = Array.from(services);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setServices(items);
        try {
            await reorderServices(items);
            toast.success('Order updated successfully');
        } catch (error) {
            toast.error('Failed to save new order');
            loadServices();
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData };
            if (editingService) {
                await updateService(editingService.id || editingService._id, payload);
                toast.success('Service updated');
            } else {
                await createService(payload);
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
            setFormData({
                title: service.title || '',
                shortDescription: service.shortDescription || '',
                detailedDescription: service.detailedDescription || '',
                icon: service.icon || 'Layers',
                coverImage: service.coverImage || 'default-service.jpg',
                gradientTheme: service.gradientTheme || 'from-blue-600 to-cyan-500',
                features: service.features || [],
                technologies: service.technologies || [],
                processSteps: service.processSteps || [],
                isActive: service.isActive !== undefined ? service.isActive : true
            });
        } else {
            setEditingService(null);
            setFormData({
                title: '',
                shortDescription: '',
                detailedDescription: '',
                icon: 'Layers',
                coverImage: 'default-service.jpg',
                gradientTheme: 'from-blue-600 to-cyan-500',
                features: [],
                technologies: [],
                processSteps: [],
                isActive: true
            });
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

    return (
        <div className="max-w-[1600px] mx-auto">
            <Toaster position="top-right" />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Services Management</h1>
                    <p className="text-gray-500 text-sm">Create premium dynamic services for your homepage.</p>
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
                    <div className="col-span-4">Short Description</div>
                    <div className="col-span-2 text-center">Status</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>

                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="services-list">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="divide-y divide-gray-100 dark:divide-gray-800">
                                {services.map((service, index) => (
                                    <Draggable key={service.id || service._id} draggableId={service.id || service._id} index={index}>
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
                                                <div className="col-span-4 text-gray-600 dark:text-gray-400 line-clamp-1">{service.shortDescription}</div>
                                                <div className="col-span-2 text-center">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${service.isActive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                                        }`}>
                                                        {service.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                                <div className="col-span-1 text-right flex justify-end gap-2">
                                                    <button onClick={() => openModal(service)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-blue-500 transition-colors"><Edit2 size={16} /></button>
                                                    <button onClick={() => handleDelete(service.id || service._id)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-red-500 transition-colors"><Trash2 size={16} /></button>
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
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden max-h-[90vh] flex flex-col"
                        >
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                                <h3 className="text-lg font-bold">{editingService ? 'Edit Service' : 'Add New Service'}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Service Title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                            <select
                                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                                                value={formData.isActive ? "Active" : "Inactive"}
                                                onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "Active" })}
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
                                </div>

                                <Input
                                    label="Short Description"
                                    value={formData.shortDescription}
                                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                                    required
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Gradient Theme (Tailwind classes)"
                                        value={formData.gradientTheme}
                                        placeholder="from-blue-600 to-cyan-500"
                                        onChange={(e) => setFormData({ ...formData, gradientTheme: e.target.value })}
                                        required
                                    />
                                    <Input
                                        label="Cover Image Filename"
                                        value={formData.coverImage}
                                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Detailed Description</label>
                                    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                                        <ReactQuill
                                            theme="snow"
                                            value={formData.detailedDescription}
                                            onChange={(val) => setFormData({ ...formData, detailedDescription: val })}
                                            className="h-48 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6 pt-12">
                                    <ListInput
                                        label="Features"
                                        items={formData.features}
                                        onChange={(val) => setFormData({ ...formData, features: val })}
                                    />
                                    <ListInput
                                        label="Technologies"
                                        items={formData.technologies}
                                        onChange={(val) => setFormData({ ...formData, technologies: val })}
                                    />
                                    <ListInput
                                        label="Process Steps"
                                        items={formData.processSteps}
                                        onChange={(val) => setFormData({ ...formData, processSteps: val })}
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-6 pb-2">
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
