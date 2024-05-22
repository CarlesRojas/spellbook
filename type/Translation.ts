import { z } from "zod";

export const TranslationSchema = z.object({
    id: z.number(),

    en: z.string(),
    es: z.string(),
});
export type Translation = z.infer<typeof TranslationSchema>;
