import { forgetSpell } from "@/server/repo/characterSpell";
import { CharacterWithSpells } from "@/type/Character";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useForgetSpell = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: forgetSpell,
        onMutate: async ({ characterId, spellIndex }) => {
            await queryClient.cancelQueries({ queryKey: ["character", characterId] });
            const previousData: CharacterWithSpells | undefined = queryClient.getQueryData(["character", characterId]);

            const newData: CharacterWithSpells | undefined = previousData
                ? {
                      ...previousData,
                      knownSpells: previousData.knownSpells.filter(({ index }) => index !== spellIndex),
                  }
                : undefined;
            queryClient.setQueryData(["character", characterId], newData);

            return { previousData, characterId };
        },
        onError: (err, newData, context) => {
            context && queryClient.setQueryData(["character", context.characterId], context.previousData);
        },
        onSuccess: (returnedData, error, { characterId }) => {
            queryClient.invalidateQueries({ queryKey: ["character", characterId] });
            onSuccess?.();
        },
    });
};
