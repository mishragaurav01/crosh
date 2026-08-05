 
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfileSchema, UpdateProfileFormData } from '../schemas/auth.schemas';
import { useUpdateProfile } from '../hooks/use-auth';
import { useAuthStore } from '../store/use-auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export function ProfileForm() {
    const user = useAuthStore((state) => state.user);
    const { mutate: updateProfile, isPending } = useUpdateProfile();

    const form = useForm<UpdateProfileFormData>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: { firstName: '', lastName: '' },
    });

    useEffect(() => {
        if (user) {
            form.reset({
                firstName: user.firstName,
                lastName: user.lastName,
            });
        }
    }, [user, form]);

    const onSubmit = (data: UpdateProfileFormData) => {
        updateProfile(data, {
            onSuccess: () => {
                toast.success('Profile updated successfully!');
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || 'Failed to update profile');
            }
        });
    };

    if (!user) return <div className="p-4"><Loader2 className="animate-spin h-6 w-6" /></div>;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" value={user.email} readOnly disabled className="bg-muted text-muted-foreground" />
                    </FormControl>
                </FormItem>

                <FormItem>
                    <FormLabel>Assigned Roles</FormLabel>
                    <FormControl>
                        <div className="flex gap-2 flex-wrap">
                            {user.roles?.map((role) => (
                                <span key={typeof role === 'string' ? role : (role as any).name} className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded shadow">
                                    {typeof role === 'string' ? role : (role as any).name}
                                </span>
                            )) || <span className="text-sm text-muted-foreground">Standard Customer</span>}
                        </div>
                    </FormControl>
                </FormItem>

                <Button type="submit" disabled={isPending || !form.formState.isDirty}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </form>
        </Form>
    );
}
