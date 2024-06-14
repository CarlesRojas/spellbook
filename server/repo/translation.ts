"use server";

import { db } from "@/server/database";
import { translation } from "@/server/database/schema";
import { Language } from "@/type/Language";
import { Translation, TranslationSchema } from "@/type/Translation";
import { RequiredField } from "@/type/utils";
import { eq } from "drizzle-orm";
import OpenAI from "openai";

export type NewTranslation = typeof translation.$inferInsert;
export type UpdateTranslation = RequiredField<NewTranslation, "id">;

export const createTranslation = async (newTranslation: NewTranslation) => {
    const result = await db.insert(translation).values(newTranslation).returning();

    return result.length > 0 ? result[0].id : null;
};

export const updateTranslation = async (newTranslation: UpdateTranslation) => {
    if (await existsTranslation(newTranslation.id)) {
        const result = await db
            .update(translation)
            .set(newTranslation)
            .where(eq(translation.id, newTranslation.id))
            .returning();

        return result.length > 0 ? result[0].id : null;
    }

    const { id, ...rest } = newTranslation;
    return await createTranslation(rest);
};

export const deleteTranslation = async (id: number) => {
    await db.delete(translation).where(eq(translation.id, id));
    return null;
};

const existsTranslation = async (id: number) => {
    const result = await db.query.translation.findFirst({
        where: (translation, { eq }) => eq(translation.id, id),
    });

    return !!result;
};

export const getTranslation = async (id: number) => {
    const result = await db.query.translation.findFirst({
        where: (translation, { eq }) => eq(translation.id, id),
    });

    if (!result) return null;
    return TranslationSchema.parse(result) as Translation;
};

const languageCodeToName = (language: Language) => {
    const names: Record<Language, string> = {
        [Language.ES]: "Spanish",
        [Language.EN]: "English",
    };
    return names[language];
};

export const translate = async ({
    text,
    language,
    parseToHtml = false,
}: {
    text: string;
    language: Language;
    parseToHtml?: boolean;
}) => {
    if (language === Language.EN && !parseToHtml) return text;

    try {
        const openAi = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

        const action: Record<Language, string> = {
            [Language.ES]: `You will be provided a text in English that refers to names and descriptions from Dungeons and Dragons 5e. The text may contain html, and your task is to translate it into ${languageCodeToName(language)}. Do not add or remove any content to the text. You should only respond with the result, nothing else.`,
            [Language.EN]: `You will be provided a text that refers to names and descriptions from Dungeons and Dragons 5e. The text may contain html and markdown, and your task is to convert any explicit markdown symbols into html by adding the minimum amount of html possible. Do not add any unnecessary <p> tags, only the ones for headings like <h2> or <h3>, bold text with <strong>, and all the tags needed for tables. Do not add or remove any content to the text. You should only respond with the result, nothing else.`,
        };

        const translation = await openAi.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: action[language],
                },
                { role: "user", content: text },
            ],
            model: "gpt-4o",
        });

        return translation.choices[0].message.content ?? null;
    } catch (e) {
        return null;
    }
};
