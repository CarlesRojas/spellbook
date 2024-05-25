import { useQuery } from "@tanstack/react-query";
import { getAllSpells } from "../repo/spell";

type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
export type GetAllSpellsReturnType = PromiseType<ReturnType<typeof getAllSpells>>;

export const useSpellsPreloaded = (initialData: GetAllSpellsReturnType) => {
    return useQuery({
        queryKey: ["spells"],
        queryFn: () => getAllSpells(),
        initialData,
    });
};

export const useSpells = () => {
    return useQuery({
        queryKey: ["spells"],
        queryFn: () => getAllSpells(),
    });
};
