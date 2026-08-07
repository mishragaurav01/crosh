'use client';
import React, { useState, useEffect } from 'react';

export default function CartPage({ token }: { token: string }) {
    const [cart, setCart] = useState<any>(null);
    const [couponCode, setCouponCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        setLoading(true);
        const headers: any = {};
        if (token) headers.Authorization = `Bearer ${token}`;
        else headers['x-guest-id'] = localStorage.getItem('guestId') || 'temp-guest';

        const res = await fetch('http://localhost:3000/api/v1/cart', { headers });
        const data = await res.json();
        setCart(data.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCart();
    }, [token]);

    const updateQuantity = async (itemId: string, qty: number) => {
        const headers: any = { 'Content-Type': 'application/json' };
        if (token) headers.Authorization = `Bearer ${token}`;
        else headers['x-guest-id'] = localStorage.getItem('guestId') || 'temp-guest';

        await fetch(`http://localhost:3000/api/v1/cart/items/${itemId}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ quantity: qty })
        });
        fetchCart();
    };

    const applyCoupon = async () => {
        setError('');
        const headers: any = { 'Content-Type': 'application/json' };
        if (token) headers.Authorization = `Bearer ${token}`;
        else headers['x-guest-id'] = localStorage.getItem('guestId') || 'temp-guest';

        const res = await fetch(`http://localhost:3000/api/v1/cart/apply-coupon`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ code: couponCode })
        });
        const data = await res.json();
        if (!res.ok) setError(data.message);
        fetchCart();
    };

    if (loading) return <div className="p-8 animate-pulse text-center text-gray-500">Loading Cart...</div>;

    if (!cart || !cart.items || cart.items.length === 0) {
        return <div className="p-8 text-center bg-gray-50 border rounded max-w-lg mx-auto">Your cart is completely empty.</div>;
    }

    return (
        <div className="p-4 max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
            <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
                <div className="flex flex-col gap-4">
                    {cart.items.map((item: any) => (
                        <div key={item.variantId} className="flex gap-4 border p-4 rounded items-center bg-white shadow-sm">
                            <div className="w-16 h-16 bg-gray-200"></div>
                            <div className="flex-1 text-sm">
                                <p className="font-bold">{item.product?.name || 'Item'}</p>
                                <p className="text-gray-500">{item.variant?.sku || 'SKU'}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="px-2 bg-gray-100 font-bold">-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="px-2 bg-gray-100 font-bold">+</button>
                            </div>
                            <div className="font-bold ml-4">₹{item.total}</div>
                            <button onClick={() => updateQuantity(item.variantId, 0)} className="text-red-500 font-bold px-2 ml-2">×</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full md:w-80 bg-gray-50 border p-6 rounded shadow-sm self-start">
                <h3 className="text-lg font-bold border-b pb-2 mb-4">Order Summary</h3>
                <div className="flex flex-col gap-2 mb-4 text-sm">
                    <div className="flex justify-between"><span>Subtotal</span><span>₹{cart.subTotal}</span></div>
                    {cart.discountAmount > 0 && (
                        <div className="flex justify-between text-green-600"><span>Discount (Coupon)</span><span>-₹{cart.discountAmount}</span></div>
                    )}
                </div>
                <div className="flex gap-2 mb-4">
                    <input
                        className="border p-2 w-full text-sm rounded"
                        placeholder="Promo Code"
                        value={couponCode}
                        onChange={e => setCouponCode(e.target.value)}
                    />
                    <button onClick={applyCoupon} className="bg-black text-white px-3 py-2 text-sm font-bold rounded hover:bg-gray-800">Apply</button>
                </div>
                {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
                <div className="flex justify-between font-bold text-xl border-t pt-2">
                    <span>Total</span><span>₹{cart.total}</span>
                </div>
                <button className="w-full mt-6 bg-black text-white py-3 font-bold rounded shadow hover:bg-gray-800" onClick={() => window.location.href = '/checkout'}>Proceed to Checkout</button>
            </div>
        </div>
    );
}
