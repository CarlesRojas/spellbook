import en from "@/language/en.json";
import es from "@/language/es.json";
import { DEFAULT_LANGUAGE, Language, LanguageObject, LanguageObjectSchema } from "@/type/Language";

export const getTranslation = (language: string): LanguageObject => {
    const parsedLanguage: Language = !Object.values(Language).includes(language as Language)
        ? DEFAULT_LANGUAGE
        : (language as Language);

    const languageObject: Record<Language, LanguageObject> = {
        [Language.ES]: LanguageObjectSchema.parse(es) as LanguageObject,
        [Language.EN]: LanguageObjectSchema.parse(en) as LanguageObject,
    };

    return languageObject[parsedLanguage];
};

export const useTranslation = (language: string): { t: LanguageObject } => {
    return { t: getTranslation(language) };
};
