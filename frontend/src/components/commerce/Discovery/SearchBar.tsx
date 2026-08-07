'use client';
import React, { useState } from 'react';

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSearch} className="flex flex-row items-center w-full max-w-sm relative">
            <input
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button type="submit" className="absolute right-3 text-gray-500 hover:text-primary">
                🔍
            </button>
        </form>
    );
}
