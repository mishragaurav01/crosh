'use client';
import React, { useState } from 'react';

export default function VariantSelector({ variants, onSelect }: any) {
    const [selected, setSelected] = useState(variants[0]);
    return (
        <div className="flex gap-4">
            {variants.map((v: any) => (
                <button
                    key={v.id}
                    onClick={() => { setSelected(v); onSelect(v); }}
                    className={`p-2 border ${selected?.id === v.id ? 'border-primary' : 'border-gray-200'}`}
                >
                    {v.attributes?.color} - {v.attributes?.size}
                </button>
            ))}
        </div>
    );
}
