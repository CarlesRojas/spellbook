import { SpellColor } from "@/lib/spell";
import { Ability } from "@/type/Character";
import { TranslationSchema } from "@/type/Translation";
import { z } from "zod";

export enum Sort {
    LEVEL_ASC = "level_asc",
    LEVEL_DESC = "level_desc",

    NAME_ASC = "name_asc",
    NAME_DESC = "name_desc",
}

export enum RangeType {
    FIVE_FEET = "FIVE_FEET",
    TEN_FEET = "TEN_FEET",
    THIRTY_FEET = "THIRTY_FEET",
    SIXTY_FEET = "SIXTY_FEET",
    NINETY_FEET = "NINETY_FEET",
    HUNDRED_FEET = "HUNDRED_FEET",
    HUNDRED_AND_TWENTY_FEET = "HUNDRED_AND_TWENTY_FEET",
    HUNDRED_AND_FIFTY_FEET = "HUNDRED_AND_FIFTY_FEET",
    THREE_HUNDRED_FEET = "THREE_HUNDRED_FEET",
    FIVE_HUNDRED_FEET = "FIVE_HUNDRED_FEET",
    ONE_MILE = "ONE_MILE",
    FIVE_HUNDRED_MILES = "FIVE_HUNDRED_MILES",
    UNLIMITED = "UNLIMITED",
    SPECIAL = "SPECIAL",
    SIGHT = "SIGHT",
    TOUCH = "TOUCH",
    SELF = "SELF",
}

export enum Component {
    V = "V",
    S = "S",
    M = "M",
}

export enum AreaOfEffectType {
    CUBE = "CUBE",
    CONE = "CONE",
    CYLINDER = "CYLINDER",
    LINE = "LINE",
    SPHERE = "SPHERE",
}

export enum ClassType {
    WIZARD = "WIZARD",
    SORCERER = "SORCERER",
    CLERIC = "CLERIC",
    PALADIN = "PALADIN",
    RANGER = "RANGER",
    BARD = "BARD",
    DRUID = "DRUID",
    WARLOCK = "WARLOCK",
}

export enum Subclass {
    LORE = "LORE",
    LAND = "LAND",
    LIFE = "LIFE",
    DEVOTION = "DEVOTION",
    FIEND = "FIEND",
}

export enum School {
    EVOCATION = "EVOCATION",
    CONJURATION = "CONJURATION",
    ABJURATION = "ABJURATION",
    TRANSMUTATION = "TRANSMUTATION",
    ENCHANTMENT = "ENCHANTMENT",
    NECROMANCY = "NECROMANCY",
    DIVINATION = "DIVINATION",
    ILLUSION = "ILLUSION",
}

export enum DamageType {
    ACID = "ACID",
    FORCE = "FORCE",
    BLUDGEONING = "BLUDGEONING",
    SLASHING = "SLASHING",
    NECROTIC = "NECROTIC",
    RADIANT = "RADIANT",
    FIRE = "FIRE",
    LIGHTNING = "LIGHTNING",
    POISON = "POISON",
    COLD = "COLD",
    PSYCHIC = "PSYCHIC",
    PIERCING = "PIERCING",
    THUNDER = "THUNDER",
}

export enum DifficultyClassSuccess {
    OTHER = "OTHER",
    NONE = "NONE",
    HALF = "HALF",
}

export enum Duration {
    INSTANTANEOUS = "INSTANTANEOUS",
    ONE_ROUND = "ONE_ROUND",
    ONE_MINUTE = "ONE_MINUTE",
    TEN_MINUTES = "TEN_MINUTES",
    ONE_HOUR = "ONE_HOUR",
    EIGHT_HOURS = "EIGHT_HOURS",
    TWENTY_FOUR_HOURS = "TWENTY_FOUR_HOURS",
    SEVEN_DAYS = "SEVEN_DAYS",
    TEN_DAYS = "TEN_DAYS",
    THIRTY_DAYS = "THIRTY_DAYS",
    UP_TO_ONE_ROUND = "UP_TO_ONE_ROUND",
    UP_TO_ONE_MINUTE = "UP_TO_ONE_MINUTE",
    UP_TO_TEN_MINUTES = "UP_TO_TEN_MINUTES",
    UP_TO_ONE_HOUR = "UP_TO_ONE_HOUR",
    UP_TO_EIGHT_HOURS = "UP_TO_EIGHT_HOURS",
    UP_TO_TWO_HOURS = "UP_TO_TWO_HOURS",
    UP_TO_TWENTY_FOUR_HOURS = "UP_TO_TWENTY_FOUR_HOURS",
    SPECIAL = "SPECIAL",
    UNTIL_DISPELLED = "UNTIL_DISPELLED",
}

