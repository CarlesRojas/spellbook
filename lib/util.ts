import { Language } from "@/type/Language";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getNamePossessiveSuffix = (name: string, language: Language) => {
    return language === Language.EN ? (name.endsWith("s") ? "'" : "'s") : "";
};
