'use client';

import React, { useEffect } from 'react';
import { useProfile } from '../features/auth/hooks/use-auth';
import { useAuthStore } from '../features/auth/store/use-auth-store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { isLoading: queryLoading } = useProfile();
    const setLoading = useAuthStore((state) => state.setLoading);
    const clearUser = useAuthStore((state) => state.clearUser);

    useEffect(() => {
        // Listen for axios broadcasting an unrecoverable 401
        const handleUnauthorized = () => {
            clearUser();
            // Optional: Redirection to /login can be handled here or through a router hook
        };

        window.addEventListener('auth:unauthorized', handleUnauthorized);

        return () => {
            window.removeEventListener('auth:unauthorized', handleUnauthorized);
        };
    }, [clearUser]);

    useEffect(() => {
        setLoading(queryLoading);
    }, [queryLoading, setLoading]);

    return <>{children}</>;
}
