/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { useAuthStore } from '../store/use-auth-store';

interface RoleGuardProps {
    children: React.ReactNode;
    roles?: string[];
    fallback?: React.ReactNode;
}

export function RoleGuard({ children, roles = [], fallback = null }: RoleGuardProps) {
    const { user } = useAuthStore();

    if (!user || !user.roles) {
        return <>{fallback}</>;
    }

    // Assuming roles in user are strings. If they are objects, adjust logic
    const userRoles = user.roles.map((r: unknown) => typeof r === 'string' ? r : (r as any).name);
    const hasRole = roles.length === 0 || roles.some((r) => userRoles.includes(r));

    if (!hasRole) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
