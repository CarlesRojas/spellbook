import { useMutation } from "@tanstack/react-query";
import { createCharacter } from "../repo/character";

export const useCreateCharacter = (onSuccess?: () => void) => {
    return useMutation({ mutationFn: createCharacter, onSuccess });
};
