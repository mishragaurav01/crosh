const fs = require('fs');
const path = require('path');

function save(file, content) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
}

// 1. React Query Hooks
save('frontend/src/hooks/useCatalog.ts', `import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000/api/v1' });

export const useCategories = () => useQuery({
  queryKey: ['categories'],
  queryFn: async () => (await api.get('/categories')).data.data
});

export const useCategory = (slug: string) => useQuery({
  queryKey: ['category', slug],
  queryFn: async () => (await api.get(\`/categories/slug/${slug}\`)).data.data
});

export const useCollections = () => useQuery({
  queryKey: ['collections'],
  queryFn: async () => (await api.get('/collections')).data.data
});

export const useCollection = (slug: string) => useQuery({
  queryKey: ['collection', slug],
  queryFn: async () => (await api.get(\`/collections/slug/${slug}\`)).data.data
});

export const useProducts = (query = '') => useQuery({
  queryKey: ['products', query],
  queryFn: async () => (await api.get(\`/products${query}\`)).data.data
});

export const useProduct = (slug: string) => useQuery({
  queryKey: ['product', slug],
  queryFn: async () => (await api.get(\`/products/slug/${slug}\`)).data.data
});
`);

// 2. Customer Pages
save('frontend/src/app/(shop)/categories/page.tsx', `'use client';
import { useCategories } from '@/hooks/useCatalog';
import Link from 'next/link';

export default function CategoriesPage() {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) return <div className="p-8 text-center animate-pulse">Loading Categories...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Failed to load categories</div>;
  if (!categories || categories.length === 0) return <div className="p-8 text-center text-gray-500">No categories found</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">All Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((c: any) => (
          <Link key={c.id} href={\`/categories/${c.slug}\`} className="block border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
            <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400">Image</div>
            <div className="p-4 bg-white">
              <h2 className="font-bold text-lg">{c.name}</h2>
              <p className="text-sm text-gray-500 mt-1 truncate">{c.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
`);

save('frontend/src/app/(shop)/categories/[slug]/page.tsx', `'use client';
import { useCategory, useProducts } from '@/hooks/useCatalog';
import Link from 'next/link';
import { use } from 'react';

export default function CategoryDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params);
  const { data: category, isLoading: catLoading } = useCategory(params.slug);
  const { data: products, isLoading: prodLoading } = useProducts(\`?category=${category?.id || ''}\`);

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
            <Link key={p.id} href={\`/products/${p.slug}\`} className="block border p-4 rounded hover:shadow-lg transition">
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
`);

save('frontend/src/app/(shop)/collections/page.tsx', `'use client';
import { useCollections } from '@/hooks/useCatalog';
import Link from 'next/link';

export default function CollectionsPage() {
  const { data: collections, isLoading, error } = useCollections();

  if (isLoading) return <div className="p-8 text-center animate-pulse">Loading Collections...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Failed to load collections</div>;
  if (!collections || collections.length === 0) return <div className="p-8 text-center text-gray-500">No collections found</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Curated Collections</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((c: any) => (
          <Link key={c.id} href={\`/collections/${c.slug}\`} className="relative block h-64 border rounded-xl shadow overflow-hidden group">
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">Collection Cover</div>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h2 className="font-bold text-xl">{c.name}</h2>
              <p className="text-sm opacity-90 truncate">{c.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
`);

save('frontend/src/app/(shop)/collections/[slug]/page.tsx', `'use client';
import { useCollection, useProducts } from '@/hooks/useCatalog';
import Link from 'next/link';
import { use } from 'react';

export default function CollectionDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params);
  const { data: collection, isLoading: colLoading } = useCollection(params.slug);
  const { data: products, isLoading: prodLoading } = useProducts(\`?collection=${collection?.id || ''}\`);

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
            <Link key={p.id} href={\`/products/${p.slug}\`} className="block border p-4 rounded hover:shadow-lg transition">
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
`);

