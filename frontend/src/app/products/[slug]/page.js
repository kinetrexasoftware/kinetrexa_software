import { productAPI } from '@/lib/api';
import ProductDetailClient from './ProductDetailClient';
import Button from '@/components/ui/Button';
import Link from 'next/link';

// Dynamic Metadata
export async function generateMetadata({ params }) {
    const { slug } = params;
    try {
        const res = await productAPI.getBySlug(slug);
        const product = res.data;
        if (!product) return { title: 'Product Not Found | KineTrexa' };

        return {
            title: `${product.name} | ${product.tagline} | KineTrexa`,
            description: product.shortDescription,
            openGraph: {
                title: product.name,
                description: product.shortDescription,
                type: 'website',
            },
        };
    } catch (error) {
        return { title: 'Product | KineTrexa' };
    }
}

export default async function ProductDetailPage({ params }) {
    const { slug } = params;
    let product = null;

    try {
        const res = await productAPI.getBySlug(slug);
        product = res.data;
    } catch (error) {
        console.error("Error fetching product", error);
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#0B1220] flex flex-col items-center justify-center text-white p-4">
                <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
                <p className="text-gray-400 mb-8">The product you are looking for does not exist or has been moved.</p>
                <Link href="/">
                    <Button>Back to Home</Button>
                </Link>
            </div>
        );
    }

    return <ProductDetailClient product={product} />;
}
