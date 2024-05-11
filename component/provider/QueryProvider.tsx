"use client";

import { QueryClient, QueryClientProvider, type QueryClientConfig } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

const queryConfig: QueryClientConfig = {
    defaultOptions: {
        queries: {
            retry: false,
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
    },
};

export const QueryProvider = ({ children }: { children: ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient(queryConfig));

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
