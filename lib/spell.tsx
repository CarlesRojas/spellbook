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

export const getSpellColorOnHover = (spellColor: SpellColor) => {
    const map: Record<SpellColor, string> = {
        [SpellColor.DARK]:
            "mouse:hover:text-[#005180] mouse:group-hover:text-[#005180] mouse:hover:dark:text-[#005180] mouse:group-hover:dark:text-[#005180]",
        [SpellColor.LIGHTNING]:
            "mouse:hover:text-[#172dd7] mouse:group-hover:text-[#172dd7] mouse:hover:dark:text-[#334bff] mouse:group-hover:dark:text-[#334bff]",
        [SpellColor.ICE]:
            "mouse:hover:text-[#008fcc] mouse:group-hover:text-[#008fcc] mouse:hover:dark:text-[#00b3ff] mouse:group-hover:dark:text-[#00b3ff]",
        [SpellColor.MOVE]:
            "mouse:hover:text-[#4e8eb0] mouse:group-hover:text-[#4e8eb0] mouse:hover:dark:text-[#b6e5ff] mouse:group-hover:dark:text-[#b6e5ff]",
        [SpellColor.HEAL]:
            "mouse:hover:text-[#329a93] mouse:group-hover:text-[#329a93] mouse:hover:dark:text-[#19fff0] mouse:group-hover:dark:text-[#19fff0]",
        [SpellColor.SPECTRAL]:
            "mouse:hover:text-[#2ba88f] mouse:group-hover:text-[#2ba88f] mouse:hover:dark:text-[#03fcca] mouse:group-hover:dark:text-[#03fcca]",
        [SpellColor.POISON]:
            "mouse:hover:text-[#1bbc4e] mouse:group-hover:text-[#1bbc4e] mouse:hover:dark:text-[#03fc52] mouse:group-hover:dark:text-[#03fc52]",
        [SpellColor.ACID]:
            "mouse:hover:text-[#758e31] mouse:group-hover:text-[#758e31] mouse:hover:dark:text-[#bbff00] mouse:group-hover:dark:text-[#bbff00]",
        [SpellColor.WARM]:
            "mouse:hover:text-[#9e7a3c] mouse:group-hover:text-[#9e7a3c] mouse:hover:dark:text-[#ffce7a] mouse:group-hover:dark:text-[#ffce7a]",
        [SpellColor.HOLY]:
            "mouse:hover:text-[#93862c] mouse:group-hover:text-[#93862c] mouse:hover:dark:text-[#ffdd00] mouse:group-hover:dark:text-[#ffdd00]",
        [SpellColor.FIRE]:
            "mouse:hover:text-[#c56f14] mouse:group-hover:text-[#c56f14] mouse:hover:dark:text-[#ff8400] mouse:group-hover:dark:text-[#ff8400]",
        [SpellColor.SPIKE]:
            "mouse:hover:text-[#ff500a] mouse:group-hover:text-[#ff500a] mouse:hover:dark:text-[#ff500a] mouse:group-hover:dark:text-[#ff500a]",
        [SpellColor.MISSILE]:
            "mouse:hover:text-[#d70b1f] mouse:group-hover:text-[#d70b1f] mouse:hover:dark:text-[#ff0019] mouse:group-hover:dark:text-[#ff0019]",
        [SpellColor.COUNTER]:
            "mouse:hover:text-[#cb5482] mouse:group-hover:text-[#cb5482] mouse:hover:dark:text-[#ff7daf] mouse:group-hover:dark:text-[#ff7daf]",
        [SpellColor.FAERIE]:
            "mouse:hover:text-[#b944e3] mouse:group-hover:text-[#b944e3] mouse:hover:dark:text-[#d154ff] mouse:group-hover:dark:text-[#d154ff]",
        [SpellColor.SHOCK]:
            "mouse:hover:text-[#965edf] mouse:group-hover:text-[#965edf] mouse:hover:dark:text-[#b47aff] mouse:group-hover:dark:text-[#b47aff]",
    };

    return map[spellColor];
};

