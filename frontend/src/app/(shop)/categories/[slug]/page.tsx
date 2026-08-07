'use client';
import { useCategory, useProductSearch } from '@/hooks/useCatalog';
import Link from 'next/link';
import { use } from 'react';

export default function CategoryDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = use(props.params);
    const { data: category, isLoading: catLoading } = useCategory(params.slug);
    const { data: products, isLoading: prodLoading } = useProductSearch('', category?.id, '');

    if (catLoading) {
        return (
            <div className="p-8 max-w-6xl mx-auto animate-pulse">
                <div className="h-6 bg-gray-100 rounded w-48 mb-4"></div>
                <div className="h-10 bg-gray-100 rounded w-64 mb-2"></div>
                <div className="h-5 bg-gray-100 rounded w-96 mb-8"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-gray-100 rounded"></div>)}
                </div>
            </div>
        );
    }

    if (!category) return <div className="p-8 text-center text-red-500">Category not found</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <nav className="text-sm text-gray-500 mb-4">
                <Link href="/" className="hover:underline">Home</Link>
                {' / '}
                <Link href="/categories" className="hover:underline">Categories</Link>
                {' / '}
                <span className="text-gray-900">{category.name}</span>
            </nav>
            <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
            <p className="text-gray-600 mb-8">{category.description}</p>

            {prodLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-gray-100 rounded"></div>)}
                </div>
            ) : (!products || products.length === 0) ? (
                <div className="text-gray-500 text-center py-16 bg-gray-50 rounded-xl">No products found in this category.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map((p: any) => (
                        <Link key={p.id} href={`/products/${p.slug}`} className="block border p-4 rounded-xl hover:shadow-lg transition group">
                            <img src="https://placehold.co/600x600/f3f4f6/9ca3af?text=Crosh" alt={p.name} className="w-full h-40 object-cover mb-4 rounded-lg" />
                            <h3 className="font-bold group-hover:text-blue-600 transition">{p.name}</h3>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-1">{p.shortDescription}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
