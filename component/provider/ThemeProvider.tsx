"use client";

import { ThemeProvider as ThemeProviderInternal } from "next-themes";
import { ReactNode } from "react";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProviderInternal attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProviderInternal>
    );
};

export default ThemeProvider;
