'use client';
import { useProducts, useCollections } from '@/hooks/useCatalog';
import Link from 'next/link';

export default function Home() {
  const { data: products } = useProducts('?limit=4');
  const { data: collections } = useCollections();

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section */}
      <div className="bg-black text-white text-center py-32 px-4 shadow-inner">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Redefining Excellence.</h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light">Explore our latest premium catalog drops directly from the source.</p>
        <div className="space-x-4">
          <Link href="/products" className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition shadow-lg">Shop Now</Link>
          <Link href="/collections" className="border border-white/30 text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition shadow-lg">View Collections</Link>
        </div>
      </div>

      {/* Featured Collections */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 tracking-tight">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections?.slice(0, 2).map((c: any) => (
            <Link key={c.id} href={`/collections/${c.slug}`} className="h-80 bg-gray-100 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <h3 className="text-2xl font-bold">{c.name}</h3>
                <p>{c.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* New Arrivals */}
      <div className="max-w-6xl mx-auto py-16 px-4 bg-gray-50 rounded-3xl">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold tracking-tight">New Arrivals</h2>
          <Link href="/products" className="text-blue-600 font-bold hover:underline">View All &rarr;</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.slice(0, 4).map((p: any) => (
            <Link key={p.id} href={`/products/${p.slug}`} className="block bg-white border border-gray-100 p-4 rounded-xl hover:shadow-xl transition group">
              <div className="h-48 bg-gray-100 rounded-lg mb-4 flex justify-center items-center text-sm text-gray-400">Product Image</div>
              <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition">{p.name}</h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">{p.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
