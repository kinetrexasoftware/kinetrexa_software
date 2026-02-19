

import ProductsHero from '@/components/products/ProductsHero';
import ProductsGrid from '@/components/products/ProductsGrid';
import ProductShowcase from '@/components/products/ProductShowcase';
import ProductPhilosophy from '@/components/products/ProductPhilosophy';
import ProductLearning from '@/components/products/ProductLearning';
import ProductRoadmap from '@/components/products/ProductRoadmap';
import ProductsCTA from '@/components/products/ProductsCTA';

export default function ProductsPage() {
    return (
        <div className="min-h-screen">
            <ProductsHero />
            <ProductsGrid />
            <ProductShowcase />
            <ProductPhilosophy />
            <ProductLearning />
            <ProductRoadmap />
            <ProductsCTA />
        </div>
    );
}