save('frontend/src/app/(shop)/products/page.tsx', `'use client';
import { useProducts } from '@/hooks/useCatalog';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductsPage() {
  const [filter, setFilter] = useState('');
  const { data: products, isLoading, error } = useProducts(filter ? \`?search=${filter}\` : '');

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
             {[1,2,3,4,5,6].map(i => <div key={i} className="h-64 bg-gray-100 rounded"></div>)}
           </div>
        ) : error ? (
           <div className="text-red-500">Failed to load products</div>
        ) : (!products || products.length === 0) ? (
           <div className="text-center bg-gray-50 py-10 rounded text-gray-500">No products found.</div>
        ) : (
           <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
             {products.map((p: any) => (
                <Link key={p.id} href={\`/products/${p.slug}\`} className="group block border p-4 rounded hover:shadow-lg transition bg-white">
                  <div className="h-48 bg-gray-100 rounded mb-4 overflow-hidden flex items-center justify-center">Image</div>
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
`);

save('frontend/src/app/(shop)/products/[slug]/page.tsx', `'use client';
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
           {[1,2,3,4].map(i => <div key={i} className="h-24 bg-gray-50 rounded border flex items-center justify-center text-xs text-gray-300">Thumb</div>)}
        </div>
      </div>
      
      <div className="w-full md:w-96">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-xl font-bold mb-6">Price Varies by Variant</p>
        <p className="text-gray-600 mb-6">{product.description}</p>
        
        <div className="mb-6">
          <label className="font-bold block mb-2">Select Variant</label>
          <select className="border w-full p-2 rounded">
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
`);

save('frontend/src/app/(shop)/search/page.tsx', `'use client';
import { useProducts } from '@/hooks/useCatalog';
import Link from 'next/link';
import { useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const { data: products, isLoading } = useProducts(activeQuery ? \`?search=${activeQuery}\` : '');

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex gap-2 mb-8">
         <input 
            type="text"
            className="flex-1 border p-3 rounded-lg text-lg outline-none focus:ring-2 focus:ring-black"
            placeholder="Search for products..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && setActiveQuery(query)}
         />
         <button onClick={() => setActiveQuery(query)} className="bg-black text-white px-6 font-bold rounded-lg hover:bg-gray-800">Search</button>
      </div>

      {isLoading ? (
        <div className="animate-pulse flex flex-col gap-4">
          {[1,2,3].map(i => <div key={i} className="h-24 bg-gray-50 rounded"></div>)}
        </div>
      ) : activeQuery && (!products || products.length === 0) ? (
        <div className="text-center py-20 text-gray-500 bg-gray-50 rounded">No results found for "{activeQuery}"</div>
      ) : (
        <div className="flex flex-col gap-4">
          {products?.map((p: any) => (
             <Link key={p.id} href={\`/products/${p.slug}\`} className="flex gap-4 border p-4 rounded hover:shadow transition bg-white items-center">
               <div className="w-20 h-20 bg-gray-100 rounded"></div>
               <div>
                  <h3 className="font-bold text-lg">{p.name}</h3>
                  <p className="text-sm text-gray-500">{p.description}</p>
               </div>
             </Link>
          ))}
        </div>
      )}
    </div>
  );
}
`);

save('frontend/src/app/page.tsx', `'use client';
import { useProducts, useCollections } from '@/hooks/useCatalog';
import Link from 'next/link';

export default function Home() {
  const { data: products } = useProducts('?limit=4');
  const { data: collections } = useCollections();

  return (
    <div className="min-h-screen">
      <div className="bg-black text-white text-center py-32 px-4 shadow-inner">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Redefining Excellence.</h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light">Explore our latest premium catalog drops directly from the source.</p>
        <Link href="/products" className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition">Shop Now</Link>
      </div>

      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 tracking-tight">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {collections?.slice(0,2).map((c: any) => (
              <Link key={c.id} href={\`/collections/${c.slug}\`} className="h-80 bg-gray-100 rounded-2xl relative overflow-hidden group">
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition"></div>
                 <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                    <h3 className="text-2xl font-bold">{c.name}</h3>
                    <p>{c.description}</p>
                 </div>
              </Link>
           ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 tracking-tight">New Arrivals</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
           {products?.map((p: any) => (
             <Link key={p.id} href={\`/products/${p.slug}\`} className="block border p-4 rounded-xl hover:shadow-lg transition">
               <div className="h-48 bg-gray-100 rounded-lg mb-4 flex justify-center items-center text-sm text-gray-400">Product Image</div>
               <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition">{p.name}</h3>
             </Link>
           ))}
        </div>
      </div>
    </div>
  );
}
`);

