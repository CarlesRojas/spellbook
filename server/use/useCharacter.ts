import { getCharacter } from "@/server/repo/character";
import { useQuery } from "@tanstack/react-query";

type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
export type GetCharacterReturnType = PromiseType<ReturnType<typeof getCharacter>>;

export const useCharacter = (characterId: string) => {
    return useQuery({
        queryKey: ["character", characterId],
        queryFn: () => getCharacter(parseInt(characterId)),
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: !!characterId && !isNaN(parseInt(characterId)),
    });
};
