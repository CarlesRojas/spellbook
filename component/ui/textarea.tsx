import * as React from "react";

import { cn } from "@/lib/util";
import { VariantProps, cva } from "class-variance-authority";

const textAreaVariants = cva(
    "mouse:focus-visible:border-stone-400 min-h-[80px] mouse:focus-visible:dark:border-stone-600 placeholder:text-base focus-shadow flex w-full rounded-md border bg-stone-50 px-3 py-2 text-base placeholder:text-stone-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-black dark:placeholder:text-stone-400 mouse:focus-visible:outline-none",
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

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        VariantProps<typeof textAreaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, variant, ...props }, ref) => {
    return <textarea className={cn(textAreaVariants({ variant, className }))} ref={ref} {...props} />;
});
Textarea.displayName = "Textarea";

export { Textarea };
