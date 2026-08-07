'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname } from 'next/navigation';

export default function AdminCrudPage() {
    const pathname = usePathname();
    const moduleName = pathname.split('/').pop() || 'items';

    const { data, isLoading } = useQuery({
        queryKey: ['admin-catalog', moduleName],
        queryFn: async () => (await axios.get(`http://localhost:3000/api/v1/${moduleName}`)).data.data
    });

    return (
        <div className="p-8 bg-white min-h-screen max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h1 className="text-2xl font-bold capitalize">Manage {moduleName}</h1>
                <button className="bg-black text-white px-4 py-2 rounded text-sm font-bold shadow hover:bg-gray-800 transition">Create New</button>
            </div>

            {isLoading ? (
                <div className="animate-pulse space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-12 bg-gray-100 rounded"></div>)}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600">ID</th>
                                <th className="p-4 font-semibold text-gray-600 capitalize">Name / Ref</th>
                                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(data && data.length > 0) ? data.map((item: any) => (
                                <tr key={item.id || item._id} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-4 font-mono text-xs text-gray-500">{item.id || item._id}</td>
                                    <td className="p-4 font-semibold">{item.name || item.sku || 'Item'}</td>
                                    <td className="p-4 space-x-4 text-right">
                                        <button className="text-blue-600 hover:text-blue-800 transition">Edit</button>
                                        <button className="text-red-600 hover:text-red-800 transition">Delete</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan={3} className="p-8 text-center text-gray-500">No {moduleName} found. Start creating!</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
