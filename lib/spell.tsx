import { SpellColor } from "@/type/Spell";

export const getSpellColor = (spellColor: SpellColor) => {
    const map: Record<SpellColor, string> = {
        [SpellColor.DARK]: "#005180",
        [SpellColor.LIGHTNING]: "#334bff",
        [SpellColor.ICE]: "#00b3ff",
        [SpellColor.MOVE]: "#b6e5ff",
        [SpellColor.HEAL]: "#19fff0",
        [SpellColor.SPECTRAL]: "#03fcca",
        [SpellColor.POISON]: "#03fc52",
        [SpellColor.ACID]: "#bbff00",
        [SpellColor.WARM]: "#ffce7a",
        [SpellColor.HOLY]: "#ffdd00",
        [SpellColor.FIRE]: "#ff8400",
        [SpellColor.SPIKE]: "#ff500a",
        [SpellColor.MISSILE]: "#ff0019",
        [SpellColor.COUNTER]: "#ff7daf",
        [SpellColor.FAERIE]: "#d154ff",
        [SpellColor.SHOCK]: "#b47aff",
    };

    return map[spellColor];
};
