import { NotFoundType } from "@/type/NotFoundType";
import { Route } from "@/type/Route";
import {
    Ability,
    AreaOfEffectType,
    AttackType,
    CastingTime,
    ClassType,
    Component,
    DamageType,
    DifficultyClassSuccess,
    Duration,
    RangeType,
    School,
    Sort,
    Subclass,
} from "@/type/Spell";
import { z } from "zod";

/* When adding a new language:
 * 1. Add the new language to the Language enum
 * 2. Create a new file with the translations: `language/[newLanguage].json`
 * 3. Add the new language to the `getTranslation` function in `language/useTranslation.ts`
 * 4. Add the new language to the `useLanguageNames` function in `language/config.ts`
 * 5. Add language in the TranslationSchema in `server/database/schema/translation.ts`
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
        language: z.object(Object.fromEntries(Object.values(Language).map((item) => [item, z.string()]))),
        route: z.object(Object.fromEntries(Object.values(Route).map((item) => [item, z.string()]))),
        notFound: z.object(Object.fromEntries(Object.values(NotFoundType).map((item) => [item, z.string()]))),
        sort: z.object(Object.fromEntries(Object.values(Sort).map((item) => [item, z.string()]))),
        range: z.object(Object.fromEntries(Object.values(RangeType).map((item) => [item, z.string()]))),
        component: z.object(Object.fromEntries(Object.values(Component).map((item) => [item, z.string()]))),
        areaOfEffect: z.object(Object.fromEntries(Object.values(AreaOfEffectType).map((item) => [item, z.string()]))),
        class: z.object(Object.fromEntries(Object.values(ClassType).map((item) => [item, z.string()]))),
        subclass: z.object(Object.fromEntries(Object.values(Subclass).map((item) => [item, z.string()]))),
        school: z.object(Object.fromEntries(Object.values(School).map((item) => [item, z.string()]))),
        damageType: z.object(Object.fromEntries(Object.values(DamageType).map((item) => [item, z.string()]))),
        abilityShort: z.object(Object.fromEntries(Object.values(Ability).map((item) => [item, z.string()]))),
        ability: z.object(Object.fromEntries(Object.values(Ability).map((item) => [item, z.string()]))),
        difficultyClassSuccess: z.object(
            Object.fromEntries(Object.values(DifficultyClassSuccess).map((item) => [item, z.string()])),
        ),
        duration: z.object(Object.fromEntries(Object.values(Duration).map((item) => [item, z.string()]))),
        castingTime: z.object(Object.fromEntries(Object.values(CastingTime).map((item) => [item, z.string()]))),
        attackType: z.object(Object.fromEntries(Object.values(AttackType).map((item) => [item, z.string()]))),
    }),

    filter: z.object({
        noResults: z.string(),
        result: z.string(),
        results: z.string(),
        all: z.string(),
        level: z.string(),

        title: z.object({
            query: z.string(),
            school: z.string(),
            sort: z.string(),
            class: z.string(),
        }),
    }),

    dnd: z.object({
        cantrip: z.string(),
        cantrips: z.string(),
        level: z.string(),

        character: z.object({
            createCharacter: z.string(),
            name: z.string(),
            newName: z.string(),
            class: z.string(),
            level: z.string(),
            ability: z.string(),
            deleteDisclaimer: z.string(),
            oath: z.string(),
            domain: z.string(),

            error: z.object({
                nameTooShort: z.string(),
                nameTooLong: z.string(),
            }),
        }),

        spell: z.object({
            all: z.string(),
            known: z.string(),
            prepared: z.string(),
            spellbook: z.string(),

            view: z.string(),
            cast: z.string(),

            learn: z.string(),
            forget: z.string(),
            learnAnyway: z.string(),
            addToSpellbook: z.string(),
            removeFromSpellbook: z.string(),
            cannotLearn: z.string(),
            cannotLearnDescription: z.string(),

            addCantrip: z.string(),
            removeCantrip: z.string(),
            addCantripAnyway: z.string(),
            cannotAddCantrip: z.string(),
            cannotAddCantripDescription: z.string(),

            prepare: z.string(),
            unprepare: z.string(),
            prepareAnyway: z.string(),
            prepareAsDomain: z.string(),
            unprepareFromDomain: z.string(),
            prepareAsOath: z.string(),
            unprepareFromOath: z.string(),
            cannotPrepare: z.string(),
            cannotPrepareDescription: z.string(),

            toast: z.object({
                learn: z.string(),
                forget: z.string(),
                addToSpellbook: z.string(),
                removeFromSpellbook: z.string(),
                prepare: z.string(),
                unprepare: z.string(),
                prepareAsOath: z.string(),
                unprepareFromOath: z.string(),
                prepareAsDomain: z.string(),
                unprepareFromDomain: z.string(),
                addCantrip: z.string(),
                removeCantrip: z.string(),
                cast: z.string(),
                castAsRitual: z.string(),
                castAsCantrip: z.string(),
            }),
        }),

        cast: z.object({
            outOfSpellSlots: z.string(),
            castWithHigherLevelSlot: z.string(),
            castWithLevel: z.string(),
            ritual: z.string(),
        }),
    }),

    form: z.object({
        required: z.string(),
        optional: z.string(),
        create: z.string(),
        delete: z.string(),
        cancel: z.string(),
        edit: z.string(),
        close: z.string(),
        confirm: z.string(),
    }),
});

export type LanguageObject = z.infer<typeof LanguageObjectSchema>;
