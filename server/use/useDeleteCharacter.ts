import { useMutation } from "@tanstack/react-query";
import { deleteCharacter } from "../repo/character";

export const useDeleteCharacter = (onSuccess?: () => void) => {
    return useMutation({ mutationFn: deleteCharacter, onSuccess });
};
