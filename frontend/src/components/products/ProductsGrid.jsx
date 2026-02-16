'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Box, CreditCard, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const products = [
    {
        id: "kineflow",
        icon: Box,
        name: "KineFlow",
        tagline: "Intelligent workflow automation platform.",
        status: "Beta",
        statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
        color: "text-blue-600"
    },
    {
        id: "edumate",
        icon: CreditCard,
        name: "EduMate",
        tagline: "Complete management system for educational institutes.",
        status: "Live",
        statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
        color: "text-green-600"
    },
    {
        id: "healthsync",
        icon: Activity,
        name: "HealthSync",
        tagline: "Patient monitoring and clinic management made easy.",
        status: "Coming Soon",
        statusColor: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
        color: "text-orange-600"
    }
];

export default function ProductsGrid() {
    return (
        <section className="section bg-gray-50 dark:bg-gray-900/50">
            <div className="container-custom">
                <div className="grid md:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-sm overflow-hidden group">
                                <CardContent className="p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center ${product.color}`}>
                                            <product.icon size={28} />
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${product.statusColor}`}>
                                            {product.status}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-8 min-h-[50px]">
                                        {product.tagline}
                                    </p>

                                    <Link href={`#${product.id}`}>
                                        <Button variant="outline" className="w-full group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 border-gray-200 dark:border-gray-700">
                                            View Details
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
