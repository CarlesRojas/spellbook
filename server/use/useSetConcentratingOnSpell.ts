import { setConcentratingSpell } from "@/server/repo/character";
import { CharacterWithSpells } from "@/type/Character";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSetConcentratingOnSpell = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: setConcentratingSpell,
        onMutate: async (modifiedCharacter) => {
            await queryClient.cancelQueries({ queryKey: ["character", modifiedCharacter.id] });

            const previousData: CharacterWithSpells | undefined = queryClient.getQueryData([
                "character",
                modifiedCharacter.id,
            ]);

            const newData: CharacterWithSpells | undefined = previousData ? modifiedCharacter : undefined;

            queryClient.setQueryData(["character", modifiedCharacter.id], newData);

            return { previousData };
        },
        onError: (err, modifiedCharacter, context) => {
            context && queryClient.setQueryData(["character", modifiedCharacter.id], context.previousData);
        },
        onSettled: (data, err, modifiedCharacter) => {
            queryClient.invalidateQueries({ queryKey: ["character", modifiedCharacter.id] });
        },
    });
};
