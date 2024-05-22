import { Language } from "@/type/Language";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getNamePossessiveSuffix = (name: string, language: Language) => {
    return language === Language.EN ? (name.endsWith("s") ? "'" : "'s") : "";
};

export const renderObject = (obj: Record<string, any>, level = 0) => {
    if (!obj) return null;

    return (
        <ul style={{ marginLeft: `${level * 32}px` }}>
            {Object.entries(obj).map(([key, value], index) => (
                <li key={index}>
                    <strong className="text-sky-500">{key}:</strong>{" "}
                    {typeof value === "object" ? renderObject(value, level + 1) : value}
                </li>
            ))}
        </ul>
    );
};
