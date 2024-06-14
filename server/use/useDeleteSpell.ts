import { deleteSpell } from "@/server/repo/spell";
import { Spell } from "@/type/Spell";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteSpell = (userId?: number) => {
    const queryClient = useQueryClient();
    const queryKey = ["userSpells", userId];

    return useMutation({
        mutationFn: deleteSpell,
        onMutate: async (index) => {
            await queryClient.cancelQueries({ queryKey });
            const previousData: Spell[] | undefined = queryClient.getQueryData(queryKey);

            const newData: Spell[] | undefined = previousData
                ? previousData.filter((spell) => spell.index !== index)
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
