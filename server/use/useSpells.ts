import { getAllSpells, getUserSpells } from "@/server/repo/spell";
import { useQuery } from "@tanstack/react-query";

type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
export type GetAllSpellsReturnType = PromiseType<ReturnType<typeof getAllSpells>>;

export const useSpellsPreloaded = (initialData: GetAllSpellsReturnType, userId?: number) => {
    return useQuery({
        queryKey: ["spells", userId],
        queryFn: () => getAllSpells(userId),
        initialData,
    });
};

export const useSpells = (userId?: number) => {
    return useQuery({
        queryKey: ["spells", userId],
        queryFn: () => getAllSpells(userId),
    });
};

// TODO use this one and add the results in the spells and character spells lists

export const useUserSpells = (userId?: number) => {
    return useQuery({
        queryKey: ["userSpells", userId],
        queryFn: () => getUserSpells(userId!),
        enabled: !!userId,
    });
};
