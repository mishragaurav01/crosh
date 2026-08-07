'use client';
import React from 'react';

type FilterPanelProps = {
    categories: any[];
    collections: any[];
    onFilterChange: (filters: { category?: string; collection?: string }) => void;
};

export default function FilterPanel({ categories, collections, onFilterChange }: FilterPanelProps) {
    return (
        <div className="flex flex-col gap-6 p-4 border-r w-64 min-h-screen">
            <h3 className="font-bold text-lg">Filters</h3>

            <div>
                <h4 className="font-semibold mb-2">Category</h4>
                <div className="flex flex-col gap-2">
                    {categories.map((c) => (
                        <label key={c.id} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                            <input type="radio" name="category" value={c.id} onChange={(e) => onFilterChange({ category: e.target.value })} />
                            {c.name}
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="font-semibold mb-2">Collections</h4>
                <div className="flex flex-col gap-2">
                    {collections.map((c) => (
                        <label key={c.id} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                            <input type="radio" name="collection" value={c.id} onChange={(e) => onFilterChange({ collection: e.target.value })} />
                            {c.name}
                        </label>
                    ))}
                </div>
            </div>

        </div>
    );
}
