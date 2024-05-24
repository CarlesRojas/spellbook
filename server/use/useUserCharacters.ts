import { getCharacter, getUserCharacters } from "@/server/repo/character";
import { useQueries, useQuery } from "@tanstack/react-query";

type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
export type GetUserCharactersReturnType = PromiseType<ReturnType<typeof getUserCharacters>>;

export const useUserCharacters = (userEmail: string) => {
    const characterIds = useQuery({
        queryKey: ["characters", userEmail],
        queryFn: () => getUserCharacters(userEmail),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const characters = useQueries({
        queries: (characterIds.data ?? []).map((characterId) => ({
            queryKey: ["character", characterId],
            queryFn: () => getCharacter(characterId),
            staleTime: 1000 * 60 * 5,
            enabled: !!characterIds.data,
        })),
    });

    return { characters, characterIds };
};
