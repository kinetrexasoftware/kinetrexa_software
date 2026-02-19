'use client';
import { useState, useEffect } from 'react';
import { Plus, Search, Layout } from 'lucide-react';
import Button from '@/components/ui/Button';
import ProductModal from '@/components/admin/products/ProductModal';
import DraggableProductList from '@/components/admin/products/DraggableProductList';
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

    const handleReorder = async (newItems) => {
        setProducts(newItems);
        try {
            await reorderProducts(newItems);
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

    const isFiltered = searchTerm !== '' || categoryFilter !== 'All Categories' || statusFilter !== 'All Status';

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

            {/* Product List (Isolated for DnD stability) */}
            {loading ? (
                <div className="text-center py-20 bg-white dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 text-gray-500">
                    Decoding product data...
                </div>
            ) : (
                <DraggableProductList
                    products={filteredProducts}
                    onReorder={handleReorder}
                    onEdit={(product) => { setEditingProduct(product); setIsModalOpen(true); }}
                    onDelete={handleDelete}
                    isFiltered={isFiltered}
                />
            )}
        </div>
    );
}
