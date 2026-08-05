import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { GuestGuard } from '@/features/auth/components/AuthGuard';

export default function RegisterPage() {
    return (
        <GuestGuard>
            <AuthLayout title="Create an account" description="Enter your details to register">
                <RegisterForm />
            </AuthLayout>
        </GuestGuard>
    );
}
