import { apiClient } from '../../../lib/axios';
import { User, AuthResponse } from '../types/auth.types';
import {
    LoginFormData,
    RegisterFormData,
    ForgotPasswordFormData,
    ResetPasswordFormData,
    ChangePasswordFormData,
    UpdateProfileFormData
} from '../schemas/auth.schemas';

export const register = async (data: RegisterFormData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
};

export const login = async (data: LoginFormData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
};

export const logout = async (): Promise<{ success: boolean }> => {
    const response = await apiClient.post<{ success: boolean }>('/auth/logout');
    return response.data;
};

export const forgotPassword = async (data: ForgotPasswordFormData): Promise<{ success: boolean; message: string; data?: { resetToken: string } }> => {
    const response = await apiClient.post('/auth/forgot-password', data);
    return response.data;
};

export const resetPassword = async (data: ResetPasswordFormData): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post('/auth/reset-password', data);
    return response.data;
};

export const changePassword = async (data: ChangePasswordFormData): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post('/auth/change-password', data);
    return response.data;
};

export const getProfile = async (): Promise<{ success: boolean; data: User }> => {
    const response = await apiClient.get('/users/me');
    return response.data;
};

export const updateProfile = async (data: UpdateProfileFormData): Promise<{ success: boolean; data: User }> => {
    const response = await apiClient.patch('/users/me', data);
    return response.data;
};
