'use client';
import React, { useState, useEffect } from 'react';

export default function WishlistPage({ token }: { token: string }) {
    const [wishlist, setWishlist] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/wishlist', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                setWishlist(data.data || { items: [] });
                setLoading(false);
            });
    }, [token]);

    const removeProduct = async (id: string) => {
        await fetch(`http://localhost:3000/api/v1/wishlist/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        });
        setWishlist({ items: wishlist.items.filter((i: any) => i.productId !== id) });
    };

    if (loading) {
        return <div className="p-4 animate-pulse flex flex-col gap-4">
            <div className="h-8 w-48 bg-gray-200 rounded"></div>
            <div className="h-32 w-full bg-gray-100 rounded"></div>
        </div>;
    }

    if (!wishlist || wishlist.items.length === 0) {
        return <div className="p-8 text-center text-gray-500 border rounded bg-gray-50 max-w-lg mx-auto">Your wishlist is empty.</div>;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {wishlist.items.map((item: any) => (
                    <div key={item.productId} className="border p-4 rounded shadow-sm relative group bg-white">
                        <button
                            onClick={() => removeProduct(item.productId)}
                            className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition"
                            title="Remove"
                        >
                            ×
                        </button>
                        <div className="h-40 bg-gray-100 mb-4 rounded flex items-center justify-center text-gray-400 text-sm">Image Placeholder</div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-gray-500 text-sm">{item.sku}</p>
                        <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">View Product</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
