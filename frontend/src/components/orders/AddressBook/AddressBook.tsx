'use client';
import React, { useState, useEffect } from 'react';

export default function AddressBook({ token }: { token: string }) {
    const [addresses, setAddresses] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/addresses', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setAddresses(data.data || []));
    }, [token]);

    return (
        <div className="p-4 border rounded max-w-2xl bg-white shadow-sm">
            <h2 className="text-xl font-bold mb-4">My Address Book</h2>
            <div className="flex flex-col gap-4">
                {addresses.map(addr => (
                    <div key={addr.id} className="p-3 border flex flex-col justify-between">
                        <p className="font-semibold">{addr.fullName} {addr.isDefault && <span className="text-xs text-green-600 border border-green-600 rounded px-2">Default</span>}</p>
                        <p>{addr.street1} {addr.street2}</p>
                        <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                        <p>{addr.country}</p>
                        <p className="text-gray-500">Phone: {addr.phoneNumber}</p>
                    </div>
                ))}
                {addresses.length === 0 && <p className="text-gray-600">No addresses saved.</p>}
            </div>
            <button className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
                Add New Address
            </button>
        </div>
    );
}
