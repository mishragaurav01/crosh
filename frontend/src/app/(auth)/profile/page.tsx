'use client';

import { ProfileForm } from '@/features/auth/components/ProfileForm';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { AuthGuard } from '@/features/auth/components/AuthGuard';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { useLogout } from '@/features/auth/hooks/use-auth';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
    const { mutate: logout, isPending } = useLogout();

    const handleLogout = () => {
        logout(undefined, {
            onSuccess: () => {
                toast.success("Logged out successfully");
            }
        });
    };

    return (
        <AuthGuard>
            <AuthLayout title="My Profile" description="Manage your account settings">
                <ProfileForm />
                <div className="mt-6 flex flex-col space-y-2">
                    <Link href="/change-password" className={buttonVariants({ variant: "link" }) + " p-0 h-auto font-medium"}>
                        Change Password
                    </Link>
                    <Button variant="destructive" onClick={handleLogout} disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Logout
                    </Button>
                </div>
            </AuthLayout>
        </AuthGuard>
    );
}
