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

    auth: z.object({
        signIn: z.string(),
        signOut: z.string(),
    }),

    enum: z.object({
        language: z.object(
            Object.fromEntries(Object.values(Language).map((languageLanguage) => [languageLanguage, z.string()])),
        ),
    }),
});

export type LanguageObject = z.infer<typeof LanguageObjectSchema>;
