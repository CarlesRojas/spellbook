import { getCharacter, getUserCharacters } from "@/server/repo/character";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useUserCharacters = (userEmail: string) => {
    const queryClient = useQueryClient();

    const result = useQuery({
        queryKey: ["characters", userEmail],
        queryFn: () => getUserCharacters(userEmail),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    useEffect(() => {
        if (queryClient && result.data)
            preloadCharacters(
                queryClient,
                result.data.map((character) => character.id),
            );

        return () => {
            queryClient.cancelQueries({ queryKey: ["character"] });
        };
    }, [queryClient, result.data]);

    return result;
};

const preloadCharacters = async (queryClient: QueryClient, characterIds: number[]) => {
    await Promise.all(
        characterIds.map(
            async (characterId) =>
                await queryClient.prefetchQuery({
                    queryKey: ["character", characterId],
                    queryFn: () => getCharacter(characterId),
                }),
        ),
    );
};
