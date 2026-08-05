import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface PasswordInputProps extends React.ComponentProps<"input"> {
    showStrength?: boolean;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, showStrength, value, onChange, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const [strength, setStrength] = useState(0);

        // Simple strength calculator
        useEffect(() => {
            if (!showStrength) return;
            const val = (value as string) || '';
            let s = 0;
            if (val.length >= 6) s += 25;
            if (val.length >= 10) s += 25;
            if (/[A-Z]/.test(val)) s += 25;
            if (/[!@#$%^&*0-9]/.test(val)) s += 25;
            setStrength(s);
        }, [value, showStrength]);

        const getStrengthColor = () => {
            if (strength <= 25) return 'bg-destructive';
            if (strength <= 50) return 'bg-yellow-500';
            if (strength <= 75) return 'bg-blue-500';
            return 'bg-green-500';
        };

        const getStrengthLabel = () => {
            if (strength === 0) return '';
            if (strength <= 25) return 'Weak';
            if (strength <= 50) return 'Fair';
            if (strength <= 75) return 'Good';
            return 'Strong';
        };

        return (
            <div className="space-y-1">
                <div className="relative">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        className={`pr-10 ${className || ''}`}
                        ref={ref}
                        value={value}
                        onChange={onChange}
                        {...props}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword((prev) => !prev)}
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        )}
                        <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                    </Button>
                </div>
                {showStrength && (value as string)?.length > 0 && (
                    <div className="flex items-center space-x-2 pt-1 transition-all">
                        <div className="h-1 flex-1 bg-muted rounded-full overflow-hidden">
                            <div className={`h-full transition-all duration-300 ${getStrengthColor()}`} style={{ width: `${strength}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground font-medium min-w-[3rem] text-right">
                            {getStrengthLabel()}
                        </span>
                    </div>
                )}
            </div>
        );
    }
);

PasswordInput.displayName = 'PasswordInput';
