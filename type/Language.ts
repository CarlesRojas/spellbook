import { NotFoundType } from "@/type/NotFoundType";
import { Route } from "@/type/Route";
import { z } from "zod";

/* When adding a new language:
 * 1. Add the new language to the Language enum
 * 2. Create a new file with the translations: `language/[newLanguage].json`
 * 3. Add the new language to the `getTranslation` function in `language/useTranslation.ts`
 * 4. Add the new language to the `useLanguageNames` function in `language/config.ts`
 */
export enum Language {
    ES = "es",
    EN = "en",
}
export const DEFAULT_LANGUAGE = Language.ES;
export const LANGUAGES = Object.values(Language);

export const LanguageObjectSchema = z.object({
    title: z.string(),
    description: z.string(),

    settings: z.object({
        hi: z.string(),
        title: z.string(),
        language: z.string(),
        back: z.string(),

        theme: z.object({
            loading: z.string(),
            switchToLight: z.string(),
            switchToDark: z.string(),
        }),
    }),

    auth: z.object({
        signIn: z.string(),
        signOut: z.string(),
    }),

    enum: z.object({
        language: z.object(Object.fromEntries(Object.values(Language).map((language) => [language, z.string()]))),
        route: z.object(Object.fromEntries(Object.values(Route).map((route) => [route, z.string()]))),
        notFound: z.object(
            Object.fromEntries(Object.values(NotFoundType).map((notFoundType) => [notFoundType, z.string()])),
        ),
    }),

    filter: z.object({
        query: z.string(),
    }),
});

export type LanguageObject = z.infer<typeof LanguageObjectSchema>;
