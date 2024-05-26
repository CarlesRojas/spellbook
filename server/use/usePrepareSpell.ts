import { prepareSpell } from "@/server/repo/characterSpell";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePrepareSpell = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: prepareSpell,
        onMutate: async (data) => ({ ...data }),
        onSuccess: (returnedData, error, { characterId }) => {
            queryClient.invalidateQueries({ queryKey: ["character", characterId] });
            onSuccess?.();
        },
    });
};
