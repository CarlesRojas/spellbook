import { Character } from "@/type/Character";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCharacter } from "../repo/character";

export const useDeleteCharacter = (userEmail: string) => {
    const queryClient = useQueryClient();
    const queryKey = ["characters", userEmail];

    return useMutation({
        mutationFn: deleteCharacter,
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey });
            const previousData: Character[] | undefined = queryClient.getQueryData(queryKey);

            const newData: Character[] | undefined = previousData
                ? previousData.filter((character) => character.id !== id)
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