export const getSpellColorBorderOnHover = (spellColor: SpellColor) => {
    const map: Record<SpellColor, string> = {
        [SpellColor.DARK]:
            "mouse:hover:border-[#005180] mouse:group-hover:border-[#005180] mouse:hover:dark:border-[#005180] mouse:group-hover:dark:border-[#005180]",
        [SpellColor.LIGHTNING]:
            "mouse:hover:border-[#172dd7] mouse:group-hover:border-[#172dd7] mouse:hover:dark:border-[#334bff] mouse:group-hover:dark:border-[#334bff]",
        [SpellColor.ICE]:
            "mouse:hover:border-[#008fcc] mouse:group-hover:border-[#008fcc] mouse:hover:dark:border-[#00b3ff] mouse:group-hover:dark:border-[#00b3ff]",
        [SpellColor.MOVE]:
            "mouse:hover:border-[#4e8eb0] mouse:group-hover:border-[#4e8eb0] mouse:hover:dark:border-[#b6e5ff] mouse:group-hover:dark:border-[#b6e5ff]",
        [SpellColor.HEAL]:
            "mouse:hover:border-[#329a93] mouse:group-hover:border-[#329a93] mouse:hover:dark:border-[#19fff0] mouse:group-hover:dark:border-[#19fff0]",
        [SpellColor.SPECTRAL]:
            "mouse:hover:border-[#2ba88f] mouse:group-hover:border-[#2ba88f] mouse:hover:dark:border-[#03fcca] mouse:group-hover:dark:border-[#03fcca]",
        [SpellColor.POISON]:
            "mouse:hover:border-[#1bbc4e] mouse:group-hover:border-[#1bbc4e] mouse:hover:dark:border-[#03fc52] mouse:group-hover:dark:border-[#03fc52]",
        [SpellColor.ACID]:
            "mouse:hover:border-[#758e31] mouse:group-hover:border-[#758e31] mouse:hover:dark:border-[#bbff00] mouse:group-hover:dark:border-[#bbff00]",
        [SpellColor.WARM]:
            "mouse:hover:border-[#9e7a3c] mouse:group-hover:border-[#9e7a3c] mouse:hover:dark:border-[#ffce7a] mouse:group-hover:dark:border-[#ffce7a]",
        [SpellColor.HOLY]:
            "mouse:hover:border-[#93862c] mouse:group-hover:border-[#93862c] mouse:hover:dark:border-[#ffdd00] mouse:group-hover:dark:border-[#ffdd00]",
        [SpellColor.FIRE]:
            "mouse:hover:border-[#c56f14] mouse:group-hover:border-[#c56f14] mouse:hover:dark:border-[#ff8400] mouse:group-hover:dark:border-[#ff8400]",
        [SpellColor.SPIKE]:
            "mouse:hover:border-[#ff500a] mouse:group-hover:border-[#ff500a] mouse:hover:dark:border-[#ff500a] mouse:group-hover:dark:border-[#ff500a]",
        [SpellColor.MISSILE]:
            "mouse:hover:border-[#d70b1f] mouse:group-hover:border-[#d70b1f] mouse:hover:dark:border-[#ff0019] mouse:group-hover:dark:border-[#ff0019]",
        [SpellColor.COUNTER]:
            "mouse:hover:border-[#cb5482] mouse:group-hover:border-[#cb5482] mouse:hover:dark:border-[#ff7daf] mouse:group-hover:dark:border-[#ff7daf]",
        [SpellColor.FAERIE]:
            "mouse:hover:border-[#b944e3] mouse:group-hover:border-[#b944e3] mouse:hover:dark:border-[#d154ff] mouse:group-hover:dark:border-[#d154ff]",
        [SpellColor.SHOCK]:
            "mouse:hover:border-[#965edf] mouse:group-hover:border-[#965edf] mouse:hover:dark:border-[#b47aff] mouse:group-hover:dark:border-[#b47aff]",
    };

    return map[spellColor];
};

