'use client';
import { useProduct, useProductImages, useProductVariants } from '@/hooks/useCatalog';
import Link from 'next/link';
import { use, useState } from 'react';

export default function ProductDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params);
  const { data: product, isLoading, error } = useProduct(params.slug);
  const { data: images } = useProductImages(product?.id || '');
  const { data: variants } = useProductVariants(product?.id || '');
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return (
      <div className="p-8 max-w-6xl mx-auto flex flex-col md:flex-row gap-10 animate-pulse">
        <div className="flex-1 space-y-4">
          <div className="h-96 bg-gray-100 rounded-xl"></div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-gray-100 rounded"></div>)}
          </div>
        </div>
        <div className="w-full md:w-96 space-y-4">
          <div className="h-8 bg-gray-100 rounded w-3/4"></div>
          <div className="h-6 bg-gray-100 rounded w-1/4"></div>
          <div className="h-20 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  if (!product || error) return <div className="p-8 text-center text-red-500">Product not found.</div>;

  const gallery = images && images.length > 0
    ? images.map((img: any) => ({ url: img.url, alt: img.altText }))
    : [{ url: 'https://placehold.co/600x600/f3f4f6/9ca3af?text=No+Image', alt: 'No image' }];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:underline">Home</Link>
        {' / '}
        <Link href="/products" className="hover:underline">Products</Link>
        {' / '}
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Gallery */}
        <div className="flex-1 space-y-4">
          <div className="h-96 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center border">
            <img
              src={gallery[selectedImage]?.url}
              alt={gallery[selectedImage]?.alt}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {gallery.map((img: any, i: number) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`h-24 bg-gray-50 rounded border overflow-hidden flex items-center justify-center transition ${selectedImage === i ? 'ring-2 ring-black' : 'hover:ring-1 hover:ring-gray-300'}`}
              >
                <img src={img.url} alt={img.alt} className="max-h-full max-w-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-96">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          {/* Category/Collection badges */}
          <div className="flex gap-2 mb-4">
            {product.category?.name && (
              <Link href={`/categories/${product.category.slug}`} className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-200 transition">
                {product.category.name}
              </Link>
            )}
            {product.collectionAssigned?.name && (
              <Link href={`/collections/${product.collectionAssigned.slug}`} className="text-xs bg-blue-50 px-3 py-1 rounded-full text-blue-600 hover:bg-blue-100 transition">
                {product.collectionAssigned.name}
              </Link>
            )}
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          {/* Variants */}
          {variants && variants.length > 0 && (
            <div className="mb-6">
              <label className="font-bold block mb-2 text-sm uppercase tracking-wide text-gray-700">Select Variant</label>
              <select className="border w-full p-3 rounded-lg outline-none focus:ring-2 focus:ring-black transition">
                {variants.map((v: any) => (
                  <option key={v.id} value={v.id}>
                    {v.sku} — {v.attributes?.size || v.attributes?.color || 'Standard'}
                  </option>
                ))}
              </select>
              <div className="mt-3 text-sm text-gray-500">
                <span className="font-semibold text-gray-700">SKU:</span> {variants[0].sku}
                {variants[0].weight && <> · <span className="font-semibold text-gray-700">Weight:</span> {variants[0].weight}g</>}
              </div>
            </div>
          )}

          {/* Stock indicator */}
          <div className="mb-6">
            <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${product.status === 'Active' ? 'text-green-600' : 'text-red-500'}`}>
              <span className={`w-2 h-2 rounded-full ${product.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
              {product.status === 'Active' ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button className="flex-1 bg-black text-white py-3.5 rounded-lg font-bold hover:bg-gray-800 transition shadow-lg active:scale-[0.98]">
              Add to Cart
            </button>
            <button className="px-6 border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition text-xl">
              ❤️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}