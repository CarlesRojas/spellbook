import { ClassType, DifficultyClassType } from "@/type/Spell";
import { ArrayWith20Positions } from "@/type/utils";
import { z } from "zod";

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

export const SpellBookSchema = z.object({
    id: z.number(),
    characterLevel: z.number().min(0).max(20),
    availableSpellSlots: SpellSlotsSchema,
});
export type SpellBook = z.infer<typeof SpellBookSchema>;

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

export const classSpellSlotsByLevel: Record<ClassType, ArrayWith20Positions<SpellSlots>> = {
    [ClassType.BARD]: WIZARD_SPELL_SLOTS,
    [ClassType.CLERIC]: WIZARD_SPELL_SLOTS,
    [ClassType.DRUID]: WIZARD_SPELL_SLOTS,
    [ClassType.SORCERER]: WIZARD_SPELL_SLOTS,
    [ClassType.WIZARD]: WIZARD_SPELL_SLOTS,
    [ClassType.PALADIN]: PALADIN_SPELL_SLOTS,
    [ClassType.RANGER]: PALADIN_SPELL_SLOTS,
    [ClassType.WARLOCK]: WARLOCK_SPELL_SLOTS,
};

// CLERIC
// At long rest can prepare spells equal to WIS modifier + cleric level

interface ClassInfo {
    spellSlots: ArrayWith20Positions<SpellSlots>;
    cantripsPerLevel?: ArrayWith20Positions<number>;
    proficiencyBonus: ArrayWith20Positions<number>;
    knownSpells: "CLASS" | "SPELLBOOK" | ArrayWith20Positions<number>;
    preparedSpellsAmount?: DifficultyClassType;
    spellCastingAbility: DifficultyClassType;
    difficultyClass: DifficultyClassType;
    attackModifier: DifficultyClassType;
    ritual: boolean;
    spellSlotCostInSorceryPoints?: number[];
    sorceryPoints?: ArrayWith20Positions<number>;
}

// ALL (Class) - SPELLBOOK - PREPARED
export const WIZARD: ClassInfo = {
    spellSlots: WIZARD_SPELL_SLOTS,
    cantripsPerLevel: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], // Prepare from all Wizard Cantrips
    proficiencyBonus: [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6],
    knownSpells: "SPELLBOOK", // Spellbook contains list of known spells
    preparedSpellsAmount: DifficultyClassType.INT, // + character level
    spellCastingAbility: DifficultyClassType.INT,
    difficultyClass: DifficultyClassType.INT, // + Proficiency Bonus + 8
    attackModifier: DifficultyClassType.INT, // + Proficiency Bonus
    ritual: true, // No need to prepare
};

// ALL (Class) - KNOWN
export const SORCERER: ClassInfo = {
    spellSlots: WIZARD_SPELL_SLOTS,
    cantripsPerLevel: [4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6], // Prepare from all Wizard Cantrips
    proficiencyBonus: [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6],
    knownSpells: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15],
    preparedSpellsAmount: undefined, // No need to prepare spells
    spellCastingAbility: DifficultyClassType.CHA,
    difficultyClass: DifficultyClassType.CHA, // + Proficiency Bonus + 8
    attackModifier: DifficultyClassType.CHA, // + Proficiency Bonus
    ritual: false, // No need to prepare
    spellSlotCostInSorceryPoints: [2, 3, 5, 6, 7],
    sorceryPoints: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
};

// ALL (Class) - PREPARED + DOMAIN
export const CLERIC: ClassInfo = {
    spellSlots: WIZARD_SPELL_SLOTS,
    cantripsPerLevel: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    proficiencyBonus: [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6],
    knownSpells: "CLASS",
    preparedSpellsAmount: DifficultyClassType.WIS, // + character level + Domain
    spellCastingAbility: DifficultyClassType.WIS,
    difficultyClass: DifficultyClassType.WIS, // + Proficiency Bonus
    ritual: true,
    attackModifier: DifficultyClassType.WIS,
};

// ALL (Class) - KNOWN
export const RANGER: ClassInfo = {
    spellSlots: PALADIN_SPELL_SLOTS,
    cantripsPerLevel: undefined, // Can't use cantrips
    proficiencyBonus: [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6],
    knownSpells: [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11],
    preparedSpellsAmount: undefined, // No need to prepare spells
    spellCastingAbility: DifficultyClassType.WIS,
    difficultyClass: DifficultyClassType.WIS, // + Proficiency Bonus
    ritual: false,
    attackModifier: DifficultyClassType.WIS,
};

// ALL (Class) - PREPARED + OATH
export const PALADIN: ClassInfo = {
    spellSlots: PALADIN_SPELL_SLOTS,
    cantripsPerLevel: undefined, // Can't use cantrips
    proficiencyBonus: [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6],
    knownSpells: "CLASS",
    preparedSpellsAmount: DifficultyClassType.CHA, // + floor(character level / 2)  + Oath
    spellCastingAbility: DifficultyClassType.CHA,
    difficultyClass: DifficultyClassType.CHA, // + Proficiency Bonus
    ritual: false,
    attackModifier: DifficultyClassType.CHA,
};

// ALL (Class) - KNOWN
export const WARLOCK: ClassInfo = {
    spellSlots: WARLOCK_SPELL_SLOTS, // Can regain all spent spell slots using Eldritch Master
    cantripsPerLevel: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    proficiencyBonus: [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6],
    knownSpells: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15],
    preparedSpellsAmount: undefined, // No need to prepare spells
    spellCastingAbility: DifficultyClassType.CHA,
    difficultyClass: DifficultyClassType.CHA, // + Proficiency Bonus
    ritual: false,
    attackModifier: DifficultyClassType.CHA,
};

// ALL (Class) - PREPARED
export const DRUID: ClassInfo = {
    spellSlots: WIZARD_SPELL_SLOTS, 
    cantripsPerLevel: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    proficiencyBonus: [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6],
    knownSpells: "CLASS",
    preparedSpellsAmount: DifficultyClassType.WIS, // + character level
    spellCastingAbility: DifficultyClassType.WIS,
    difficultyClass: DifficultyClassType.WIS, // + Proficiency Bonus
    ritual: true,
    attackModifier: DifficultyClassType.WIS,
};


// ALL (Class) - KNOWN
export const BARD: ClassInfo = {
    spellSlots: WIZARD_SPELL_SLOTS, 
    cantripsPerLevel: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    proficiencyBonus: [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6],
    knownSpells: [4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22],,
    preparedSpellsAmount: undefined, // No need to prepare spells
    spellCastingAbility: DifficultyClassType.CHA,
    difficultyClass: DifficultyClassType.CHA, // + Proficiency Bonus
    ritual: true,
    attackModifier: DifficultyClassType.CHA,
};
