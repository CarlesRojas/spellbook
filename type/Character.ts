import { ClassType, SpellSchema } from "@/type/Spell";
import { ArrayWith20Positions } from "@/type/utils";
import { z } from "zod";

export enum Ability {
    STR = "STR",
    DEX = "DEX",
    CON = "CON",
    INT = "INT",
    WIS = "WIS",
    CHA = "CHA",
}

export const SpellSlotsSchema = z.object({
    level1: z.number(),
    level2: z.number(),
    level3: z.number(),
    level4: z.number(),
    level5: z.number(),
    level6: z.number(),
    level7: z.number(),
    level8: z.number(),
    level9: z.number(),
});
export type SpellSlots = z.infer<typeof SpellSlotsSchema>;

export const CharacterSchema = z.object({
    id: z.number(),

    name: z.string(),
    level: z.number().min(0).max(20),
    class: z.nativeEnum(ClassType),
    ability: z.number(),

    knownSpells: z.array(SpellSchema),
    preparedSpells: z.array(SpellSchema),
    spellSlotsAvailable: SpellSlotsSchema,
    knownCantrips: z.array(SpellSlotsSchema),
});
export type Character = z.infer<typeof CharacterSchema>;

const WIZARD_SPELL_SLOTS: ArrayWith20Positions<SpellSlots> = [
    { level1: 2, level2: 0, level3: 0, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 3, level2: 0, level3: 0, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 2, level3: 0, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 0, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 2, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 3, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 3, level4: 1, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 3, level4: 2, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 3, level4: 3, level5: 1, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 3, level4: 3, level5: 2, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 3, level4: 3, level5: 2, level6: 1, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 3, level4: 3, level5: 2, level6: 1, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 3, level4: 3, level5: 2, level6: 1, level7: 1, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 3, level4: 3, level5: 2, level6: 1, level7: 1, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 3, level4: 3, level5: 2, level6: 1, level7: 1, level8: 1, level9: 0 },
    { level1: 4, level2: 3, level3: 3, level4: 3, level5: 2, level6: 1, level7: 1, level8: 1, level9: 0 },
    { level1: 4, level2: 3, level3: 3, level4: 3, level5: 2, level6: 1, level7: 1, level8: 1, level9: 1 },
    { level1: 4, level2: 3, level3: 3, level4: 3, level5: 3, level6: 1, level7: 1, level8: 1, level9: 1 },
    { level1: 4, level2: 3, level3: 3, level4: 3, level5: 3, level6: 2, level7: 1, level8: 1, level9: 1 },
    { level1: 4, level2: 3, level3: 3, level4: 3, level5: 3, level6: 2, level7: 2, level8: 1, level9: 1 },
];

const PALADIN_SPELL_SLOTS: ArrayWith20Positions<SpellSlots> = [
    { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 2, level2: 0, level3: 0, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 3, level2: 0, level3: 0, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 3, level2: 0, level3: 0, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 2, level3: 0, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 2, level3: 0, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 0, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 0, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 2, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 2, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 3, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 3, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 3, level4: 1, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 3, level4: 1, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 3, level4: 2, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 3, level4: 2, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 3, level4: 3, level5: 1, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 3, level4: 3, level5: 1, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 3, level4: 3, level5: 2, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 4, level2: 3, level3: 3, level4: 3, level5: 2, level6: 0, level7: 0, level8: 0, level9: 0 },
];

const WARLOCK_SPELL_SLOTS: ArrayWith20Positions<SpellSlots> = [
    { level1: 1, level2: 0, level3: 0, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 2, level2: 0, level3: 0, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 0, level2: 2, level3: 0, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 0, level2: 2, level3: 0, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 0, level2: 0, level3: 2, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 0, level2: 0, level3: 2, level4: 0, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 0, level2: 0, level3: 0, level4: 2, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 0, level2: 0, level3: 0, level4: 2, level5: 0, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 0, level2: 0, level3: 0, level4: 0, level5: 2, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 0, level2: 0, level3: 0, level4: 0, level5: 2, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 0, level2: 0, level3: 0, level4: 0, level5: 3, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 0, level2: 0, level3: 0, level4: 0, level5: 3, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 0, level2: 0, level3: 0, level4: 0, level5: 3, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 0, level2: 0, level3: 0, level4: 0, level5: 3, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 0, level2: 0, level3: 0, level4: 0, level5: 3, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 0, level2: 0, level3: 0, level4: 0, level5: 3, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 0, level2: 0, level3: 0, level4: 0, level5: 4, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 0, level2: 0, level3: 0, level4: 0, level5: 4, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 0, level2: 0, level3: 0, level4: 0, level5: 4, level6: 0, level7: 0, level8: 0, level9: 0 },
    { level1: 0, level2: 0, level3: 0, level4: 0, level5: 4, level6: 0, level7: 0, level8: 0, level9: 0 },
];

