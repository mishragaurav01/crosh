import React from 'react';

export default function DynamicPriceDisplay({ price, inventory }: any) {
    return (
        <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold">
                {price?.salePrice ?
                    <><span className="text-red-500">{price.currency} {price.salePrice}</span> <span className="line-through text-gray-400 text-sm">{price.currency} {price.basePrice}</span></> :
                    <>{price?.currency} {price?.basePrice}</>
                }
            </div>
            {inventory?.availableQuantity <= 0 ? (
                <span className="text-red-500 font-semibold">Out of Stock</span>
            ) : (
                <span className="text-green-500">{inventory?.availableQuantity} in stock</span>
            )}
        </div>
    );
}
