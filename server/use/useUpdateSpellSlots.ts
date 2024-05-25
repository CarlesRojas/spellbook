import { updateSpellSlots } from "@/server/repo/spellSlots";
import { CharacterWithSpells } from "@/type/Character";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateSpellSlots = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateSpellSlots,
        onMutate: async ({ characterId, id, ...newSpellSlots }) => {
            await queryClient.cancelQueries({ queryKey: ["character", characterId] });

            const previousCharacterData: CharacterWithSpells | undefined = queryClient.getQueryData([
                "character",
                characterId,
            ]);

            const newCharacterData: CharacterWithSpells | undefined = previousCharacterData
                ? { ...previousCharacterData, spellSlotsAvailable: newSpellSlots }
                : undefined;

            queryClient.setQueryData(["character", characterId], newCharacterData);

            return { previousCharacterData };
        },
        onError: (err, newSpellSlots, context) => {
            context &&
                queryClient.setQueryData(["character", newSpellSlots.characterId], context.previousCharacterData);
        },
        onSettled: (data, err, newSpellSlots) => {
            queryClient.invalidateQueries({ queryKey: ["character", newSpellSlots.characterId] });
        },
    });
};
