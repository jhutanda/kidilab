import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming you have this from previous step

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'accent' | 'outline';
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {

        const variants = {
            primary: 'bg-pastel-blue text-blue-600 border-2 border-blue-200 hover:bg-blue-300',
            secondary: 'bg-pastel-pink text-pink-600 border-2 border-pink-200 hover:bg-pink-300',
            accent: 'bg-pastel-yellow text-yellow-700 border-2 border-yellow-200 hover:bg-yellow-300',
            outline: 'bg-white border-2 border-slate-200 text-slate-600 hover:bg-slate-50',
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-sm rounded-lg',
            md: 'px-5 py-2.5 text-base rounded-xl',
            lg: 'px-8 py-4 text-xl rounded-2xl font-bold',
            xl: 'px-10 py-6 text-3xl rounded-3xl font-black',
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    'font-rounded transition-colors shadow-md flex items-center justify-center gap-2 select-none',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);

Button.displayName = "Button";
