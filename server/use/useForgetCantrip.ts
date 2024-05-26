import { forgetCantrip } from "@/server/repo/characterSpell";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useForgetCantrip = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: forgetCantrip,
        onMutate: async (data) => ({ ...data }),
        onSuccess: (returnedData, error, { characterId }) => {
            queryClient.invalidateQueries({ queryKey: ["character", characterId] });
            onSuccess?.();
        },
    });
};
