import { getUserCharacters } from "@/server/repo/character";
import { useQuery } from "@tanstack/react-query";

type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
export type GetUserCharactersReturnType = PromiseType<ReturnType<typeof getUserCharacters>>;

export const useCharacters = (userEmail: string, initialData: GetUserCharactersReturnType) => {
    return useQuery({
        queryKey: ["characters", userEmail],
        queryFn: () => getUserCharacters(userEmail),
        initialData,
    });
};