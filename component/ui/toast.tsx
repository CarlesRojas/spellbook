"use client";

import { Button } from "@/component/ui/button";
import { cn } from "@/lib/util";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { useTheme } from "next-themes";
import React, { ReactNode, useEffect, useState } from "react";
import { LuX } from "react-icons/lu";
import { Toaster as Sonner } from "sonner";

const toastVariants = cva("font-semibold tracking-wide text-base", {
    variants: {
        variant: {
            default: "",
            destructive: "text-red-500",
            constructive: "text-green-600 dark:text-green-500",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export interface ToastProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof toastVariants> {
    asChild?: boolean;
}

const Toast = React.forwardRef<HTMLParagraphElement, ToastProps>(
    ({ className, variant, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "p";
        return <Comp className={cn(toastVariants({ variant, className }))} ref={ref} {...props} />;
    },
);
Toast.displayName = "Toast";

const ToastWrapper = ({
    onClose,
    children,
    className,
}: {
    onClose: () => void;
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "flex w-full grow gap-4 rounded-lg border border-stone-300 bg-stone-50 p-2 shadow-lg dark:border-stone-700 dark:bg-black",
                className,
            )}
        >
            {children}

            <Button size="icon" variant="ghost" onClick={onClose}>
                <LuX className="h-8 w-8 p-1" />
                <span className="sr-only">Close</span>
            </Button>
        </div>
    );
};

const SpellToast = ({ message, icon }: { message: string; icon?: ReactNode }) => (
    <>
        <div className="flex w-full items-center gap-2">
            {!!icon && icon}
            <p className="text-base font-medium tracking-wide opacity-90">{message}</p>
        </div>
    </>
);

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme();

    const [isMouse, setIsMouse] = useState(false);

    useEffect(() => {
        setIsMouse(window !== undefined && window.matchMedia("(hover: hover)").matches);
    }, []);

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            position={isMouse ? "bottom-right" : "bottom-center"}
            toastOptions={{
                classNames: {
                    toast: "rounded-lg group w-full toast group-[.toaster]:bg-stone-50 group-[.toaster]:text-stone-950 group-[.toaster]:border-stone-300 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-black dark:group-[.toaster]:text-stone-50 dark:group-[.toaster]:border-stone-700",
                    description: "group-[.toast]:text-stone-500 dark:group-[.toast]:text-stone-400",
                    actionButton:
                        "group-[.toast]:bg-stone-900 group-[.toast]:text-stone-50 dark:group-[.toast]:bg-stone-50 dark:group-[.toast]:text-stone-900",
                    cancelButton:
                        "group-[.toast]:bg-stone-100 group-[.toast]:text-stone-500 dark:group-[.toast]:bg-stone-800 dark:group-[.toast]:text-stone-400",
                },
            }}
            {...props}
        />
    );
};

export { SpellToast, Toast, ToastWrapper, Toaster };
