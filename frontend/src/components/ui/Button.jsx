'use client';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { forwardRef } from 'react';

const Button = forwardRef(({
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    children,
    disabled,
    type = 'button',
    ...props
}, ref) => {
    const variants = {
        primary: 'bg-brand-primary text-dark-bg hover:brightness-110 shadow-[0_0_20px_rgba(14,165,233,0.3)] border-transparent',
        secondary: 'bg-transparent border border-brand-primary/50 text-brand-primary hover:bg-brand-primary/10',
        outline: 'border border-white/10 text-white hover:bg-white/5 hover:border-white/20',
        ghost: 'text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all',
        danger: 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20',
    };

    const sizes = {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6 text-sm',
        lg: 'h-14 px-8 text-base font-bold uppercase tracking-wider',
    };

    return (
        <button
            ref={ref}
            type={type}
            className={cn(
                'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {children}
        </button>
    );
});

Button.displayName = 'Button';
export default Button;
