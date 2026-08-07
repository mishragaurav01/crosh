'use client';
import { useProductSearch } from '@/hooks/useCatalog';
import Link from 'next/link';
import { useState } from 'react';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [activeQuery, setActiveQuery] = useState('');
    const { data: products, isLoading } = useProductSearch(activeQuery);

    const handleSearch = () => {
        setActiveQuery(query.trim());
    };

    return (
        <div className="p-8 max-w-4xl mx-auto min-h-[60vh]">
            <h1 className="text-3xl font-bold mb-6">Search Products</h1>
            <div className="flex gap-2 mb-8">
                <input
                    type="text"
                    className="flex-1 border p-3 rounded-lg text-lg outline-none focus:ring-2 focus:ring-black transition"
                    placeholder="Search for products..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
                <button onClick={handleSearch} className="bg-black text-white px-6 font-bold rounded-lg hover:bg-gray-800 transition shadow">Search</button>
            </div>

            {isLoading ? (
                <div className="animate-pulse flex flex-col gap-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-50 rounded"></div>)}
                </div>
            ) : activeQuery && (!products || products.length === 0) ? (
                <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-xl">
                    <div className="text-4xl mb-4">🔍</div>
                    <p className="text-lg">No results found for &quot;{activeQuery}&quot;</p>
                    <p className="text-sm mt-2">Try a different search term</p>
                </div>
            ) : products && products.length > 0 ? (
                <div className="flex flex-col gap-4">
                    <p className="text-sm text-gray-500 mb-2">{products.length} result{products.length > 1 ? 's' : ''} found</p>
                    {products.map((p: any) => (
                        <Link key={p.id} href={`/products/${p.slug}`} className="flex gap-4 border p-4 rounded-lg hover:shadow-md transition bg-white items-center group">
                            <img src="https://placehold.co/80x80/f3f4f6/9ca3af?text=Crosh" alt={p.name} className="w-20 h-20 rounded object-cover flex-shrink-0" />
                            <div>
                                <h3 className="font-bold text-lg group-hover:text-blue-600 transition">{p.name}</h3>
                                <p className="text-sm text-gray-500 line-clamp-1">{p.shortDescription}</p>
                                {p.category?.name && <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-500 mt-1 inline-block">{p.category.name}</span>}
                            </div>
                        </Link>
                    ))}
                </div>
            ) : !activeQuery ? (
                <div className="text-center py-20 text-gray-400">
                    <div className="text-4xl mb-4">🧶</div>
                    <p>Enter a keyword to search our catalog</p>
                </div>
            ) : null}
        </div>
    );
}
