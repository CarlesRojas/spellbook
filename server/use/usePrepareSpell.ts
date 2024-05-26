import { prepareSpell } from "@/server/repo/characterSpell";
import { CharacterWithSpells } from "@/type/Character";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePrepareSpell = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: prepareSpell,
        onMutate: async ({ characterId, spell }) => {
            await queryClient.cancelQueries({ queryKey: ["character", characterId] });
            const previousData: CharacterWithSpells | undefined = queryClient.getQueryData(["character", characterId]);

            const newData: CharacterWithSpells | undefined = previousData
                ? {
                      ...previousData,
                      preparedSpells: [...previousData.preparedSpells, spell],
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
