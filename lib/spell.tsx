import { cn } from "@/lib/util";
import { DamageType, Spell, SpellColor } from "@/type/Spell";
import { ReactNode } from "react";
import { FaBolt } from "react-icons/fa";
import { FaFireFlameCurved, FaSkullCrossbones } from "react-icons/fa6";
import { GiBroadheadArrow, GiSpikes, GiTombstone } from "react-icons/gi";
import { ImHammer2 } from "react-icons/im";
import { IoRadio } from "react-icons/io5";
import { PiBrainFill, PiSnowflakeBold } from "react-icons/pi";
import { RiSwordFill } from "react-icons/ri";
import { TbDropletFilled } from "react-icons/tb";

export const getSpellsByLevel = (spells: Spell[]) => {
    const spellsByLevel: Record<number, Spell[]> = spells.reduce(
        (acc, curr) => {
            const level = curr.level;
            if (!acc[level]) acc[level] = [];
            acc[level].push(curr);
            return acc;
        },
        {} as Record<number, Spell[]>,
    );

    return spellsByLevel;
};

export const damageColor: Record<DamageType, string> = {
    [DamageType.ACID]: "text-[#acd145] dark:text-[#bbff00]",
    [DamageType.FORCE]: "text-[#d70b1f] dark:text-[#ff0019]",
    [DamageType.BLUDGEONING]: "text-[#dca03a] dark:text-[#ffce7a]",
    [DamageType.SLASHING]: "text-[#5d5d5d] dark:text-[#d7d7d7]",
    [DamageType.NECROTIC]: "text-[#2cb59a] dark:text-[#03fcca]",
    [DamageType.RADIANT]: "text-[#c4af2a] dark:text-[#ffdd00]",
    [DamageType.FIRE]: "text-[#ff8400] dark:text-[#ff8400]",
    [DamageType.LIGHTNING]: "text-[#334bff] dark:text-[#334bff]",
    [DamageType.POISON]: "text-[#29c95c] dark:text-[#03fc52]",
    [DamageType.COLD]: "text-[#00b3ff] dark:text-[#00b3ff]",
    [DamageType.PSYCHIC]: "text-[#ff7daf] dark:text-[#ff7daf]",
    [DamageType.PIERCING]: "text-[#4e8eb0] dark:text-[#b6e5ff]",
    [DamageType.THUNDER]: "text-[#965edf] dark:text-[#b47aff]",
};

export const damageTypeIcon: Record<DamageType, ReactNode> = {
    [DamageType.ACID]: (
        <div className="relative h-6 w-6 overflow-hidden">
            <TbDropletFilled className={cn("h-full w-full", damageColor[DamageType.ACID])} />
        </div>
    ),
    [DamageType.FORCE]: (
        <div className="relative h-6 w-6 overflow-hidden">
            <GiSpikes className={cn("h-full w-full scale-[1.2]", damageColor[DamageType.FORCE])} />
        </div>
    ),
    [DamageType.BLUDGEONING]: (
        <div className="w-6overflow-hidden relative h-6">
            <ImHammer2 className={cn("h-full w-full scale-[0.9]", damageColor[DamageType.BLUDGEONING])} />
        </div>
    ),
    [DamageType.SLASHING]: (
        <div className="relative h-6 w-6 overflow-hidden">
            <RiSwordFill className={cn("h-full w-full", damageColor[DamageType.SLASHING])} />
        </div>
    ),
    [DamageType.NECROTIC]: (
        <div className="relative h-6 w-6 overflow-hidden">
            <GiTombstone className={cn("h-full w-full", damageColor[DamageType.NECROTIC])} />
        </div>
    ),
    [DamageType.RADIANT]: (
        <div className="relative h-6 w-6 overflow-hidden">
            <GiSpikes className={cn("h-full w-full scale-[1.2]", damageColor[DamageType.RADIANT])} />
        </div>
    ),
    [DamageType.FIRE]: (
        <div className="relative h-6 w-6 overflow-hidden">
            <FaFireFlameCurved className={cn("h-full w-full scale-[0.9]", damageColor[DamageType.FIRE])} />
        </div>
    ),
    [DamageType.LIGHTNING]: (
        <div className="relative h-6 w-6 overflow-hidden">
            <FaBolt className={cn("h-full w-full scale-[0.9]", damageColor[DamageType.LIGHTNING])} />
        </div>
    ),
    [DamageType.POISON]: (
        <div className="relative h-6 w-6 overflow-hidden">
            <FaSkullCrossbones className={cn("h-full w-full scale-[0.9]", damageColor[DamageType.POISON])} />
        </div>
    ),
    [DamageType.COLD]: (
        <div className="relative h-6 w-6 overflow-hidden">
            <PiSnowflakeBold className={cn("h-full w-full scale-[1.1]", damageColor[DamageType.COLD])} />
        </div>
    ),
    [DamageType.PSYCHIC]: (
        <div className="relative h-6 w-6 overflow-hidden">
            <PiBrainFill className={cn("h-full w-full", damageColor[DamageType.PSYCHIC])} />
        </div>
    ),
    [DamageType.PIERCING]: (
        <div className="relative h-6 w-6 overflow-hidden">
            <GiBroadheadArrow className={cn("h-full w-full scale-[0.9]", damageColor[DamageType.PIERCING])} />
        </div>
    ),
    [DamageType.THUNDER]: (
        <div className="relative h-6 w-6 overflow-hidden">
            <IoRadio className={cn("h-full w-full scale-[0.9]", damageColor[DamageType.THUNDER])} />
        </div>
    ),
};

