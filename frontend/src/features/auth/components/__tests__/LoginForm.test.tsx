import { render, screen } from '@testing-library/react';
import { expect, test, vi, describe, beforeEach } from 'vitest';
import { LoginForm } from '../LoginForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: vi.fn() })
}));

vi.mock('../../hooks/use-auth', () => ({
    useLogin: () => ({
        mutate: vi.fn(),
        isPending: false
    })
}));

const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
);

describe('LoginForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders login fields securely', () => {
        render(<LoginForm />, { wrapper: Wrapper });
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
    });

    test('submit button is present and enabled by default', () => {
        render(<LoginForm />, { wrapper: Wrapper });
        const button = screen.getByRole('button', { name: /Sign In/i });
        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();
    });
});
