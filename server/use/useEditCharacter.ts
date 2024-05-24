import { useMutation } from "@tanstack/react-query";
import { updateCharacter } from "../repo/character";

export const useEditCharacter = (onSuccess?: () => void) => {
    return useMutation({ mutationFn: updateCharacter, onSuccess });
};
