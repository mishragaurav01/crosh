import { create } from 'zustand';
import { User } from '../types/auth.types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    setUser: (user: User) => void;
    clearUser: () => void;
    setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true, // initial state while checking session

    setUser: (user) => set({ user, isAuthenticated: true, isLoading: false }),
    clearUser: () => set({ user: null, isAuthenticated: false, isLoading: false }),
    setLoading: (isLoading) => set({ isLoading }),
}));
