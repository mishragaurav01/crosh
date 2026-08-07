'use client';
import React, { useState, useEffect } from 'react';

export default function CheckoutPage({ token }: { token: string }) {
    const [summary, setSummary] = useState<any>(null);
    const [addresses, setAddresses] = useState<any[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<string>('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/checkout/summary', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => res.json())
            .then(data => setSummary(data.data));

        fetch('http://localhost:3000/api/v1/addresses', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => res.json())
            .then(data => {
                setAddresses(data.data || []);
                const def = data.data?.find((a: any) => a.isDefault);
                if (def) setSelectedAddress(def.id);
            });
    }, [token]);

    const handlePlaceOrder = async () => {
        setError('');
        if (!selectedAddress) {
            setError('Please select a shipping address.');
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/api/v1/checkout', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ addressId: selectedAddress })
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Failed to place order');
            } else {
                setSuccess(true);
            }
        } catch (e) {
            setError('An error occurred during checkout');
        }
    };

    if (success) {
        return (
            <div className="p-8 text-center border rounded max-w-lg bg-green-50 shadow-sm mx-auto mt-10">
                <h2 className="text-2xl font-bold text-green-700 mb-2">Order Successful! 🎉</h2>
                <p className="text-gray-700">Your order has been placed and inventory is secured.</p>
                <button className="mt-6 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800" onClick={() => window.location.href = '/orders'}>View My Orders</button>
            </div>
        );
    }

    if (!summary) return <div>Loading Checkout...</div>;

    return (
        <div className="p-4 flex flex-col md:flex-row gap-8 max-w-4xl mx-auto mt-6">
            <div className="flex-1 flex flex-col gap-6">
                <div className="p-4 border rounded shadow-sm bg-white">
                    <h3 className="text-xl font-bold mb-4">1. Shipping Address</h3>
                    {addresses.map(a => (
                        <label key={a.id} className={`flex items-start gap-4 p-3 border mb-2 cursor-pointer ${selectedAddress === a.id ? 'border-primary ring-1 ring-primary bg-blue-50' : ''}`}>
                            <input type="radio" name="address" checked={selectedAddress === a.id} onChange={() => setSelectedAddress(a.id)} className="mt-1" />
                            <div>
                                <p className="font-semibold">{a.fullName}</p>
                                <p className="text-sm text-gray-600">{a.street1}, {a.city}</p>
                                <p className="text-sm text-gray-600">{a.state} {a.postalCode}</p>
                            </div>
                        </label>
                    ))}
                    {addresses.length === 0 && <p className="text-red-500 text-sm">Please add an address first in your Address Book.</p>}
                </div>
            </div>

            <div className="w-full md:w-80 p-4 border rounded shadow-sm bg-gray-50 flex flex-col gap-4 self-start">
                <h3 className="text-xl font-bold border-b pb-2">Order Review</h3>
                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2">
                    {summary.items.map((i: any) => (
                        <div key={i.variantId} className="flex justify-between text-sm">
                            <span>{i.product?.name} <span className="text-gray-500">x{i.quantity}</span></span>
                            <span>₹{i.total}</span>
                        </div>
                    ))}
                </div>
                <div className="border-t pt-2 flex flex-col gap-1 text-sm">
                    <div className="flex justify-between"><span>Subtotal:</span> <span>₹{summary.subTotal}</span></div>
                    {summary.discountAmount > 0 && <div className="flex justify-between text-green-600"><span>Discount:</span> <span>-₹{summary.discountAmount}</span></div>}
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>₹{summary.total}</span>
                </div>

                {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

                <button onClick={handlePlaceOrder} className="w-full mt-4 py-3 bg-black text-white font-bold rounded hover:bg-gray-800 transition shadow-lg">
                    Place Order
                </button>
            </div>
        </div>
    );
}
