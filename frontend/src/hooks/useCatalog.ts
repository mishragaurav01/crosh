import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000/api/v1' });

export const useCategories = () => useQuery({
    queryKey: ['categories'],
    queryFn: async () => (await api.get('/categories')).data.data
});

export const useCategory = (slug: string) => useQuery({
    queryKey: ['category', slug],
    queryFn: async () => (await api.get(`/categories/slug/${slug}`)).data.data,
    enabled: !!slug
});

export const useCollections = () => useQuery({
    queryKey: ['collections'],
    queryFn: async () => (await api.get('/collections')).data.data
});

export const useCollection = (slug: string) => useQuery({
    queryKey: ['collection', slug],
    queryFn: async () => (await api.get(`/collections/slug/${slug}`)).data.data,
    enabled: !!slug
});

export const useProducts = (query = '') => useQuery({
    queryKey: ['products', query],
    queryFn: async () => (await api.get(`/products${query}`)).data.data
});

export const useFeaturedProducts = () => useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => (await api.get('/products/featured')).data.data
});

export const useNewArrivals = () => useQuery({
    queryKey: ['products', 'new-arrivals'],
    queryFn: async () => (await api.get('/products/new-arrivals')).data.data
});

export const useProductSearch = (q: string, category?: string, collection?: string) => useQuery({
    queryKey: ['products', 'search', q, category, collection],
    queryFn: async () => {
        const params = new URLSearchParams();
        if (q) params.set('q', q);
        if (category) params.set('category', category);
        if (collection) params.set('collection', collection);
        return (await api.get(`/products/search?${params.toString()}`)).data.data;
    }
});

export const useProduct = (slug: string) => useQuery({
    queryKey: ['product', slug],
    queryFn: async () => (await api.get(`/products/slug/${slug}`)).data.data,
    enabled: !!slug
});

export const useProductImages = (productId: string) => useQuery({
    queryKey: ['product-images', productId],
    queryFn: async () => (await api.get(`/products/${productId}/images`)).data.data,
    enabled: !!productId
});

export const useProductVariants = (productId: string) => useQuery({
    queryKey: ['product-variants', productId],
    queryFn: async () => (await api.get(`/products/${productId}/variants`)).data.data,
    enabled: !!productId
});
