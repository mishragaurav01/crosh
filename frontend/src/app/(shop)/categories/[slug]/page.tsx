'use client';
import { useCategory, useProducts } from '@/hooks/useCatalog';
import Link from 'next/link';
import { use } from 'react';

export default function CategoryDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = use(props.params);
    const { data: category, isLoading: catLoading } = useCategory(params.slug);
    const { data: products, isLoading: prodLoading } = useProducts(`?category=${category?.id || ''}`);

    if (catLoading) return <div className="p-8 text-center animate-pulse">Loading Category...</div>;
    if (!category) return <div className="p-8 text-center text-red-500">Category not found</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <nav className="text-sm text-gray-500 mb-4"><Link href="/categories" className="hover:underline">Categories</Link> / {category.name}</nav>
            <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
            <p className="text-gray-600 mb-8">{category.description}</p>

            {prodLoading ? (
                <div className="animate-pulse">Loading Products...</div>
            ) : (!products || products.length === 0) ? (
                <div className="text-gray-500 text-center py-10 bg-gray-50 rounded">No products found in this category.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map((p: any) => (
                        <Link key={p.id} href={`/products/${p.slug}`} className="block border p-4 rounded hover:shadow-lg transition">
                            <div className="h-40 bg-gray-100 mb-4 rounded flex items-center justify-center text-sm text-gray-400">Image</div>
                            <h3 className="font-bold">{p.name}</h3>
                            <p className="font-bold mt-2">View Details</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
