import { Character } from "@/type/Character";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCharacter } from "../repo/character";

export const useEditCharacter = (userEmail: string) => {
    const queryClient = useQueryClient();
    const queryKey = ["characters", userEmail];

    return useMutation({
        mutationFn: updateCharacter,
        onMutate: async (modifiedCharacter) => {
            await queryClient.cancelQueries({ queryKey });
            const previousData: Character[] | undefined = queryClient.getQueryData(queryKey);

            const newData: Character[] | undefined = previousData
                ? previousData.map((character) =>
                      character.id === modifiedCharacter.id ? modifiedCharacter : character,
                  )
                : undefined;
            queryClient.setQueryData(queryKey, newData);

            return { previousData };
        },
        onError: (err, newTodo, context) => {
            context && queryClient.setQueryData(queryKey, context.previousData);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    });
};
