'use client';
import { useProducts } from '@/hooks/useCatalog';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductsPage() {
  const [filter, setFilter] = useState('');
  const { data: products, isLoading, error } = useProducts(filter ? `?search=${filter}` : '');

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-64 flex-shrink-0">
        <h2 className="font-bold text-lg mb-4">Filters</h2>
        <input
          type="text"
          placeholder="Filter products..."
          className="border p-2 rounded w-full mb-4"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" /> In Stock</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> On Sale</label>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Products</h1>
          <select className="border p-2 rounded text-sm"><option>Sort: Recommended</option><option>Price: Low to High</option></select>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-64 bg-gray-100 rounded"></div>)}
          </div>
        ) : error ? (
          <div className="text-red-500">Failed to load products</div>
        ) : (!products || products.length === 0) ? (
          <div className="text-center bg-gray-50 py-10 rounded text-gray-500">No products found.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p: any) => (
              <Link key={p.id} href={`/products/${p.slug}`} className="group block border p-4 rounded hover:shadow-lg transition bg-white">
                <div className="h-48 bg-gray-100 rounded mb-4 overflow-hidden flex items-center justify-center text-gray-400">Image</div>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition">{p.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mt-1">{p.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}