export enum CastingTime {
    ONE_ACTION = "ONE_ACTION",
    ONE_REACTION = "ONE_REACTION",
    ONE_BONUS_ACTION = "ONE_BONUS_ACTION",
    ONE_MINUTE = "ONE_MINUTE",
    TEN_MINUTES = "TEN_MINUTES",
    ONE_HOUR = "ONE_HOUR",
    EIGHT_HOURS = "EIGHT_HOURS",
    TWELVE_HOURS = "TWELVE_HOURS",
    TWENTY_FOUR_HOURS = "TWENTY_FOUR_HOURS",
}

export enum AttackType {
    RANGED = "RANGED",
    MELEE = "MELEE",
}

const AreaOfEffectSchema = z.object({
    size: z.number(),
    type: z.nativeEnum(AreaOfEffectType),
});
export type AreaOfEffect = z.infer<typeof AreaOfEffectSchema>;

const ClassListSchema = z.array(z.nativeEnum(ClassType));
export type ClassList = z.infer<typeof ClassListSchema>;

const SubclassListSchema = z.array(z.nativeEnum(Subclass));
export type SubclassList = z.infer<typeof SubclassListSchema>;

const DamageSchema = z.object({
    type: z.nativeEnum(DamageType).optional().nullable(),
    slotLevel: z.record(z.coerce.number(), z.string()).optional().nullable(),
    characterLevel: z.record(z.coerce.number(), z.string()).optional().nullable(),
});
export type Damage = z.infer<typeof DamageSchema>;

const DbDifficultyClassSchema = z.object({
    type: z.nativeEnum(Ability),
    success: z.nativeEnum(DifficultyClassSuccess),
    descriptionId: z.number().optional().nullable(),
});
export type DbDifficultyClass = z.infer<typeof DbDifficultyClassSchema>;
const DifficultyClassSchema = z.object({
    type: z.nativeEnum(Ability),
    success: z.nativeEnum(DifficultyClassSuccess),
    description: TranslationSchema.optional().nullable(),
});
export type DifficultyClass = z.infer<typeof DifficultyClassSchema>;

const ComponentsSchema = z.array(z.nativeEnum(Component));
export type Components = z.infer<typeof ComponentsSchema>;

export const DbSpellSchema = z.object({
    index: z.string(),
    nameId: z.number(),
    descriptionId: z.number(),
    highLevelDescriptionId: z.number().optional().nullable(),
    range: z.nativeEnum(RangeType),
    components: ComponentsSchema,
    materialId: z.number().optional().nullable(),
    areaOfEffect: AreaOfEffectSchema.optional().nullable(),
    ritual: z.boolean(),
    duration: z.nativeEnum(Duration),
    concentration: z.boolean(),
    castingTime: z.nativeEnum(CastingTime),
    attackType: z.nativeEnum(AttackType).optional().nullable(),
    school: z.nativeEnum(School),
    classes: ClassListSchema,
    subclasses: SubclassListSchema,
    damage: DamageSchema.optional().nullable(),
    difficultyClass: DbDifficultyClassSchema.optional().nullable(),
    level: z.number(),
    icon: z.string(),
    color: z.nativeEnum(SpellColor),
});
export type DbSpell = z.infer<typeof DbSpellSchema>;

export const SpellSchema = z.object({
    index: z.string(),
    name: TranslationSchema,
    description: TranslationSchema,
    highLevelDescription: TranslationSchema.optional().nullable(),
    range: z.nativeEnum(RangeType),
    components: ComponentsSchema,
    material: TranslationSchema.optional().nullable(),
    areaOfEffect: AreaOfEffectSchema.optional().nullable(),
    ritual: z.boolean(),
    duration: z.nativeEnum(Duration),
    concentration: z.boolean(),
    castingTime: z.nativeEnum(CastingTime),
    attackType: z.nativeEnum(AttackType).optional().nullable(),
    school: z.nativeEnum(School),
    classes: ClassListSchema,
    subclasses: SubclassListSchema,
    damage: DamageSchema.optional().nullable(),
    difficultyClass: DifficultyClassSchema.optional().nullable(),
    level: z.number(),
    icon: z.string(),
    color: z.nativeEnum(SpellColor),
});
export type Spell = z.infer<typeof SpellSchema>;
