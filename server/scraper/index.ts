import { createSpell, existsSpell } from "@/server/repo/spell";
import { createTranslation, translate } from "@/server/repo/translation";
import { Ability } from "@/type/Character";
import { Language } from "@/type/Language";
import {
    AreaOfEffect,
    AreaOfEffectType,
    AttackType,
    CastingTime,
    ClassType,
    Damage,
    DamageType,
    DbDifficultyClass,
    DbSpell,
    DbSpellSchema,
    DifficultyClassSuccess,
    Duration,
    RangeType,
    School,
    SpellColor,
    Subclass,
} from "@/type/Spell";
import { spellIndexes } from "./spells";

const rangeMap: Record<string, RangeType> = {
    "5 feet": RangeType.FIVE_FEET,
    "10 feet": RangeType.TEN_FEET,
    "30 feet": RangeType.THIRTY_FEET,
    "60 feet": RangeType.SIXTY_FEET,
    "90 feet": RangeType.NINETY_FEET,
    "100 feet": RangeType.HUNDRED_FEET,
    "120 feet": RangeType.HUNDRED_AND_TWENTY_FEET,
    "150 feet": RangeType.HUNDRED_AND_FIFTY_FEET,
    "300 feet": RangeType.THREE_HUNDRED_FEET,
    "500 feet": RangeType.FIVE_HUNDRED_FEET,
    "1 mile": RangeType.ONE_MILE,
    "500 miles": RangeType.FIVE_HUNDRED_MILES,
    Unlimited: RangeType.UNLIMITED,
    Special: RangeType.SPECIAL,
    Sight: RangeType.SIGHT,
    Touch: RangeType.TOUCH,
    Self: RangeType.SELF,
};

const areaOfEffectMap: Record<string, AreaOfEffectType> = {
    cube: AreaOfEffectType.CUBE,
    cone: AreaOfEffectType.CONE,
    cylinder: AreaOfEffectType.CYLINDER,
    line: AreaOfEffectType.LINE,
    sphere: AreaOfEffectType.SPHERE,
};

const classMap: Record<string, ClassType> = {
    wizard: ClassType.WIZARD,
    sorcerer: ClassType.SORCERER,
    cleric: ClassType.CLERIC,
    paladin: ClassType.PALADIN,
    ranger: ClassType.RANGER,
    bard: ClassType.BARD,
    druid: ClassType.DRUID,
    warlock: ClassType.WARLOCK,
};

const subclassMap: Record<string, Subclass> = {
    lore: Subclass.LORE,
    land: Subclass.LAND,
    life: Subclass.LIFE,
    devotion: Subclass.DEVOTION,
    fiend: Subclass.FIEND,
};

const schoolMap: Record<string, School> = {
    evocation: School.EVOCATION,
    conjuration: School.CONJURATION,
    abjuration: School.ABJURATION,
    transmutation: School.TRANSMUTATION,
    enchantment: School.ENCHANTMENT,
    necromancy: School.NECROMANCY,
    divination: School.DIVINATION,
    illusion: School.ILLUSION,
};

const damageTypeMap: Record<string, DamageType> = {
    acid: DamageType.ACID,
    force: DamageType.FORCE,
    bludgeoning: DamageType.BLUDGEONING,
    slashing: DamageType.SLASHING,
    necrotic: DamageType.NECROTIC,
    radiant: DamageType.RADIANT,
    fire: DamageType.FIRE,
    lightning: DamageType.LIGHTNING,
    poison: DamageType.POISON,
    cold: DamageType.COLD,
    psychic: DamageType.PSYCHIC,
    piercing: DamageType.PIERCING,
    thunder: DamageType.THUNDER,
};

const difficultyClassTypeMap: Record<string, Ability> = {
    dex: Ability.DEX,
    wis: Ability.WIS,
    cha: Ability.CHA,
    con: Ability.CON,
    int: Ability.INT,
    str: Ability.STR,
};

const difficultyClassSuccessMap: Record<string, DifficultyClassSuccess> = {
    other: DifficultyClassSuccess.OTHER,
    none: DifficultyClassSuccess.NONE,
    half: DifficultyClassSuccess.HALF,
};

