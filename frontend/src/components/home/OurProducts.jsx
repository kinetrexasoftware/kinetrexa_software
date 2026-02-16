'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Box } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { productAPI } from '@/lib/api';

const getStatusColor = (status) => {
    switch (status) {
        case 'Live': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
        case 'Beta': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
        case 'Coming Soon': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
        default: return 'bg-blue-100 text-blue-800';
    }
};

const getProductColor = (index) => {
    const colors = [
        'from-blue-500 to-cyan-500',
        'from-purple-500 to-pink-500',
        'from-emerald-500 to-teal-500',
        'from-orange-500 to-red-500',
        'from-indigo-500 to-violet-500'
    ];
    return colors[index % colors.length];
};

export default function OurProducts({ content }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const {
        title = 'Our Products',
        subtitle = 'Innovative solutions designed to solve real-world problems.'
    } = content || {};

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productAPI.getPublic();
                setProducts(data || []);
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return null;
    if (products.length === 0) return null;

    return (
        <section className="section bg-gray-50 dark:bg-gray-900/50">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group border-0 shadow-md">
                                <div className={`h-48 bg-gradient-to-br ${getProductColor(index)} flex items-center justify-center`}>
                                    <Box className="w-16 h-16 text-white opacity-80 group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold">{product.name}</h3>
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(product.status)}`}>
                                            {product.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[50px]">
                                        {product.description}
                                    </p>
                                    <Button variant="outline" className="w-full group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20">
                                        View Details
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
