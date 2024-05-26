import { Button } from "@/component/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/component/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/component/ui/popover";
import { useTranslation } from "@/hook/useTranslation";
import { getCantripsAmount, getKnowSpellsAmount, getPreparedSpellsAmount } from "@/lib/character";
import { getSpellColor } from "@/lib/spell";
import { useLearnCantrip } from "@/server/use/useLearnCantrip";
import { useLearnSpell } from "@/server/use/useLearnSpell";
import { usePrepareSpell } from "@/server/use/usePrepareSpell";
import { CharacterWithSpells } from "@/type/Character";
import { Language } from "@/type/Language";
import { Route } from "@/type/Route";
import { ClassType, Spell } from "@/type/Spell";
import Link from "next/link";
import { ReactNode, useState } from "react";
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

    // TODO forget, unprepare spells or cantrips

    const [popoverOpen, setPopoverOpen] = useState(false);

    const knownSpells = character.knownSpells.length;
    const maxKnownSpells = getKnowSpellsAmount(character.class, character.level);

    const preparedSpells = character.preparedSpells.filter(({ counts }) => !!counts).length;
    const oathOrDomainSpells = character.preparedSpells.filter(({ counts }) => !counts).length;
    const maxPreparedSpells = getPreparedSpellsAmount(character.class, character.ability, character.level);

    const knownCantrips = character.knownCantrips.length;
    const maxKnownCantrips = getCantripsAmount(character.class, character.level);

    const learnSpell = useLearnSpell();
    const prepareSpell = usePrepareSpell();
    const learnCantrip = useLearnCantrip();

    const [learnDialogOpen, setLearnDialogOpen] = useState(false);
    const onLearnSpell = () => {
        setPopoverOpen(false);
        if (maxKnownSpells !== null && knownSpells >= maxKnownSpells) return setLearnDialogOpen(true);

        learnSpell.mutate({ characterId: character.id, spellIndex: index });
    };

    const [prepareDialogOpen, setPrepareDialogOpen] = useState(false);
    const onPrepareSpell = (isOathOrDomain = false) => {
        setPopoverOpen(false);
        if (!isOathOrDomain && preparedSpells >= maxPreparedSpells) return setPrepareDialogOpen(true);

        prepareSpell.mutate({ characterId: character.id, spellIndex: index, counts: !isOathOrDomain });
    };

    const [cantripDialogOpen, setCantripDialogOpen] = useState(false);
    const onAddCantrip = () => {
        setPopoverOpen(false);
        if (knownCantrips >= maxKnownCantrips) return setCantripDialogOpen(true);

        learnCantrip.mutate({ characterId: character.id, spellIndex: index });
    };

    const addSpellText: Record<ClassType, string> = {
        [ClassType.WIZARD]: t.dnd.spell.addToSpellbook,
        [ClassType.SORCERER]: `${t.dnd.spell.learn} (${knownSpells}/${maxKnownSpells})`,
        [ClassType.CLERIC]: `${t.dnd.spell.prepare} (${preparedSpells}/${maxPreparedSpells})`,
        [ClassType.PALADIN]: `${t.dnd.spell.prepare} (${preparedSpells}/${maxPreparedSpells})`,
        [ClassType.RANGER]: `${t.dnd.spell.learn} (${knownSpells}/${maxKnownSpells})`,
        [ClassType.BARD]: `${t.dnd.spell.learn} (${knownSpells}/${maxKnownSpells})`,
        [ClassType.DRUID]: `${t.dnd.spell.prepare} (${preparedSpells}/${maxPreparedSpells})`,
        [ClassType.WARLOCK]: `${t.dnd.spell.learn} (${knownSpells}/${maxKnownSpells})`,
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
        [ClassType.WIZARD]: onLearnSpell,
        [ClassType.SORCERER]: onLearnSpell,
        [ClassType.CLERIC]: onPrepareSpell,
        [ClassType.PALADIN]: onPrepareSpell,
        [ClassType.RANGER]: onLearnSpell,
        [ClassType.BARD]: onLearnSpell,
        [ClassType.DRUID]: onPrepareSpell,
        [ClassType.WARLOCK]: onLearnSpell,
    };

    return (
        <>
            <div className="flex flex-col items-center gap-2">
                <Popover modal={true} open={popoverOpen} onOpenChange={setPopoverOpen}>
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

                        {isCantrip && (
                            <Button variant="menu" size="menu" onClick={onAddCantrip}>
                                <LuSparkle className="mr-2 h-5 w-5" />
                                <p className="font-medium tracking-wide">
                                    {t.dnd.spell.addCantrip} {`(${knownCantrips}/${maxKnownCantrips})`}
                                </p>
                            </Button>
                        )}

                        {!isCantrip && (
                            <>
                                <Button variant="menu" size="menu" onClick={addSpellAction[character.class]}>
                                    {addSpellIcon[character.class]}
                                    <p className="font-medium tracking-wide">{addSpellText[character.class]}</p>
                                </Button>

                                {character.class === ClassType.CLERIC && (
                                    <Button variant="menu" size="menu" onClick={() => onPrepareSpell(true)}>
                                        <LuLoader className="mr-2 h-5 w-5" />
                                        <p className="font-medium tracking-wide">{`${t.dnd.spell.prepareAsDomain} (${oathOrDomainSpells})`}</p>
                                    </Button>
                                )}

                                {character.class === ClassType.PALADIN && (
                                    <Button variant="menu" size="menu" onClick={() => onPrepareSpell(true)}>
                                        <LuSwords className="mr-2 h-5 w-5" />
                                        <p className="font-medium tracking-wide">{`${t.dnd.spell.prepareAsOath} (${oathOrDomainSpells})`}</p>
                                    </Button>
                                )}
                            </>
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

            <Dialog open={learnDialogOpen} onOpenChange={setLearnDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t.dnd.spell.cannotLearn}</DialogTitle>
                    </DialogHeader>

                    <div className="ml-1 flex flex-col gap-2">
                        <div className="flex w-fit items-center gap-2 rounded-md">
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

                            <p className="w-full truncate text-pretty font-medium tracking-wide mouse:group-hover:opacity-0">
                                {name[language]}
                            </p>
                        </div>

                        <p className="opacity-60">
                            {t.dnd.spell.cannotLearnDescription.replace(
                                "{{PARAM}}",
                                maxKnownSpells ? maxKnownSpells.toString() : "0",
                            )}
                        </p>
                    </div>

                    <DialogFooter className="flex w-full flex-row justify-end gap-2 pt-4">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => {
                                setLearnDialogOpen(false);
                                learnSpell.mutate({ characterId: character.id, spellIndex: index });
                            }}
                        >
                            <LuLightbulb className="mr-2 h-5 w-5" />
                            {t.dnd.spell.learnAnyway}
                        </Button>

                        <DialogClose asChild>
                            <Button variant="default">{t.form.cancel}</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SpellWithMenu;
