import { ZERO } from "@/type/Character";
import { Ability, ClassType } from "@/type/Spell";
import { PALADIN_SPELL_SLOTS, SpellSlots, WARLOCK_SPELL_SLOTS, WIZARD_SPELL_SLOTS } from "@/type/SpellSlots";
import { ArrayWith20Positions } from "@/type/utils";

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

export const getKnowSpellsAmount = (classType: ClassType, level: number) => {
    const map: Record<ClassType, ArrayWith20Positions<number>> = {
        [ClassType.WIZARD]: [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44],
        [ClassType.SORCERER]: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15],
        [ClassType.CLERIC]: ZERO,
        [ClassType.PALADIN]: ZERO,
        [ClassType.RANGER]: [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11],
        [ClassType.BARD]: [4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22],
        [ClassType.DRUID]: ZERO,
        [ClassType.WARLOCK]: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15],
    };

    const knownSpellsPerLevel = map[classType];
    return knownSpellsPerLevel[level - 1];
};

export const showKnownSection = (classType: ClassType) => {
    const map: Record<ClassType, boolean> = {
        [ClassType.WIZARD]: true,
        [ClassType.SORCERER]: true,
        [ClassType.CLERIC]: false,
        [ClassType.PALADIN]: false,
        [ClassType.RANGER]: true,
        [ClassType.BARD]: true,
        [ClassType.DRUID]: false,
        [ClassType.WARLOCK]: true,
    };

    return map[classType];
};

export const getPreparedSpellsAmount = (classType: ClassType, ability: number, level: number) => {
    const abilityModifier = Math.floor((ability - 10) / 2);

    const map: Record<ClassType, number> = {
        [ClassType.WIZARD]: Math.max(1, abilityModifier + level),
        [ClassType.SORCERER]: 0,
        [ClassType.CLERIC]: Math.max(1, abilityModifier + level),
        [ClassType.PALADIN]: Math.max(1, abilityModifier + Math.floor(level / 2)),
        [ClassType.RANGER]: 0,
        [ClassType.BARD]: 0,
        [ClassType.DRUID]: Math.max(1, abilityModifier + level),
        [ClassType.WARLOCK]: 0,
    };

    return map[classType];
};

export const showPreparedSection = (classType: ClassType) => {
    const amount = getPreparedSpellsAmount(classType, 0, 0);
    return amount > 0;
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
        [ClassType.WARLOCK]: WARLOCK_SPELL_SLOTS,
    };

    return map[classType][level - 1];
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

    return map[classType][level - 1];
};

export const getProficiencyBonus = (level: number) => {
    const proficiencyBonus: ArrayWith20Positions<number> = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6];
    return proficiencyBonus[level - 1];
};

export const getSaveDifficultyClass = (classType: ClassType, ability: number, level: number) => {
    const abilityModifier = Math.floor((ability - 10) / 2);

    const map: Record<ClassType, number> = {
        [ClassType.WIZARD]: 8 + getProficiencyBonus(level) + abilityModifier,
        [ClassType.SORCERER]: 8 + getProficiencyBonus(level) + abilityModifier,
        [ClassType.CLERIC]: 8 + getProficiencyBonus(level) + abilityModifier,
        [ClassType.PALADIN]: 8 + getProficiencyBonus(level) + abilityModifier,
        [ClassType.RANGER]: 8 + getProficiencyBonus(level) + abilityModifier,
        [ClassType.BARD]: 8 + getProficiencyBonus(level) + abilityModifier,
        [ClassType.DRUID]: 8 + getProficiencyBonus(level) + abilityModifier,
        [ClassType.WARLOCK]: 8 + getProficiencyBonus(level) + abilityModifier,
    };

    return map[classType];
};

export const getSpellAttackModifier = (classType: ClassType, ability: number, level: number) => {
    const abilityModifier = Math.floor((ability - 10) / 2);

    const map: Record<ClassType, number> = {
        [ClassType.WIZARD]: getProficiencyBonus(level) + abilityModifier,
        [ClassType.SORCERER]: getProficiencyBonus(level) + abilityModifier,
        [ClassType.CLERIC]: getProficiencyBonus(level) + abilityModifier,
        [ClassType.PALADIN]: getProficiencyBonus(level) + abilityModifier,
        [ClassType.RANGER]: getProficiencyBonus(level) + abilityModifier,
        [ClassType.BARD]: getProficiencyBonus(level) + abilityModifier,
        [ClassType.DRUID]: getProficiencyBonus(level) + abilityModifier,
        [ClassType.WARLOCK]: getProficiencyBonus(level) + abilityModifier,
    };

    return map[classType];
};

export const getClassColor = (classType: ClassType) => {
    const map: Record<ClassType, string> = {
        [ClassType.WIZARD]: "text-sky-500/90 dark:text-sky-500/90",
        [ClassType.SORCERER]: "text-pink-500/90 dark:text-pink-500/90",
        [ClassType.CLERIC]: "text-yellow-500/90 dark:text-yellow-500/90",
        [ClassType.PALADIN]: "text-red-500/90 dark:text-red-500/90",
        [ClassType.RANGER]: "text-amber-500/90 dark:text-amber-500/90",
        [ClassType.BARD]: "text-teal-500/90 dark:text-teal-500/90",
        [ClassType.DRUID]: "text-lime-500/90 dark:text-lime-500/90",
        [ClassType.WARLOCK]: "text-fuchsia-500/90 dark:text-fuchsia-500/90",
    };

    return map[classType];
};

