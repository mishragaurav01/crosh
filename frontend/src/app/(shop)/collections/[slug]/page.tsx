'use client';
import { useCollection, useProducts } from '@/hooks/useCatalog';
import Link from 'next/link';
import { use } from 'react';

export default function CollectionDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = use(props.params);
    const { data: collection, isLoading: colLoading } = useCollection(params.slug);
    const { data: products, isLoading: prodLoading } = useProducts(`?collection=${collection?.id || ''}`);

    if (colLoading) return <div className="p-8 text-center animate-pulse">Loading Collection...</div>;
    if (!collection) return <div className="p-8 text-center text-red-500">Collection not found</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <nav className="text-sm text-gray-500 mb-4"><Link href="/collections" className="hover:underline">Collections</Link> / {collection.name}</nav>
            <div className="h-64 bg-gray-900 text-white rounded-xl flex flex-col items-center justify-center mb-8 p-6 text-center">
                <h1 className="text-4xl font-bold mb-4">{collection.name}</h1>
                <p className="text-gray-300 max-w-2xl">{collection.description}</p>
            </div>

            {prodLoading ? (
                <div className="animate-pulse">Loading Products...</div>
            ) : (!products || products.length === 0) ? (
                <div className="text-gray-500 text-center py-10 bg-gray-50 rounded">No products found in this collection.</div>
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
