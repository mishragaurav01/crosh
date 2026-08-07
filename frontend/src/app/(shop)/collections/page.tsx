'use client';
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
          <Link key={c.id} href={`/collections/${c.slug}`} className="relative block h-64 border rounded-xl shadow overflow-hidden group">
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