export const getSpellColorBackgroundOnHover = (spellColor: SpellColor) => {
    const map: Record<SpellColor, string> = {
        [SpellColor.DARK]:
            "mouse:hover:bg-[#005180]/10 mouse:group-hover:bg-[#005180]/10 mouse:hover:dark:bg-[#005180]/10 mouse:group-hover:dark:bg-[#005180]/10",
        [SpellColor.LIGHTNING]:
            "mouse:hover:bg-[#334bff]/10 mouse:group-hover:bg-[#334bff]/10 mouse:hover:dark:bg-[#334bff]/10 mouse:group-hover:dark:bg-[#334bff]/10",
        [SpellColor.ICE]:
            "mouse:hover:bg-[#00b3ff]/10 mouse:group-hover:bg-[#00b3ff]/10 mouse:hover:dark:bg-[#00b3ff]/10 mouse:group-hover:dark:bg-[#00b3ff]/10",
        [SpellColor.MOVE]:
            "mouse:hover:bg-[#b6e5ff]/10 mouse:group-hover:bg-[#b6e5ff]/10 mouse:hover:dark:bg-[#b6e5ff]/10 mouse:group-hover:dark:bg-[#b6e5ff]/10",
        [SpellColor.HEAL]:
            "mouse:hover:bg-[#19fff0]/10 mouse:group-hover:bg-[#19fff0]/10 mouse:hover:dark:bg-[#19fff0]/10 mouse:group-hover:dark:bg-[#19fff0]/10",
        [SpellColor.SPECTRAL]:
            "mouse:hover:bg-[#03fcca]/10 mouse:group-hover:bg-[#03fcca]/10 mouse:hover:dark:bg-[#03fcca]/10 mouse:group-hover:dark:bg-[#03fcca]/10",
        [SpellColor.POISON]:
            "mouse:hover:bg-[#03fc52]/10 mouse:group-hover:bg-[#03fc52]/10 mouse:hover:dark:bg-[#03fc52]/10 mouse:group-hover:dark:bg-[#03fc52]/10",
        [SpellColor.ACID]:
            "mouse:hover:bg-[#bbff00]/10 mouse:group-hover:bg-[#bbff00]/10 mouse:hover:dark:bg-[#bbff00]/10 mouse:group-hover:dark:bg-[#bbff00]/10",
        [SpellColor.WARM]:
            "mouse:hover:bg-[#ffce7a]/10 mouse:group-hover:bg-[#ffce7a]/10 mouse:hover:dark:bg-[#ffce7a]/10 mouse:group-hover:dark:bg-[#ffce7a]/10",
        [SpellColor.HOLY]:
            "mouse:hover:bg-[#ffdd00]/10 mouse:group-hover:bg-[#ffdd00]/10 mouse:hover:dark:bg-[#ffdd00]/10 mouse:group-hover:dark:bg-[#ffdd00]/10",
        [SpellColor.FIRE]:
            "mouse:hover:bg-[#ff8400]/10 mouse:group-hover:bg-[#ff8400]/10 mouse:hover:dark:bg-[#ff8400]/10 mouse:group-hover:dark:bg-[#ff8400]/10",
        [SpellColor.SPIKE]:
            "mouse:hover:bg-[#ff500a]/10 mouse:group-hover:bg-[#ff500a]/10 mouse:hover:dark:bg-[#ff500a]/10 mouse:group-hover:dark:bg-[#ff500a]/10",
        [SpellColor.MISSILE]:
            "mouse:hover:bg-[#ff0019]/10 mouse:group-hover:bg-[#ff0019]/10 mouse:hover:dark:bg-[#ff0019]/10 mouse:group-hover:dark:bg-[#ff0019]/10",
        [SpellColor.COUNTER]:
            "mouse:hover:bg-[#ff7daf]/10 mouse:group-hover:bg-[#ff7daf]/10 mouse:hover:dark:bg-[#ff7daf]/10 mouse:group-hover:dark:bg-[#ff7daf]/10",
        [SpellColor.FAERIE]:
            "mouse:hover:bg-[#d154ff]/10 mouse:group-hover:bg-[#d154ff]/10 mouse:hover:dark:bg-[#d154ff]/10 mouse:group-hover:dark:bg-[#d154ff]/10",
        [SpellColor.SHOCK]:
            "mouse:hover:bg-[#b47aff]/10 mouse:group-hover:bg-[#b47aff]/10 mouse:hover:dark:bg-[#b47aff]/10 mouse:group-hover:dark:bg-[#b47aff]/10",
    };

    return map[spellColor];
};
