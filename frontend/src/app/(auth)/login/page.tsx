import { LoginForm } from '@/features/auth/components/LoginForm';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { GuestGuard } from '@/features/auth/components/AuthGuard';

export default function LoginPage() {
    return (
        <GuestGuard>
            <AuthLayout title="Welcome back" description="Enter your email to sign in to your account">
                <LoginForm />
            </AuthLayout>
        </GuestGuard>
    );
}
