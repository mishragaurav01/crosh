'use client';
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
          <Link key={c.id} href={`/categories/${c.slug}`} className="block border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
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