const durationMap: Record<string, Duration> = {
    Instantaneous: Duration.INSTANTANEOUS,
    "1 round": Duration.ONE_ROUND,
    "1 minute": Duration.ONE_MINUTE,
    "10 minutes": Duration.TEN_MINUTES,
    "1 hour": Duration.ONE_HOUR,
    "8 hours": Duration.EIGHT_HOURS,
    "24 hours": Duration.TWENTY_FOUR_HOURS,
    "7 days": Duration.SEVEN_DAYS,
    "10 days": Duration.TEN_DAYS,
    "30 days": Duration.THIRTY_DAYS,
    "Up to 1 round": Duration.UP_TO_ONE_ROUND,
    "Up to 1 minute": Duration.UP_TO_ONE_MINUTE,
    "Up to 10 minutes": Duration.UP_TO_TEN_MINUTES,
    "Up to 1 hour": Duration.UP_TO_ONE_HOUR,
    "Up to 8 hours": Duration.UP_TO_EIGHT_HOURS,
    "Up to 2 hours": Duration.UP_TO_TWO_HOURS,
    "Up to 24 hours": Duration.UP_TO_TWENTY_FOUR_HOURS,
    Special: Duration.SPECIAL,
    "Until dispelled": Duration.UNTIL_DISPELLED,
};

const castingTimeMap: Record<string, CastingTime> = {
    "1 action": CastingTime.ONE_ACTION,
    "1 reaction": CastingTime.ONE_REACTION,
    "1 bonus action": CastingTime.ONE_BONUS_ACTION,
    "1 minute": CastingTime.ONE_MINUTE,
    "10 minutes": CastingTime.TEN_MINUTES,
    "1 hour": CastingTime.ONE_HOUR,
    "8 hours": CastingTime.EIGHT_HOURS,
    "12 hours": CastingTime.TWELVE_HOURS,
    "24 hours": CastingTime.TWENTY_FOUR_HOURS,
};

const attackTypeMap: Record<string, AttackType> = {
    ranged: AttackType.RANGED,
    melee: AttackType.MELEE,
};

const createNewTranslation = async (text: string, parseToHtml = false) => {
    const en = await translate({ text, language: Language.EN, parseToHtml });
    if (!en) return null;

    const es = await translate({ text: en, language: Language.ES, parseToHtml });
    if (!es) return null;

    const translationId = await createTranslation({ en, es });
    return translationId ?? undefined;
};

const createTranslationForArray = async (texts: string[]) => {
    const joinedTranslations = texts.join("<br/>");

    return await createNewTranslation(joinedTranslations, true);
};

const getSpellInformation = async (spellId: string): Promise<DbSpell> => {
    const res = await fetch(`https://www.dnd5eapi.co/api/spells/${spellId}`);
    const data = await res.json();

    try {
        const areaOfEffect: AreaOfEffect | undefined = data.area_of_effect
            ? {
                  size: data.area_of_effect.size,
                  type: areaOfEffectMap[data.area_of_effect.type],
              }
            : undefined;

        const damage: Damage | undefined = data.damage
            ? {
                  type: data.damage.damage_type ? damageTypeMap[data.damage.damage_type] : undefined,
                  slotLevel: data.damage?.damage_at_slot_level,
                  characterLevel: data.damage?.damage_at_character_level,
              }
            : undefined;

        const difficultyClass: DbDifficultyClass | undefined = data.dc
            ? {
                  type: difficultyClassTypeMap[data.dc.dc_type.index],
                  success: difficultyClassSuccessMap[data.dc.dc_success],
                  descriptionId: data.dc.desc ? await createNewTranslation(data.dc.desc) : undefined,
              }
            : undefined;

        const spell = DbSpellSchema.parse({
            index: data.index,
            nameId: await createNewTranslation(data.name),
            descriptionId: data.desc && data.desc.length > 0 ? await createTranslationForArray(data.desc) : undefined,
            highLevelDescriptionId:
                data.higher_level && data.higher_level.length > 0
                    ? await createTranslationForArray(data.higher_level)
                    : undefined,
            range: rangeMap[data.range],
            components: data.components,
            materialId: data.material ? await createNewTranslation(data.material) : undefined,
            areaOfEffect,
            ritual: data.ritual,
            duration: durationMap[data.duration],
            concentration: data.concentration,
            castingTime: castingTimeMap[data.casting_time],
            attackType: data.attack_type ? attackTypeMap[data.attack_type] : undefined,
            school: schoolMap[data.school.index],
            classes: data.classes.map((className: any) => classMap[className.index]),
            subclasses: data.subclasses.map((subclass: any) => subclassMap[subclass.index]),
            damage,
            difficultyClass,
            level: data.level,
            icon: "UNKNOWN",
            color: SpellColor.LIGHTNING,
        });

        return spell;
    } catch (e) {
        throw new Error("Failed to parse spell");
    }
};

export const getAllSpells = async () => {
    const parsedSpells: DbSpell[] = [];
    let index = 0;

    for (const spell of spellIndexes) {
        index++;
        if (await existsSpell(spell.index)) continue;
        console.log(`Parsing spell ${index}/${spellIndexes.length}: ${spell.name}`);
        await new Promise((resolve) => setTimeout(resolve, Math.random() * 200));

        const parsedSpell = await getSpellInformation(spell.index);
        await createSpell(parsedSpell);
        parsedSpell && parsedSpells.push(parsedSpell);
    }
};
