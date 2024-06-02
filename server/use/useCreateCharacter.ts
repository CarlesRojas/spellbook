import { createCharacter } from "@/server/repo/character";
import { Character } from "@/type/Character";
import { ClassType } from "@/type/Spell";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCharacter = (userEmail: string) => {
    const queryClient = useQueryClient();
    const queryKey = ["characters", userEmail];

    return useMutation({
        mutationFn: createCharacter,
        onMutate: async (newCharacter) => {
            await queryClient.cancelQueries({ queryKey });
            const previousData: Character[] | undefined = queryClient.getQueryData(queryKey);

            const newData: Character[] | undefined = previousData
                ? [
                      {
                          ...newCharacter,
                          class: newCharacter.class as ClassType,
                          id: -1,
                          concentratingOnId: newCharacter.concentratingOnId ?? null,
                          spellSlotsAvailableId: -1,
                      },
                      ...previousData,
                  ]
                : undefined;

            queryClient.setQueryData(queryKey, newData);

            return { previousData };
        },
        onError: (err, newCharacter, context) => {
            context && queryClient.setQueryData(queryKey, context.previousData);
        },
        onSettled: (newCharacterId) => {
            if (typeof newCharacterId === "number") {
                const previousData: Character[] | undefined = queryClient.getQueryData(queryKey);

                const newData: Character[] | undefined = previousData
                    ? previousData.map((character) =>
                          character.id === -1 ? { ...character, id: newCharacterId } : character,
                      )
                    : undefined;

                queryClient.setQueryData(queryKey, newData);
            }

            queryClient.invalidateQueries({ queryKey });
        },
    });
};
