import { unprepareSpell } from "@/server/repo/characterSpell";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUnprepareSpell = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: unprepareSpell,
        onMutate: async (data) => ({ ...data }),
        onSuccess: (returnedData, error, { characterId }) => {
            queryClient.invalidateQueries({ queryKey: ["character", characterId] });
            onSuccess?.();
        },
    });
};
