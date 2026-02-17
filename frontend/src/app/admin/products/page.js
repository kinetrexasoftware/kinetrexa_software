'use client';
import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, GripVertical, CheckCircle2, Layout, Clock, Sparkles } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Button from '@/components/ui/Button';
import ProductModal from '@/components/admin/products/ProductModal';
import { fetchAdminProducts, createProduct, updateProduct, deleteProduct, reorderProducts } from '@/lib/adminApi';
import toast, { Toaster } from 'react-hot-toast';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All Categories');
    const [statusFilter, setStatusFilter] = useState('All Status');

    const loadProducts = async () => {
        setLoading(true);
        try {
            const data = await fetchAdminProducts();
            setProducts(data || []);
        } catch (error) {
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleSave = async (data) => {
        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id || editingProduct._id, data);
                toast.success('Product updated');
            } else {
                await createProduct(data);
                toast.success('Product created');
            }
            setIsModalOpen(false);
            loadProducts();
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Delete this product?')) {
            try {
                await deleteProduct(id);
                toast.success('Product deleted');
                loadProducts();
            } catch (error) {
                toast.error('Failed to delete');
            }
        }
    };

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const items = Array.from(products);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setProducts(items);
        try {
            await reorderProducts(items);
            toast.success('Order saved');
        } catch (error) {
            toast.error('Failed to save order');
            loadProducts();
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All Categories' || product.category === categoryFilter;
        const matchesStatus = statusFilter === 'All Status' || product.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    return (
        <div className="space-y-8">
            <Toaster position="top-right" />
            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSave}
                initialData={editingProduct}
            />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Layout className="text-primary-500" />
                        Products Architecture
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage core products and their homepage presence.</p>
                </div>
                <Button onClick={() => { setEditingProduct(null); setIsModalOpen(true); }} className="shadow-lg shadow-primary-500/20">
                    <Plus className="w-4 h-4 mr-2" />
                    New Product
                </Button>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-md p-4 rounded-2xl border border-gray-200 dark:border-white/10 flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-grow w-full md:w-auto">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 transition-all"
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="flex-1 md:w-40 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500"
                    >
                        <option>All Categories</option>
                        <option>PropTech Platform</option>
                        <option>Enterprise SaaS</option>
                        <option>Business Platform</option>
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="flex-1 md:w-40 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500"
                    >
                        <option>All Status</option>
                        <option>Live</option>
                        <option>Beta</option>
                        <option>Coming Soon</option>
                    </select>
                </div>
            </div>

            {/* Drag & Drop List */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="products-list">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                            {loading ? (
                                <div className="text-center py-20 bg-white dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 text-gray-500">
                                    Decoding product data...
                                </div>
                            ) : filteredProducts.length === 0 ? (
                                <div className="text-center py-20 bg-white dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 text-gray-500">
                                    No products found matching your search.
                                </div>
                            ) : (
                                filteredProducts.map((product, index) => (
                                    <Draggable key={product.id || product._id} draggableId={product.id || product._id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className={`group relative bg-white dark:bg-gray-900/50 backdrop-blur-sm p-5 rounded-2xl border ${snapshot.isDragging ? 'border-primary-500 shadow-2xl scale-[1.02]' : 'border-gray-200 dark:border-white/5'} transition-all duration-200 flex flex-col md:flex-row items-center gap-6`}
                                            >
                                                <div {...provided.dragHandleProps} className="text-gray-400 hover:text-primary-500 transition-colors cursor-grab active:cursor-grabbing">
                                                    <GripVertical size={20} />
                                                </div>

                                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.gradientTheme || 'from-gray-500 to-gray-600'} flex items-center justify-center text-white shadow-lg`}>
                                                    <Sparkles size={24} />
                                                </div>

                                                <div className="flex-grow text-center md:text-left">
                                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-1">
                                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{product.name}</h3>
                                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm
                                                            ${product.status === 'Live' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' :
                                                                product.status === 'Beta' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400' :
                                                                    'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'}`}>
                                                            {product.status}
                                                        </span>
                                                        {product.isFeatured && (
                                                            <span className="bg-primary-500/10 text-primary-500 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                                Featured
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-1">{product.tagline}</p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${product.isActive ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-gray-400'}`}></div>
                                                    <span className="text-xs font-semibold text-gray-500 uppercase">{product.isActive ? 'Active' : 'Archived'}</span>
                                                </div>

                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => { setEditingProduct(product); setIsModalOpen(true); }}
                                                        className="p-2.5 rounded-xl text-gray-400 hover:text-primary-500 hover:bg-primary-500/5 transition-all"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product.id || product._id)}
                                                        className="p-2.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-500/5 transition-all"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}
