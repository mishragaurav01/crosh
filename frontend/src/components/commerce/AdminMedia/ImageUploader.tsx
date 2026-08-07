'use client';
import React, { useState } from 'react';

export default function ImageUploader({ productId, onUploadSuccess }: { productId: string, onUploadSuccess?: () => void }) {
    const [file, setFile] = useState<File | null>(null);
    const [altText, setAltText] = useState('');
    const [isThumbnail, setIsThumbnail] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);

        const formData = new FormData();
        formData.append('image', file);
        formData.append('altText', altText);
        formData.append('isThumbnail', isThumbnail ? 'true' : 'false');
        formData.append('sortOrder', '0');

        try {
            const res = await fetch(`http://localhost:3000/api/v1/products/${productId}/images`, {
                method: 'POST',
                body: formData,
                // Assuming secure cookie handling is managed globally by frontend HTTP client (e.g., credentials: 'include')
            });
            if (res.ok) {
                setFile(null);
                setAltText('');
                if (onUploadSuccess) onUploadSuccess();
            } else {
                alert('Upload failed');
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded bg-white shadow-sm flex flex-col gap-4 max-w-sm">
            <h3 className="font-bold">Add Product Image</h3>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />

            <input
                type="text"
                placeholder="Alt Text (SEO)"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="w-full px-3 py-2 border rounded"
            />

            <label className="flex items-center gap-2">
                <input type="checkbox" checked={isThumbnail} onChange={(e) => setIsThumbnail(e.target.checked)} />
                Set as Primary Thumbnail
            </label>

            <button
                onClick={handleUpload}
                disabled={!file || loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Uploading...' : 'Upload Image'}
            </button>
        </div>
    );
}
