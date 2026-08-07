'use client';
import React, { useState, useEffect } from 'react';

export default function OrderHistory({ token }: { token: string }) {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/orders', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                setOrders(data.data || []);
                setLoading(false);
            });
    }, [token]);

    const cancelOrder = async (id: string) => {
        const res = await fetch(`http://localhost:3000/api/v1/orders/${id}/cancel`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
            setOrders(orders.map(o => o.id === id ? { ...o, status: 'Cancelled' } : o));
        }
    };

    if (loading) return <div className="p-8 text-center">Loading Orders...</div>;

    if (orders.length === 0) return <div className="p-8 text-center bg-gray-50 border max-w-lg mx-auto">No orders found.</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">My Orders</h2>
            <div className="flex flex-col gap-6">
                {orders.map(o => (
                    <div key={o.id} className="border p-4 bg-white rounded shadow-sm">
                        <div className="flex justify-between border-b pb-2 mb-2 items-center">
                            <div>
                                <p className="font-bold text-gray-700">Order #{o.id}</p>
                                <p className="text-sm text-gray-500">{new Date(o.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg">₹{o.total}</p>
                                <span className={`text-xs px-2 py-1 rounded font-bold ${o.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{o.status}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 pt-2">
                            {o.items.map((i: any) => (
                                <div key={i.variantId} className="flex justify-between text-sm">
                                    <span>{i.name} x {i.quantity}</span>
                                    <span>₹{i.total}</span>
                                </div>
                            ))}
                        </div>
                        {['Pending', 'Confirmed'].includes(o.status) && (
                            <div className="mt-4 border-t pt-4">
                                <button onClick={() => cancelOrder(o.id)} className="text-red-500 font-semibold text-sm hover:underline">Cancel Order</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
