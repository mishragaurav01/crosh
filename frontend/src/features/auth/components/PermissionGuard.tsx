/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { useAuthStore } from '../store/use-auth-store';

interface PermissionGuardProps {
    children: React.ReactNode;
    permissions?: string[];
    fallback?: React.ReactNode;
}

export function PermissionGuard({ children, permissions = [], fallback = null }: PermissionGuardProps) {
    const { user } = useAuthStore();

    if (!user || !(user as any).permissions) { // Expanding user type for permissions lazily
        return <>{fallback}</>;
    }

    const userPerms = (user as any).permissions || [];
    const hasPermission = permissions.length === 0 || permissions.some((p) => userPerms.includes(p));

    if (!hasPermission) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
