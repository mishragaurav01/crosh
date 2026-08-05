export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles?: string[];
    isActive?: boolean;
}

export interface AuthResponse {
    success: boolean;
    data?: {
        user: User;
    };
    message?: string;
}
