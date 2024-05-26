import { Button } from "@/component/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/component/ui/popover";
import { useTranslation } from "@/hook/useTranslation";
import { getSpellColor } from "@/lib/spell";
import { CharacterWithSpells } from "@/type/Character";
import { Language } from "@/type/Language";
import { Route } from "@/type/Route";
import { ClassType, Spell } from "@/type/Spell";
import Link from "next/link";
import { ReactNode } from "react";
import { LuBookPlus, LuLightbulb, LuLoader, LuSparkle, LuSwords, LuView } from "react-icons/lu";

interface Props {
    spell: Spell;
    language: Language;
    character: CharacterWithSpells;
}

const SpellWithMenu = ({ spell, language, character }: Props) => {
    const { t } = useTranslation(language);

    const { index, icon, color, name, level } = spell;
    const isCantrip = level === 0;

    const learnSpell = () => {
        console.log("LEARN");
    };

    const prepareSpell = (asOathOrDomain = false) => {
        console.log("PREPARE");
    };

    const addCantrip = () => {
        console.log("ADD CANTRIP");
    };

    const addSpellText: Record<ClassType, string> = {
        [ClassType.WIZARD]: t.dnd.spell.addToSpellbook,
        [ClassType.SORCERER]: t.dnd.spell.learn,
        [ClassType.CLERIC]: t.dnd.spell.prepare,
        [ClassType.PALADIN]: t.dnd.spell.prepare,
        [ClassType.RANGER]: t.dnd.spell.learn,
        [ClassType.BARD]: t.dnd.spell.learn,
        [ClassType.DRUID]: t.dnd.spell.prepare,
        [ClassType.WARLOCK]: t.dnd.spell.learn,
    };

    const addSpellIcon: Record<ClassType, ReactNode> = {
        [ClassType.WIZARD]: <LuBookPlus className="mr-2 h-5 w-5" />,
        [ClassType.SORCERER]: <LuLightbulb className="mr-2 h-5 w-5" />,
        [ClassType.CLERIC]: <LuSparkle className="mr-2 h-5 w-5" />,
        [ClassType.PALADIN]: <LuSparkle className="mr-2 h-5 w-5" />,
        [ClassType.RANGER]: <LuLightbulb className="mr-2 h-5 w-5" />,
        [ClassType.BARD]: <LuLightbulb className="mr-2 h-5 w-5" />,
        [ClassType.DRUID]: <LuSparkle className="mr-2 h-5 w-5" />,
        [ClassType.WARLOCK]: <LuLightbulb className="mr-2 h-5 w-5" />,
    };

    const addSpellAction: Record<ClassType, () => void> = {
        [ClassType.WIZARD]: learnSpell,
        [ClassType.SORCERER]: learnSpell,
        [ClassType.CLERIC]: prepareSpell,
        [ClassType.PALADIN]: prepareSpell,
        [ClassType.RANGER]: learnSpell,
        [ClassType.BARD]: learnSpell,
        [ClassType.DRUID]: prepareSpell,
        [ClassType.WARLOCK]: learnSpell,
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <Popover modal={true}>
                <PopoverTrigger className="focus-shadow group relative flex w-full flex-col items-center rounded-md  p-2">
                    <div
                        className="inline-block h-20 min-h-20 w-20 min-w-20 bg-cover brightness-90 dark:brightness-100 sm:h-24 sm:min-h-24 sm:w-24 sm:min-w-24 mouse:transition-transform mouse:group-hover:scale-110"
                        style={{
                            backgroundImage: `url(/spell/${icon})`,
                            maskImage: `url(/spell/${icon})`,
                            maskMode: "alpha",
                            maskSize: "cover",
                            backgroundBlendMode: "luminosity",
                            backgroundColor: getSpellColor(color),
                        }}
                    />

                    <div className="relative flex w-full">
                        <h3 className="w-full overflow-hidden text-ellipsis text-center text-sm font-semibold opacity-75 mouse:group-hover:opacity-0">
                            {name[language]}
                        </h3>

                        <h3
                            className="pointer-events-none absolute z-10 hidden w-full select-none overflow-hidden text-ellipsis text-center text-sm font-semibold opacity-0 brightness-[0.8] dark:brightness-100 mouse:block mouse:group-hover:opacity-100"
                            style={{
                                color: getSpellColor(color),
                            }}
                        >
                            {name[language]}
                        </h3>
                    </div>
                </PopoverTrigger>

                <PopoverContent className="mx-2 my-3">
                    <div className="mb-2 flex w-full items-center gap-2 border-b border-stone-300 px-4 py-2 dark:border-stone-700">
                        <div
                            className="inline-block h-8 max-h-8 min-h-8 w-8 min-w-8 max-w-8 bg-cover brightness-90 dark:brightness-100"
                            style={{
                                backgroundImage: `url(/spell/${icon})`,
                                maskImage: `url(/spell/${icon})`,
                                maskMode: "alpha",
                                maskSize: "cover",
                                backgroundBlendMode: "luminosity",
                                backgroundColor: getSpellColor(color),
                            }}
                        />

                        <p className="w-full truncate font-medium tracking-wide mouse:group-hover:opacity-0">
                            {name[language]}
                        </p>
                    </div>

                    <Button variant="menu" size="menu" onClick={addSpellAction[character.class]}>
                        {isCantrip ? <LuSparkle className="mr-2 h-5 w-5" /> : addSpellIcon[character.class]}
                        <p className="font-medium tracking-wide">
                            {isCantrip ? t.dnd.spell.addCantrip : addSpellText[character.class]}
                        </p>
                    </Button>

                    {!isCantrip && character.class === ClassType.CLERIC && (
                        <Button variant="menu" size="menu" onClick={() => prepareSpell(true)}>
                            <LuLoader className="mr-2 h-5 w-5" />
                            <p className="font-medium tracking-wide">{t.dnd.spell.prepareAsDomain}</p>
                        </Button>
                    )}

                    {!isCantrip && character.class === ClassType.PALADIN && (
                        <Button variant="menu" size="menu" onClick={() => prepareSpell(true)}>
                            <LuSwords className="mr-2 h-5 w-5" />
                            <p className="font-medium tracking-wide">{t.dnd.spell.prepareAsOath}</p>
                        </Button>
                    )}

                    <Button asChild variant="menu" size="menu">
                        <Link href={`/${language}${Route.SPELL}/${index}`}>
                            <LuView className="mr-2 h-5 w-5" />
                            <p className="font-medium tracking-wide">{t.dnd.spell.view}</p>
                        </Link>
                    </Button>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default SpellWithMenu;
