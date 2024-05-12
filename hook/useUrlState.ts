import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ZodType } from "zod";

export const useUrlState = <T = string>(key: string, defaultState: T, schema: ZodType<T>) => {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const state = schema.parse(searchParams.get(key) ?? defaultState);

    const setState = (newState: T, scroll = false) => {
        if (newState === state) return;

        const params = new URLSearchParams(searchParams.toString());

        if (newState && newState !== defaultState) params.set(key, String(newState));
        else params.delete(key);

        replace(`${pathname}?${params.toString()}`, { scroll });
    };

    return [state, setState] as const;
};
