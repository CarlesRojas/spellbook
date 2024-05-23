import { ZERO } from "@/type/Character";
import { Ability, ClassType } from "@/type/Spell";
import { PALADIN_SPELL_SLOTS, SpellSlots, WARLOCK_SPELL_SLOTS, WIZARD_SPELL_SLOTS } from "@/type/SpellSlots";
import { ArrayWith20Positions } from "@/type/utils";

// TODO Sorcerer swap spell slots and sorcery points
// export const SORCERER = {
//     spellSlotCostInSorceryPoints: [2, 3, 5, 6, 7],
//     sorceryPoints: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
// };

export const getAbility = (classType: ClassType) => {
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

    return map[classType];
};

export const getKnowSpells = (classType: ClassType, level: number) => {
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

    const knownSpellsPerLevel = map[classType];
    return knownSpellsPerLevel ? knownSpellsPerLevel[level] : null;
};

export const getPreparedSpellsAmount = (classType: ClassType, ability: number, level: number) => {
    const map: Record<ClassType, number> = {
        [ClassType.WIZARD]: Math.max(1, ability + level),
        [ClassType.SORCERER]: 0,
        [ClassType.CLERIC]: Math.max(1, ability + level), // + DOMAIN (That do not count)
        [ClassType.PALADIN]: Math.max(1, ability + Math.floor(level / 2)), // + OATH (That do not count)
        [ClassType.RANGER]: 0,
        [ClassType.BARD]: 0,
        [ClassType.DRUID]: Math.max(1, ability + level),
        [ClassType.WARLOCK]: 0,
    };

    return map[classType];
};

export const getTotalSpellSlots = (classType: ClassType, level: number) => {
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

    return map[classType][level];
};

export const getCantripsAmount = (classType: ClassType, level: number) => {
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

    return map[classType][level];
};

export const getProficiencyBonus = (level: number) => {
    const proficiencyBonus: ArrayWith20Positions<number> = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6];
    return proficiencyBonus[level];
};

export const canCastRituals = (classType: ClassType) => {
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

    return map[classType];
};
