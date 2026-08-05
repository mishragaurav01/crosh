import { ChangePasswordForm } from '@/features/auth/components/ChangePasswordForm';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { AuthGuard } from '@/features/auth/components/AuthGuard';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function ChangePasswordPage() {
    return (
        <AuthGuard>
            <AuthLayout title="Change Password" description="Update your active password securely">
                <ChangePasswordForm />
                <div className="mt-6 text-center">
                    <Link href="/profile" className={buttonVariants({ variant: "link" }) + " p-0 h-auto font-medium"}>
                        Back to Profile
                    </Link>
                </div>
            </AuthLayout>
        </AuthGuard>
    );
}
