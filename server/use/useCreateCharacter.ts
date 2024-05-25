import { Character } from "@/type/Character";
import { ClassType } from "@/type/Spell";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCharacter } from "../repo/character";

export const useCreateCharacter = (userEmail: string) => {
    const queryClient = useQueryClient();
    const queryKey = ["characters", userEmail];

    return useMutation({
        mutationFn: createCharacter,
        onMutate: async (newCharacter) => {
            await queryClient.cancelQueries({ queryKey });
            const previousData: Character[] | undefined = queryClient.getQueryData(queryKey);

            const newData: Character[] | undefined = previousData
                ? [{ ...newCharacter, class: newCharacter.class as ClassType, id: -1 }, ...previousData]
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
