import { useMutation } from "@tanstack/react-query";
import { createCharacter } from "../repo/character";

export const useCreateCharacter = () => {
    return useMutation({ mutationFn: createCharacter });
};
