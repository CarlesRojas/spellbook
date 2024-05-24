import { getCharacter } from "@/server/repo/character";
import { useQuery } from "@tanstack/react-query";

export const useCharacter = (characterId: string) => {
    return useQuery({
        queryKey: ["character", parseInt(characterId)],
        queryFn: () => getCharacter(parseInt(characterId)),
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: !!characterId && !isNaN(parseInt(characterId)),
    });
};
