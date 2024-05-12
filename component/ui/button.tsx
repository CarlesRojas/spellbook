import { cn } from "@/lib/util";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold transition-colors disabled:pointer-events-none disabled:opacity-50 focus-shadow",
    {
        variants: {
            variant: {
                default: "text-stone-50 dark:text-stone-50 bg-orange-500 mouse:hover:bg-orange-500/90",
                destructive:
                    "bg-red-500 text-stone-50 mouse:hover:bg-red-500/90 dark:bg-red-900 dark:text-stone-50 dark:mouse:hover:bg-red-900/90",
                outline:
                    "font-semibold border border-stone-300 bg-white mouse:hover:bg-stone-100 mouse:hover:text-stone-900 dark:border-stone-700 dark:bg-stone-950 dark:mouse:hover:bg-stone-800 dark:mouse:hover:text-stone-50",
                secondary:
                    "bg-stone-200 text-stone-900 mouse:hover:bg-stone-200/80 dark:bg-stone-800 dark:text-stone-50 dark:mouse:hover:bg-stone-800/80",
                ghost: "mouse:hover:opacity-50",
                link: "font-semibold text-stone-900 underline-offset-4 mouse:hover:underline dark:text-stone-50",
            },

            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10 min-w-10 min-h-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
    },
);
Button.displayName = "Button";

export { Button, buttonVariants };
