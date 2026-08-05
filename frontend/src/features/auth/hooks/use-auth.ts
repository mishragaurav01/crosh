import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { login, register, logout, getProfile, updateProfile } from '../api/auth.api';
import { useAuthStore } from '../store/use-auth-store';
import { LoginFormData, RegisterFormData, UpdateProfileFormData } from '../schemas/auth.schemas';

export const useLogin = () => {
    const setUser = useAuthStore((state) => state.setUser);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: LoginFormData) => login(data),
        onSuccess: (response) => {
            if (response.data?.user) {
                setUser(response.data.user);
                queryClient.setQueryData(['profile'], response.data.user);
            }
        },
    });
};

export const useRegister = () => {
    const setUser = useAuthStore((state) => state.setUser);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: RegisterFormData) => register(data),
        onSuccess: (response) => {
            if (response.data?.user) {
                setUser(response.data.user);
                queryClient.setQueryData(['profile'], response.data.user);
            }
        },
    });
};

export const useLogout = () => {
    const clearUser = useAuthStore((state) => state.clearUser);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            clearUser();
            queryClient.clear();
        },
    });
};

export const useProfile = () => {
    const setUser = useAuthStore((state) => state.setUser);
    const clearUser = useAuthStore((state) => state.clearUser);

    return useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const response = await getProfile();
            setUser(response.data);
            return response.data;
        },
        meta: {
            onError: () => {
                clearUser();
            }
        },
        // We only fetch on mount to check session unless invalidated manually
        staleTime: Infinity,
        retry: false,
    });
};

export const useUpdateProfile = () => {
    const setUser = useAuthStore((state) => state.setUser);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateProfileFormData) => updateProfile(data),
        onSuccess: (response) => {
            setUser(response.data);
            queryClient.setQueryData(['profile'], response.data);
        },
    });
};
