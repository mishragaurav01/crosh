'use client';
import React, { useState, useEffect } from 'react';

export default function AdminOrderTable({ token }: { token: string }) {
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/orders?all=true', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setOrders(data.data || []));
    }, [token]);

    const updateStatus = async (id: string, newStatus: string) => {
        await fetch(`http://localhost:3000/api/v1/orders/${id}/status`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        });
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    };

    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Manage Orders</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border-b">Order ID</th>
                            <th className="p-2 border-b">Total</th>
                            <th className="p-2 border-b">Status</th>
                            <th className="p-2 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(o => (
                            <tr key={o.id} className="hover:bg-gray-50 text-sm">
                                <td className="p-2 border-b">{o.id}</td>
                                <td className="p-2 border-b">₹{o.total}</td>
                                <td className="p-2 border-b">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${o.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                                        {o.status}
                                    </span>
                                </td>
                                <td className="p-2 border-b">
                                    <select
                                        onChange={(e) => updateStatus(o.id, e.target.value)}
                                        value={o.status}
                                        className="border p-1 text-sm rounded bg-white shadow-sm"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
