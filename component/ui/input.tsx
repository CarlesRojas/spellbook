import { cn } from "@/lib/util";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const inputVariants = cva(
    "mouse:focus-visible:border-stone-400 mouse:focus-visible:dark:border-stone-600 placeholder:text-base focus-shadow flex h-10 w-full rounded-md border bg-stone-50 px-3 py-2 text-base file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-stone-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-black dark:placeholder:text-stone-400 mouse:focus-visible:outline-none",
    {
        variants: {
            variant: {
                default: "border-stone-300 dark:border-stone-700",
                error: "!border-red-500 dark:!border-red-500",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, variant, type, ...props }, ref) => {
    return <input type={type} className={cn(inputVariants({ variant, className }))} ref={ref} {...props} />;
});
Input.displayName = "Input";

export { Input };
