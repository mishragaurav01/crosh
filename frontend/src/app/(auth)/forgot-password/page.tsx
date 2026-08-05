import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { GuestGuard } from '@/features/auth/components/AuthGuard';

export default function ForgotPasswordPage() {
    return (
        <GuestGuard>
            <AuthLayout title="Forgot Password" description="Enter your email to receive a reset link">
                <ForgotPasswordForm />
            </AuthLayout>
        </GuestGuard>
    );
}
