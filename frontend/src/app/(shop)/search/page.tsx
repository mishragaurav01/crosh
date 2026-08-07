'use client';
import { useProducts } from '@/hooks/useCatalog';
import Link from 'next/link';
import { useState } from 'react';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [activeQuery, setActiveQuery] = useState('');
    const { data: products, isLoading } = useProducts(activeQuery ? `?search=${activeQuery}` : '');

    return (
        <div className="p-8 max-w-4xl mx-auto min-h-[60vh]">
            <div className="flex gap-2 mb-8">
                <input
                    type="text"
                    className="flex-1 border p-3 rounded-lg text-lg outline-none focus:ring-2 focus:ring-black"
                    placeholder="Search for products..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && setActiveQuery(query)}
                />
                <button onClick={() => setActiveQuery(query)} className="bg-black text-white px-6 font-bold rounded-lg hover:bg-gray-800 transition shadow">Search</button>
            </div>

            {isLoading ? (
                <div className="animate-pulse flex flex-col gap-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-50 rounded"></div>)}
                </div>
            ) : activeQuery && (!products || products.length === 0) ? (
                <div className="text-center py-20 text-gray-500 bg-gray-50 rounded">No results found for &quot;{activeQuery}&quot;</div>
            ) : (
                <div className="flex flex-col gap-4">
                    {products?.map((p: any) => (
                        <Link key={p.id} href={`/products/${p.slug}`} className="flex gap-4 border p-4 rounded hover:shadow transition bg-white items-center group">
                            <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0"></div>
                            <div>
                                <h3 className="font-bold text-lg group-hover:text-blue-600 transition">{p.name}</h3>
                                <p className="text-sm text-gray-500">{p.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