export const getClassColorOnHover = (classType: ClassType) => {
    const map: Record<ClassType, string> = {
        [ClassType.WIZARD]: "mouse:transition-colors mouse:hover:text-sky-500/90 mouse:group-hover:text-sky-500/90",
        [ClassType.SORCERER]: "mouse:transition-colors mouse:hover:text-pink-500/90 mouse:group-hover:text-pink-500/90",
        [ClassType.CLERIC]:
            "mouse:transition-colors mouse:hover:text-yellow-500/90 mouse:group-hover:text-yellow-500/90",
        [ClassType.PALADIN]: "mouse:transition-colors mouse:hover:text-red-500/90 mouse:group-hover:text-red-500/90",
        [ClassType.RANGER]: "mouse:transition-colors mouse:hover:text-amber-500/90 mouse:group-hover:text-amber-500/90",
        [ClassType.BARD]: "mouse:transition-colors mouse:hover:text-teal-500/90 mouse:group-hover:text-teal-500/90",
        [ClassType.DRUID]: "mouse:transition-colors mouse:hover:text-lime-500/90 mouse:group-hover:text-lime-500/90",
        [ClassType.WARLOCK]:
            "mouse:transition-colors mouse:hover:text-fuchsia-500/90 mouse:group-hover:text-fuchsia-500/90",
    };

    return map[classType];
};

export const getClassBackgroundColor = (classType: ClassType) => {
    const map: Record<ClassType, string> = {
        [ClassType.WIZARD]: "bg-sky-500/90 dark:bg-sky-500/90",
        [ClassType.SORCERER]: "bg-pink-500/90 dark:bg-pink-500/90",
        [ClassType.CLERIC]: "bg-yellow-500/90 dark:bg-yellow-500/90",
        [ClassType.PALADIN]: "bg-red-500/90 dark:bg-red-500/90",
        [ClassType.RANGER]: "bg-amber-500/90 dark:bg-amber-500/90",
        [ClassType.BARD]: "bg-teal-500/90 dark:bg-teal-500/90",
        [ClassType.DRUID]: "bg-lime-500/90 dark:bg-lime-500/90",
        [ClassType.WARLOCK]: "bg-fuchsia-500/90 dark:bg-fuchsia-500/90",
    };

    return map[classType];
};

export const getClassBackgroundColorOnHover = (classType: ClassType) => {
    const map: Record<ClassType, string> = {
        [ClassType.WIZARD]:
            "mouse:transition-colors mouse:hover:bg-sky-500/80 mouse:hover:dark:bg-sky-500/80 mouse:group-hover:bg-sky-500/80 mouse:group-hover:dark:bg-sky-500/80",
        [ClassType.SORCERER]:
            "mouse:transition-colors mouse:hover:bg-pink-500/80 mouse:hover:dark:bg-pink-500/80 mouse:group-hover:bg-pink-500/80 mouse:group-hover:dark:bg-pink-500/80",
        [ClassType.CLERIC]:
            "mouse:transition-colors mouse:hover:bg-yellow-500/80 mouse:hover:dark:bg-yellow-500/80 mouse:group-hover:bg-yellow-500/80 mouse:group-hover:dark:bg-yellow-500/80",
        [ClassType.PALADIN]:
            "mouse:transition-colors mouse:hover:bg-red-500/80 mouse:hover:dark:bg-red-500/80 mouse:group-hover:bg-red-500/80 mouse:group-hover:dark:bg-red-500/80",
        [ClassType.RANGER]:
            "mouse:transition-colors mouse:hover:bg-amber-500/80 mouse:hover:dark:bg-amber-500/80 mouse:group-hover:bg-amber-500/80 mouse:group-hover:dark:bg-amber-500/80",
        [ClassType.BARD]:
            "mouse:transition-colors mouse:hover:bg-teal-500/80 mouse:hover:dark:bg-teal-500/80 mouse:group-hover:bg-teal-500/80 mouse:group-hover:dark:bg-teal-500/80",
        [ClassType.DRUID]:
            "mouse:transition-colors mouse:hover:bg-lime-500/80 mouse:hover:dark:bg-lime-500/80 mouse:group-hover:bg-lime-500/80 mouse:group-hover:dark:bg-lime-500/80",
        [ClassType.WARLOCK]:
            "mouse:transition-colors mouse:hover:bg-fuchsia-500/80 mouse:hover:dark:bg-fuchsia-500/80 mouse:group-hover:bg-fuchsia-500/80 mouse:group-hover:dark:bg-fuchsia-500/80",
    };

    return map[classType];
};

export const getClassBorderColor = (classType: ClassType) => {
    const map: Record<ClassType, string> = {
        [ClassType.WIZARD]: "border-sky-500/90 dark:border-sky-500/90",
        [ClassType.SORCERER]: "border-pink-500/90 dark:border-pink-500/90",
        [ClassType.CLERIC]: "border-yellow-500/90 dark:border-yellow-500/90",
        [ClassType.PALADIN]: "border-red-500/90 dark:border-red-500/90",
        [ClassType.RANGER]: "border-amber-500/90 dark:border-amber-500/90",
        [ClassType.BARD]: "border-teal-500/90 dark:border-teal-500/90",
        [ClassType.DRUID]: "border-lime-500/90 dark:border-lime-500/90",
        [ClassType.WARLOCK]: "border-fuchsia-500/90 dark:border-fuchsia-500/90",
    };

    return map[classType];
};
