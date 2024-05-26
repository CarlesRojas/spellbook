import { forgetSpell } from "@/server/repo/characterSpell";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useForgetSpell = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: forgetSpell,
        onMutate: async (data) => ({ ...data }),
        onSuccess: (returnedData, error, { characterId }) => {
            queryClient.invalidateQueries({ queryKey: ["character", characterId] });
            onSuccess?.();
        },
    });
};
