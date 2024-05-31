import { getSpell } from "@/server/repo/spell";
import { useQuery } from "@tanstack/react-query";

type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
export type GetSpellReturnType = PromiseType<ReturnType<typeof getSpell>>;

export const useSpell = (spellId: string, initialData?: GetSpellReturnType) => {
    return useQuery({
        queryKey: ["spell", spellId],
        queryFn: () => getSpell(spellId),
        initialData,
    });
};
