'use client';
import React, { useState, useEffect } from 'react';

export default function AdminCoupon({ token }: { token: string }) {
    // In a real application, we'd have a GET /api/v1/coupons route, assuming one exists or just making a UI
    const [coupons, setCoupons] = useState<any[]>([]);

    const handleCreate = async () => {
        await fetch('http://localhost:3000/api/v1/coupons', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: 'SUMMER25', type: 'Percentage', value: 25 })
        });
        alert('Created demo coupon SUMMER25');
    };

    return (
        <div className="p-4 bg-white shadow rounded">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Coupon Management</h2>
                <button onClick={handleCreate} className="bg-black text-white px-4 py-2 rounded">Create New Coupon</button>
            </div>
            <table className="w-full text-left border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">Code</th>
                        <th className="p-2 border">Type</th>
                        <th className="p-2 border">Value</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-gray-500">No coupons loaded (Missing GET endpoint for Admin in reqs, purely UI template)</td></tr>}
                </tbody>
            </table>
        </div>
    );
}
