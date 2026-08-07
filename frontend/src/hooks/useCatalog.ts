import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000/api/v1' });

export const useCategories = () => useQuery({
    queryKey: ['categories'],
    queryFn: async () => (await api.get('/categories')).data.data
});

export const useCategory = (slug: string) => useQuery({
    queryKey: ['category', slug],
    queryFn: async () => (await api.get(`/categories/slug/${slug}`)).data.data
});

export const useCollections = () => useQuery({
    queryKey: ['collections'],
    queryFn: async () => (await api.get('/collections')).data.data
});

export const useCollection = (slug: string) => useQuery({
    queryKey: ['collection', slug],
    queryFn: async () => (await api.get(`/collections/slug/${slug}`)).data.data
});

export const useProducts = (query = '') => useQuery({
    queryKey: ['products', query],
    queryFn: async () => (await api.get(`/products${query}`)).data.data
});

export const useProduct = (slug: string) => useQuery({
    queryKey: ['product', slug],
    queryFn: async () => (await api.get(`/products/slug/${slug}`)).data.data
});
