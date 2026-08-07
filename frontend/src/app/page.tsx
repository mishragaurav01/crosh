'use client';
import { useFeaturedProducts, useNewArrivals, useCollections, useCategories } from '@/hooks/useCatalog';
import Link from 'next/link';

export default function Home() {
  const { data: featured } = useFeaturedProducts();
  const { data: newArrivals } = useNewArrivals();
  const { data: collections } = useCollections();
  const { data: categories } = useCategories();

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

      {/* Categories Strip */}
      {categories && categories.length > 0 && (
        <div className="max-w-6xl mx-auto py-12 px-4">
          <h2 className="text-3xl font-bold mb-8 tracking-tight">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((c: any) => (
              <Link key={c.id} href={`/categories/${c.slug}`} className="block bg-gray-50 border rounded-xl p-6 text-center hover:shadow-lg transition group">
                <div className="text-4xl mb-3">🧶</div>
                <h3 className="font-bold text-lg group-hover:text-blue-600 transition">{c.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{c.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Featured Collections */}
      {collections && collections.length > 0 && (
        <div className="max-w-6xl mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold mb-8 tracking-tight">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.slice(0, 2).map((c: any) => (
              <Link key={c.id} href={`/collections/${c.slug}`} className="h-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <h3 className="text-2xl font-bold">{c.name}</h3>
                  <p className="text-gray-300">{c.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Featured Products */}
      {featured && featured.length > 0 && (
        <div className="max-w-6xl mx-auto py-16 px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <Link href="/products" className="text-blue-600 font-bold hover:underline">View All &rarr;</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.slice(0, 4).map((p: any) => (
              <Link key={p.id} href={`/products/${p.slug}`} className="block bg-white border border-gray-100 p-4 rounded-xl hover:shadow-xl transition group">
                <img src="https://placehold.co/600x600/f3f4f6/9ca3af?text=Crosh" alt={p.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition">{p.name}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">{p.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* New Arrivals */}
      {newArrivals && newArrivals.length > 0 && (
        <div className="max-w-6xl mx-auto py-16 px-4 bg-gray-50 rounded-3xl">
          <div className="flex justify-between items-end mb-8 px-2">
            <h2 className="text-3xl font-bold tracking-tight">New Arrivals</h2>
            <Link href="/products" className="text-blue-600 font-bold hover:underline">View All &rarr;</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-2">
            {newArrivals.slice(0, 4).map((p: any) => (
              <Link key={p.id} href={`/products/${p.slug}`} className="block bg-white border border-gray-100 p-4 rounded-xl hover:shadow-xl transition group">
                <img src="https://placehold.co/600x600/f3f4f6/9ca3af?text=New" alt={p.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition">{p.name}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">{p.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="max-w-6xl mx-auto py-20 px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Handcrafted with Love</h2>
        <p className="text-gray-500 mb-8 max-w-xl mx-auto">Every piece is carefully crocheted to bring warmth and joy. Browse our full catalog to find the perfect gift.</p>
        <Link href="/products" className="bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition shadow-lg text-lg">Explore All Products</Link>
      </div>
    </div>
  );
}
