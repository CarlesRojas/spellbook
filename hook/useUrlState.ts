import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ZodType } from "zod";

export const useUrlState = <T = string>(key: string, stateDefault: T, schema: ZodType<T>) => {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const state = schema.parse(searchParams.get(key) ?? stateDefault);

    const setState = (newState: T, scroll = false) => {
        if (newState === state) return;

        const params = new URLSearchParams(searchParams.toString());

        if (newState) params.set(key, String(newState));
        else params.delete(key);

        replace(`${pathname}?${params.toString()}`, { scroll });
    };

    return [state, setState] as const;
};
