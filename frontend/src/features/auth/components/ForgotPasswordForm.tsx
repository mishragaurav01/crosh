/* eslint-disable */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, ForgotPasswordFormData } from '../schemas/auth.schemas';
import { forgotPassword } from '../api/auth.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Link from 'next/link';
import { toast } from 'sonner';
import { Loader2, ArrowRight } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function ForgotPasswordForm() {
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: forgotPassword,
        onSuccess: () => {
            toast.success('If the email exists, a password reset link has been dispatched securely. Check the backend server terminal for the simulated Email output!');
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Failed to request reset');
        }
    });

    const form = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: '' },
    });

    const onSubmit = (data: ForgotPasswordFormData) => {
        mutate(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="name@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="w-full" type="submit" disabled={isPending}>
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
                    Send Reset Instructions
                </Button>
                <div className="text-center text-sm">
                    Remember your password?{' '}
                    <Link href="/login" className="font-medium text-primary hover:underline">
                        Back to login
                    </Link>
                </div>
            </form>
        </Form>
    );
}
