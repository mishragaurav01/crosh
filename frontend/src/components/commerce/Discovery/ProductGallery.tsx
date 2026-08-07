'use client';
import React, { useState } from 'react';

export default function ProductGallery({ images }: { images: any[] }) {
    const [mainImage, setMainImage] = useState(images.find(img => img.isThumbnail) || images[0]);
    const [zoom, setZoom] = useState(false);

    if (!images || images.length === 0) return <div>No images available.</div>;

    return (
        <div className="flex flex-col md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex flex-row md:flex-col gap-2 overflow-x-auto">
                {images.sort((a, b) => a.sortOrder - b.sortOrder).map(img => (
                    <img
                        key={img.id}
                        src={img.url}
                        alt={img.altText || 'Product Image'}
                        className={`w-16 h-16 object-cover cursor-pointer border-2 ${mainImage?.id === img.id ? 'border-primary' : 'border-transparent'}`}
                        onClick={() => setMainImage(img)}
                    />
                ))}
            </div>

            {/* Main Image with pure CSS Zoom */}
            <div
                className="relative w-full max-w-md overflow-hidden"
                onMouseEnter={() => setZoom(true)}
                onMouseLeave={() => setZoom(false)}
            >
                <img
                    src={mainImage?.url}
                    alt={mainImage?.altText || 'Product Img'}
                    className={`w-full h-auto transition-transform duration-300 ease-in-out ${zoom ? 'scale-150 origin-center cursor-zoom-in' : 'scale-100'}`}
                />
            </div>
        </div>
    );
}
