import { getTotalSpellSlots } from "@/lib/character";
import { Character, CharacterWithSpells } from "@/type/Character";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCharacter } from "../repo/character";

export const useEditCharacter = (userEmail: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCharacter,
        onMutate: async (modifiedCharacter) => {
            await queryClient.cancelQueries({ queryKey: ["characters", userEmail] });
            await queryClient.cancelQueries({ queryKey: ["character", modifiedCharacter.id] });

            const previousListData: Character[] | undefined = queryClient.getQueryData(["characters", userEmail]);
            const previousCharacterData: CharacterWithSpells | undefined = queryClient.getQueryData([
                "character",
                modifiedCharacter.id,
            ]);

            const newListData: Character[] | undefined = previousListData
                ? previousListData.map((character) =>
                      character.id === modifiedCharacter.id ? modifiedCharacter : character,
                  )
                : undefined;
            const newCharacterData: CharacterWithSpells | undefined = previousCharacterData
                ? {
                      ...previousCharacterData,
                      name: modifiedCharacter.name,
                      level: modifiedCharacter.level,
                      ability: modifiedCharacter.ability,
                      spellSlotsAvailable: getTotalSpellSlots(previousCharacterData.class, modifiedCharacter.level),
                  }
                : undefined;

            queryClient.setQueryData(["characters", userEmail], newListData);
            queryClient.setQueryData(["character", modifiedCharacter.id], newCharacterData);

            return { previousListData, previousCharacterData };
        },
        onError: (err, modifiedCharacter, context) => {
            context && queryClient.setQueryData(["characters", userEmail], context.previousListData);
            context && queryClient.setQueryData(["character", modifiedCharacter.id], context.previousCharacterData);
        },
        onSettled: (data, err, modifiedCharacter) => {
            queryClient.invalidateQueries({ queryKey: ["characters", userEmail] });
            queryClient.invalidateQueries({ queryKey: ["character", modifiedCharacter.id] });
        },
    });
};
