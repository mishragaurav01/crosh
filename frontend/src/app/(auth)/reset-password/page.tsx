import { ResetPasswordForm } from '@/features/auth/components/ResetPasswordForm';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { GuestGuard } from '@/features/auth/components/AuthGuard';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default function ResetPasswordPage() {
    return (
        <GuestGuard>
            <AuthLayout title="Reset Password" description="Enter your new password below">
                <Suspense fallback={<div className="flex justify-center p-4"><Loader2 className="animate-spin h-6 w-6" /></div>}>
                    <ResetPasswordForm />
                </Suspense>
            </AuthLayout>
        </GuestGuard>
    );
}
