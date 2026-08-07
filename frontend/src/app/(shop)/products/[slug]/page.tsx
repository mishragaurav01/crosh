'use client';
import { useProduct } from '@/hooks/useCatalog';
import { use } from 'react';

export default function ProductDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params);
  const { data: product, isLoading, error } = useProduct(params.slug);

  if (isLoading) return <div className="p-8 text-center animate-pulse">Loading Product...</div>;
  if (!product || error) return <div className="p-8 text-center text-red-500">Product not found.</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
      <div className="flex-1 space-y-4">
        <div className="h-96 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">Main Gallery Image</div>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-gray-50 rounded border flex items-center justify-center text-xs text-gray-300">Thumb</div>)}
        </div>
      </div>

      <div className="w-full md:w-96">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-xl font-bold mb-6">Price Varies by Variant</p>
        <p className="text-gray-600 mb-6">{product.description}</p>

        <div className="mb-6">
          <label className="font-bold block mb-2">Select Variant</label>
          <select className="border w-full p-2 rounded outline-none h-10">
            <option>Size M</option>
            <option>Size L</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button className="flex-1 bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition shadow">Add to Cart</button>
          <button className="px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition">❤️</button>
        </div>
      </div>
    </div>
  );
}