export const getSpellRawColor = (spellColor: SpellColor) => {
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

export const getSpellColor = (spellColor: SpellColor) => {
    const map: Record<SpellColor, string> = {
        [SpellColor.DARK]: "text-[#005180] dark:text-[#005180]",
        [SpellColor.LIGHTNING]: "text-[#172dd7] dark:text-[#334bff]",
        [SpellColor.ICE]: "text-[#008fcc] dark:text-[#00b3ff]",
        [SpellColor.MOVE]: "text-[#4e8eb0] dark:text-[#b6e5ff]",
        [SpellColor.HEAL]: "text-[#329a93] dark:text-[#19fff0]",
        [SpellColor.SPECTRAL]: "text-[#2ba88f] dark:text-[#03fcca]",
        [SpellColor.POISON]: "text-[#1bbc4e] dark:text-[#03fc52]",
        [SpellColor.ACID]: "text-[#758e31] dark:text-[#bbff00]",
        [SpellColor.WARM]: "text-[#9e7a3c] dark:text-[#ffce7a]",
        [SpellColor.HOLY]: "text-[#93862c] dark:text-[#ffdd00]",
        [SpellColor.FIRE]: "text-[#c56f14] dark:text-[#ff8400]",
        [SpellColor.SPIKE]: "text-[#ff500a] dark:text-[#ff500a]",
        [SpellColor.MISSILE]: "text-[#d70b1f] dark:text-[#ff0019]",
        [SpellColor.COUNTER]: "text-[#cb5482] dark:text-[#ff7daf]",
        [SpellColor.FAERIE]: "text-[#b944e3] dark:text-[#d154ff]",
        [SpellColor.SHOCK]: "text-[#965edf] dark:text-[#b47aff]",
    };

    return map[spellColor];
};

export const getSpellBorder = (spellColor: SpellColor) => {
    const map: Record<SpellColor, string> = {
        [SpellColor.DARK]: "border-[#005180] dark:border-[#005180]",
        [SpellColor.LIGHTNING]: "border-[#172dd7] dark:border-[#334bff]",
        [SpellColor.ICE]: "border-[#008fcc] dark:border-[#00b3ff]",
        [SpellColor.MOVE]: "border-[#4e8eb0] dark:border-[#b6e5ff]",
        [SpellColor.HEAL]: "border-[#329a93] dark:border-[#19fff0]",
        [SpellColor.SPECTRAL]: "border-[#2ba88f] dark:border-[#03fcca]",
        [SpellColor.POISON]: "border-[#1bbc4e] dark:border-[#03fc52]",
        [SpellColor.ACID]: "border-[#758e31] dark:border-[#bbff00]",
        [SpellColor.WARM]: "border-[#9e7a3c] dark:border-[#ffce7a]",
        [SpellColor.HOLY]: "border-[#93862c] dark:border-[#ffdd00]",
        [SpellColor.FIRE]: "border-[#c56f14] dark:border-[#ff8400]",
        [SpellColor.SPIKE]: "border-[#ff500a] dark:border-[#ff500a]",
        [SpellColor.MISSILE]: "border-[#d70b1f] dark:border-[#ff0019]",
        [SpellColor.COUNTER]: "border-[#cb5482] dark:border-[#ff7daf]",
        [SpellColor.FAERIE]: "border-[#b944e3] dark:border-[#d154ff]",
        [SpellColor.SHOCK]: "border-[#965edf] dark:border-[#b47aff]",
    };

    return map[spellColor];
};

export const getSpellBackground = (spellColor: SpellColor) => {
    const map: Record<SpellColor, string> = {
        [SpellColor.DARK]: "bg-[#005180]/10 dark:bg-[#005180]/20",
        [SpellColor.LIGHTNING]: "bg-[#334bff]/10 dark:bg-[#334bff]/20",
        [SpellColor.ICE]: "bg-[#00b3ff]/10 dark:bg-[#00b3ff]/20",
        [SpellColor.MOVE]: "bg-[#b6e5ff]/10 dark:bg-[#b6e5ff]/20",
        [SpellColor.HEAL]: "bg-[#19fff0]/10 dark:bg-[#19fff0]/20",
        [SpellColor.SPECTRAL]: "bg-[#03fcca]/10 dark:bg-[#03fcca]/20",
        [SpellColor.POISON]: "bg-[#03fc52]/10 dark:bg-[#03fc52]/20",
        [SpellColor.ACID]: "bg-[#bbff00]/10 dark:bg-[#bbff00]/20",
        [SpellColor.WARM]: "bg-[#ffce7a]/10 dark:bg-[#ffce7a]/20",
        [SpellColor.HOLY]: "bg-[#ffdd00]/10 dark:bg-[#ffdd00]/20",
        [SpellColor.FIRE]: "bg-[#ff8400]/10 dark:bg-[#ff8400]/20",
        [SpellColor.SPIKE]: "bg-[#ff500a]/10 dark:bg-[#ff500a]/20",
        [SpellColor.MISSILE]: "bg-[#ff0019]/10 dark:bg-[#ff0019]/20",
        [SpellColor.COUNTER]: "bg-[#ff7daf]/10 dark:bg-[#ff7daf]/20",
        [SpellColor.FAERIE]: "bg-[#d154ff]/10 dark:bg-[#d154ff]/20",
        [SpellColor.SHOCK]: "bg-[#b47aff]/10 dark:bg-[#b47aff]/20",
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

export const getSpellBorderOnHover = (spellColor: SpellColor) => {
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

export const getSpellBackgroundOnHover = (spellColor: SpellColor) => {
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
