import { z } from "zod";

export enum ComponentType {
    V = "V",
    S = "S",
    M = "M",
}

export enum AreaOfEffectType {
    CUBE = "cube",
    CONE = "cone",
    CYLINDER = "cylinder",
    LINE = "line",
    SPHERE = "sphere",
}

export enum ClassType {
    WIZARD = "wizard",
    SORCERER = "sorcerer",
    CLERIC = "cleric",
    PALADIN = "paladin",
    RANGER = "ranger",
    BARD = "bard",
    DRUID = "druid",
    WARLOCK = "warlock",
}

export enum SubclassType {
    LORE = "lore",
    LAND = "land",
    LIFE = "life",
    DEVOTION = "devotion",
    FIEND = "fiend",
}

export enum SchoolType {
    EVOCATION = "evocation",
    CONJURATION = "conjuration",
    ABJURATION = "abjuration",
    TRANSMUTATION = "transmutation",
    ENCHANTMENT = "enchantment",
    NECROMANCY = "necromancy",
    DIVINATION = "divination",
    ILLUSION = "illusion",
}

export enum DamageType {
    ACID = "acid",
    FORCE = "force",
    BLUDGEONING = "bludgeoning",
    SLASHING = "slashing",
    NECROTIC = "necrotic",
    RADIANT = "radiant",
    FIRE = "fire",
    LIGHTNING = "lightning",
    POISON = "poison",
    COLD = "cold",
    PSYCHIC = "psychic",
    PIERCING = "piercing",
    THUNDER = "thunder",
}

export enum DifficultyClassType {
    DEX = "dex",
    WIS = "wis",
    CHA = "cha",
    CON = "con",
    INT = "int",
    STR = "str",
}

const AreaOfEffectSchema = z.object({
    size: z.number(),
    type: z.nativeEnum(AreaOfEffectType),
});
export type AreaOfEffect = z.infer<typeof AreaOfEffectSchema>;

const SchoolSchema = z.object({
    index: z.nativeEnum(SchoolType),
    name: z.string(),
    level: z.number().optional(),
});
export type School = z.infer<typeof SchoolSchema>;

const ClassSchema = z.object({
    index: z.nativeEnum(ClassType),
    name: z.string(),
    level: z.number().optional(),
});
export type Class = z.infer<typeof ClassSchema>;

const SubclassSchema = z.object({
    index: z.nativeEnum(SubclassType),
    name: z.string(),
    level: z.number().optional(),
});
export type Subclass = z.infer<typeof SubclassSchema>;

const DamageSchema = z.object({
    type: z
        .object({
            index: z.nativeEnum(DamageType),
            name: z.string(),
        })
        .optional(),
    slotLevel: z.record(z.coerce.number(), z.string()).optional(),
    characterLevel: z.record(z.coerce.number(), z.string()).optional(),
});
export type Damage = z.infer<typeof DamageSchema>;

const DifficultyClassSchema = z.object({
    type: z.object({
        index: z.nativeEnum(DifficultyClassType),
        name: z.string(),
    }),
    success: z.string(),
    description: z.string().optional(),
});
export type DifficultyClass = z.infer<typeof DifficultyClassSchema>;

const ComponentsSchema = z.array(z.nativeEnum(ComponentType));
export type Components = z.infer<typeof ComponentsSchema>;

export const SpellSchema = z.object({
    index: z.string(),
    name: z.string(),
    description: z.array(z.string()),
    highLevelDescription: z.array(z.string()),
    range: z.string(),
    components: z.array(z.nativeEnum(ComponentType)),
    material: z.string().optional(),
    areaOfEffect: AreaOfEffectSchema.optional(),
    ritual: z.boolean(),
    duration: z.string(),
    concentration: z.boolean(),
    castingTime: z.string(),
    attackType: z.string().optional(),
    school: SchoolSchema,
    classes: z.array(ClassSchema),
    subclasses: z.array(SubclassSchema),
    damage: DamageSchema.optional(),
    difficultyClass: DifficultyClassSchema.optional(),
    level: z.number(),
});
export type Spell = z.infer<typeof SpellSchema>;
