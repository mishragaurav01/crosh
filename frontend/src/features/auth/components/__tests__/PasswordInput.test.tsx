import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import { PasswordInput } from '../PasswordInput';
import React from 'react';

describe('PasswordInput component', () => {
    test('toggles password visibility correctly', () => {
        render(<PasswordInput aria-label="Password" placeholder="Enter password" />);

        const input = screen.getByPlaceholderText('Enter password');
        expect(input).toHaveAttribute('type', 'password');

        const toggleButton = screen.getByRole('button');
        fireEvent.click(toggleButton);

        expect(input).toHaveAttribute('type', 'text');
    });

    test('displays weak password strength indicator properly', () => {
        render(<PasswordInput aria-label="Password" placeholder="pwd" showStrength value="123" readOnly />);
        expect(screen.getByText(/Weak/i)).toBeInTheDocument();
    });

    test('displays strong password strength indicator properly', () => {
        render(<PasswordInput aria-label="Password" placeholder="pwd" showStrength value="SuperStr0ng!$" readOnly />);
        expect(screen.getByText(/Strong/i)).toBeInTheDocument();
    });
});