const ZERO: ArrayWith20Positions<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// TODO Sorcerer swap spell slots and sorcery points
// export const SORCERER = {
//     spellSlotCostInSorceryPoints: [2, 3, 5, 6, 7],
//     sorceryPoints: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
// };

export const getAbility = (character: Character) => {
    const map: Record<ClassType, Ability> = {
        [ClassType.WIZARD]: Ability.INT,
        [ClassType.SORCERER]: Ability.CHA,
        [ClassType.CLERIC]: Ability.WIS,
        [ClassType.PALADIN]: Ability.CHA,
        [ClassType.RANGER]: Ability.WIS,
        [ClassType.BARD]: Ability.CHA,
        [ClassType.DRUID]: Ability.WIS,
        [ClassType.WARLOCK]: Ability.CHA,
    };

    return map[character.class];
};

export const getKnowSpells = (character: Character) => {
    const map: Record<ClassType, ArrayWith20Positions<number> | null> = {
        [ClassType.WIZARD]: null, // ALL - SPELLBOOK - PREPARED
        [ClassType.SORCERER]: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15], // ALL - KNOWN
        [ClassType.CLERIC]: ZERO, // ALL - PREPARED (DOMAIN)
        [ClassType.PALADIN]: ZERO, // ALL - PREPARED (OATH)
        [ClassType.RANGER]: [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11], // ALL - KNOWN
        [ClassType.BARD]: [4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22], // ALL - KNOWN
        [ClassType.DRUID]: ZERO, // ALL - PREPARED
        [ClassType.WARLOCK]: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15], // ALL - KNOWN
    };

    const knownSpellsPerLevel = map[character.class];
    return knownSpellsPerLevel ? knownSpellsPerLevel[character.level] : null;
};

export const getPreparedSpellsAmount = (character: Character) => {
    const map: Record<ClassType, number> = {
        [ClassType.WIZARD]: Math.max(1, character.ability + character.level),
        [ClassType.SORCERER]: 0,
        [ClassType.CLERIC]: Math.max(1, character.ability + character.level), // + DOMAIN (That do not count)
        [ClassType.PALADIN]: Math.max(1, character.ability + Math.floor(character.level / 2)), // + OATH (That do not count)
        [ClassType.RANGER]: 0,
        [ClassType.BARD]: 0,
        [ClassType.DRUID]: Math.max(1, character.ability + character.level),
        [ClassType.WARLOCK]: 0,
    };

    return map[character.class];
};

export const getTotalSpellSlots = (character: Character) => {
    const map: Record<ClassType, ArrayWith20Positions<SpellSlots>> = {
        [ClassType.WIZARD]: WIZARD_SPELL_SLOTS,
        [ClassType.SORCERER]: WIZARD_SPELL_SLOTS,
        [ClassType.CLERIC]: WIZARD_SPELL_SLOTS,
        [ClassType.PALADIN]: PALADIN_SPELL_SLOTS,
        [ClassType.RANGER]: PALADIN_SPELL_SLOTS,
        [ClassType.BARD]: WIZARD_SPELL_SLOTS,
        [ClassType.DRUID]: WIZARD_SPELL_SLOTS,
        [ClassType.WARLOCK]: WARLOCK_SPELL_SLOTS, // Can regain all spent spell slots using Eldritch Master
    };

    return map[character.class][character.level];
};

export const getCantripsAmount = (character: Character) => {
    const map: Record<ClassType, ArrayWith20Positions<number>> = {
        [ClassType.WIZARD]: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        [ClassType.SORCERER]: [4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [ClassType.CLERIC]: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        [ClassType.PALADIN]: ZERO,
        [ClassType.RANGER]: ZERO,
        [ClassType.BARD]: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [ClassType.DRUID]: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [ClassType.WARLOCK]: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    };

    return map[character.class][character.level];
};

export const getProficiencyBonus = (character: Character) => {
    const proficiencyBonus: ArrayWith20Positions<number> = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6];
    return proficiencyBonus[character.level];
};

export const canCastRituals = (character: Character) => {
    const map: Record<ClassType, boolean> = {
        [ClassType.WIZARD]: true, // SPELLBOOK
        [ClassType.SORCERER]: false,
        [ClassType.CLERIC]: true, // PREPARED
        [ClassType.PALADIN]: false,
        [ClassType.RANGER]: false,
        [ClassType.BARD]: true, // KNOWN
        [ClassType.DRUID]: true, // PREPARED
        [ClassType.WARLOCK]: false, // Book of Ancient Secrets lets you cast rituals
    };

    return map[character.class];
};
