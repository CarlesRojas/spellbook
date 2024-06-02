import { Button } from "@/component/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/component/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/component/ui/popover";
import { SpellToast, ToastWrapper } from "@/component/ui/toast";
import { useTranslation } from "@/hook/useTranslation";
import { getCantripsAmount, getKnowSpellsAmount, getPreparedSpellsAmount, getTotalSpellSlots } from "@/lib/character";
import { getSpellColorOnHover, getSpellRawColor } from "@/lib/spell";
import { cn } from "@/lib/util";
import { useForgetCantrip } from "@/server/use/useForgetCantrip";
import { useForgetSpell } from "@/server/use/useForgetSpell";
import { useLearnCantrip } from "@/server/use/useLearnCantrip";
import { useLearnSpell } from "@/server/use/useLearnSpell";
import { usePrepareSpell } from "@/server/use/usePrepareSpell";
import { useUnprepareSpell } from "@/server/use/useUnprepareSpell";
import { CharacterWithSpells } from "@/type/Character";
import { Language } from "@/type/Language";
import { Route } from "@/type/Route";
import { ClassType, Spell } from "@/type/Spell";
import { getHighestLevelSpellSlot } from "@/type/SpellSlots";
import Link from "next/link";
import { ReactNode, useState } from "react";
import {
    LuBookMinus,
    LuBookPlus,
    LuLightbulb,
    LuLightbulbOff,
    LuLoader,
    LuSparkle,
    LuSwords,
    LuView,
    LuX,
    LuZap,
    LuZapOff,
} from "react-icons/lu";
import { toast } from "sonner";

interface Props {
    spell: Spell;
    language: Language;
    character: CharacterWithSpells;
}

const UnknownSpell = ({ spell, language, character }: Props) => {
    const { t } = useTranslation(language);

    const { index, icon, color, name, level } = spell;
    const isCantrip = level === 0;
    const highestLevelSpellSlot = getHighestLevelSpellSlot(getTotalSpellSlots(character.class, character.level));

    const [popoverOpen, setPopoverOpen] = useState(false);

    const isKnown = character.knownSpells.some(({ index: spellIndex }) => spellIndex === index);
    const knownSpells = character.knownSpells.length;
    const maxKnownSpells = getKnowSpellsAmount(character.class, character.level);

    const isPrepared = character.preparedSpells.some(
        ({ index: spellIndex, counts }) => spellIndex === index && !!counts,
    );
    const isOathOrDomain = character.preparedSpells.some(
        ({ index: spellIndex, counts }) => spellIndex === index && !counts,
    );
    const preparedSpells = character.preparedSpells.filter(({ counts }) => !!counts).length;
    const oathOrDomainSpells = character.preparedSpells.filter(({ counts }) => !counts).length;
    const maxPreparedSpells = getPreparedSpellsAmount(character.class, character.ability, character.level);

    const isKnownCantrip = character.knownCantrips.some(({ index: spellIndex }) => spellIndex === index);
    const knownCantrips = character.knownCantrips.length;
    const maxKnownCantrips = getCantripsAmount(character.class, character.level);

    const learnSpell = useLearnSpell();
    const prepareSpell = usePrepareSpell();
    const learnCantrip = useLearnCantrip();
    const forgetSpell = useForgetSpell();
    const unprepareSpell = useUnprepareSpell();
    const forgetCantrip = useForgetCantrip();

    const smallIcon = (
        <div
            className="inline-block h-8 max-h-8 min-h-8 w-8 min-w-8 max-w-8 bg-cover brightness-90 dark:brightness-100"
            style={{
                backgroundImage: `url(/spell/${icon})`,
                maskImage: `url(/spell/${icon})`,
                maskMode: "alpha",
                maskSize: "cover",
                backgroundBlendMode: "luminosity",
                backgroundColor: getSpellRawColor(color),
            }}
        />
    );

    const [learnDialogOpen, setLearnDialogOpen] = useState(false);
    const [learnHigherLevelDialogOpen, setLearnHigherLevelDialogOpen] = useState(false);
    const onLearnSpell = (bypassMax: boolean, bypassHigherLevel: boolean) => {
        setPopoverOpen(false);
        if (!bypassMax && knownSpells >= maxKnownSpells) return setLearnDialogOpen(true);
        if (!bypassHigherLevel && level > highestLevelSpellSlot) return setLearnHigherLevelDialogOpen(true);

        learnSpell.mutate({ characterId: character.id, spellIndex: index, spell });
        toast.custom((currToast) => (
            <ToastWrapper onClose={() => toast.dismiss(currToast)}>
                <SpellToast
                    icon={smallIcon}
                    message={(character.class === ClassType.WIZARD
                        ? t.dnd.spell.toast.addToSpellbook
                        : t.dnd.spell.toast.learn
                    ).replace("{{PARAM}}", spell.name[language])}
                />
            </ToastWrapper>
        ));
    };
    const onForgetSpell = () => {
        setPopoverOpen(false);
        forgetSpell.mutate({ characterId: character.id, spellIndex: index });
        toast.custom((currToast) => (
            <ToastWrapper onClose={() => toast.dismiss(currToast)}>
                <SpellToast
                    icon={smallIcon}
                    message={(character.class === ClassType.WIZARD
                        ? t.dnd.spell.toast.removeFromSpellbook
                        : t.dnd.spell.toast.forget
                    ).replace("{{PARAM}}", spell.name[language])}
                />
            </ToastWrapper>
        ));
    };

    const [prepareDialogOpen, setPrepareDialogOpen] = useState(false);
    const [prepareHigherLevelDialogOpen, setPrepareHigherLevelDialogOpen] = useState(false);
    const onPrepareSpell = (bypassMax: boolean, bypassHigherLevel: boolean, isOathOrDomain: boolean) => {
        setPopoverOpen(false);
        if (!bypassMax && !isOathOrDomain && preparedSpells >= maxPreparedSpells) return setPrepareDialogOpen(true);
        if (!bypassHigherLevel && level > highestLevelSpellSlot) return setPrepareHigherLevelDialogOpen(true);

        prepareSpell.mutate({
            characterId: character.id,
            spellIndex: index,
            counts: !isOathOrDomain,
            spell: { ...spell, counts: !isOathOrDomain },
        });

        const toastMessage = isOathOrDomain
            ? character.class === ClassType.CLERIC
                ? t.dnd.spell.toast.prepareAsDomain
                : t.dnd.spell.toast.prepareAsOath
            : t.dnd.spell.toast.prepare;

        toast.custom((currToast) => (
            <ToastWrapper onClose={() => toast.dismiss(currToast)}>
                <SpellToast icon={smallIcon} message={toastMessage.replace("{{PARAM}}", spell.name[language])} />
            </ToastWrapper>
        ));
    };
    const onUnprepareSpell = () => {
        setPopoverOpen(false);
        unprepareSpell.mutate({ characterId: character.id, spellIndex: index });

        const toastMessage = isOathOrDomain
            ? character.class === ClassType.CLERIC
                ? t.dnd.spell.toast.unprepareFromDomain
                : t.dnd.spell.toast.unprepareFromOath
            : t.dnd.spell.toast.unprepare;

        toast.custom((currToast) => (
            <ToastWrapper onClose={() => toast.dismiss(currToast)}>
                <SpellToast icon={smallIcon} message={toastMessage.replace("{{PARAM}}", spell.name[language])} />
            </ToastWrapper>
        ));
    };

    const [cantripDialogOpen, setCantripDialogOpen] = useState(false);
    const onAddCantrip = (bypassMax: boolean) => {
        setPopoverOpen(false);
        if (!bypassMax && knownCantrips >= maxKnownCantrips) return setCantripDialogOpen(true);

        learnCantrip.mutate({ characterId: character.id, spellIndex: index, spell });
        toast.custom((currToast) => (
            <ToastWrapper onClose={() => toast.dismiss(currToast)}>
                <SpellToast
                    icon={smallIcon}
                    message={t.dnd.spell.toast.addCantrip.replace("{{PARAM}}", spell.name[language])}
                />
            </ToastWrapper>
        ));
    };
    const onForgetCantrip = () => {
        setPopoverOpen(false);
        forgetCantrip.mutate({ characterId: character.id, spellIndex: index });
        toast.custom((currToast) => (
            <ToastWrapper onClose={() => toast.dismiss(currToast)}>
                <SpellToast
                    icon={smallIcon}
                    message={t.dnd.spell.toast.removeCantrip.replace("{{PARAM}}", spell.name[language])}
                />
            </ToastWrapper>
        ));
    };

    const addSpellText: Record<ClassType, string> = {
        [ClassType.WIZARD]: isKnown
            ? t.dnd.spell.removeFromSpellbook
            : `${t.dnd.spell.addToSpellbook} (${knownSpells}/${maxKnownSpells})`,
        [ClassType.SORCERER]: isKnown ? t.dnd.spell.forget : `${t.dnd.spell.learn} (${knownSpells}/${maxKnownSpells})`,
        [ClassType.CLERIC]: isPrepared
            ? t.dnd.spell.unprepare
            : `${t.dnd.spell.prepare} (${preparedSpells}/${maxPreparedSpells})`,
        [ClassType.PALADIN]: isPrepared
            ? t.dnd.spell.unprepare
            : `${t.dnd.spell.prepare} (${preparedSpells}/${maxPreparedSpells})`,
        [ClassType.RANGER]: isKnown ? t.dnd.spell.forget : `${t.dnd.spell.learn} (${knownSpells}/${maxKnownSpells})`,
        [ClassType.BARD]: isKnown ? t.dnd.spell.forget : `${t.dnd.spell.learn} (${knownSpells}/${maxKnownSpells})`,
        [ClassType.DRUID]: isPrepared
            ? t.dnd.spell.unprepare
            : `${t.dnd.spell.prepare} (${preparedSpells}/${maxPreparedSpells})`,
        [ClassType.WARLOCK]: isKnown ? t.dnd.spell.forget : `${t.dnd.spell.learn} (${knownSpells}/${maxKnownSpells})`,
    };

    const addSpellIcon: Record<ClassType, ReactNode> = {
        [ClassType.WIZARD]: isKnown ? (
            <LuBookMinus className="mr-2 h-5 w-5" />
        ) : (
            <LuBookPlus className="mr-2 h-5 w-5" />
        ),
        [ClassType.SORCERER]: isKnown ? (
            <LuLightbulbOff className="mr-2 h-5 w-5" />
        ) : (
            <LuLightbulb className="mr-2 h-5 w-5" />
        ),
        [ClassType.CLERIC]: isPrepared ? (
            <LuSparkle className="mr-2 h-5 w-5 rotate-45" />
        ) : (
            <LuSparkle className="mr-2 h-5 w-5" />
        ),
        [ClassType.PALADIN]: isPrepared ? (
            <LuSparkle className="mr-2 h-5 w-5 rotate-45" />
        ) : (
            <LuSparkle className="mr-2 h-5 w-5" />
        ),
        [ClassType.RANGER]: isKnown ? (
            <LuLightbulbOff className="mr-2 h-5 w-5" />
        ) : (
            <LuLightbulb className="mr-2 h-5 w-5" />
        ),
        [ClassType.BARD]: isKnown ? (
            <LuLightbulbOff className="mr-2 h-5 w-5" />
        ) : (
            <LuLightbulb className="mr-2 h-5 w-5" />
        ),
        [ClassType.DRUID]: isPrepared ? (
            <LuSparkle className="mr-2 h-5 w-5 rotate-45" />
        ) : (
            <LuSparkle className="mr-2 h-5 w-5" />
        ),
        [ClassType.WARLOCK]: isKnown ? (
            <LuLightbulbOff className="mr-2 h-5 w-5" />
        ) : (
            <LuLightbulb className="mr-2 h-5 w-5" />
        ),
    };

    const addSpellAction: Record<ClassType, () => void> = {
        [ClassType.WIZARD]: () => (isKnown ? onForgetSpell() : onLearnSpell(false, false)),
        [ClassType.SORCERER]: () => (isKnown ? onForgetSpell() : onLearnSpell(false, false)),
        [ClassType.CLERIC]: () => (isPrepared ? onUnprepareSpell() : onPrepareSpell(false, false, false)),
        [ClassType.PALADIN]: () => (isPrepared ? onUnprepareSpell() : onPrepareSpell(false, false, false)),
        [ClassType.RANGER]: () => (isKnown ? onForgetSpell() : onLearnSpell(false, false)),
        [ClassType.BARD]: () => (isKnown ? onForgetSpell() : onLearnSpell(false, false)),
        [ClassType.DRUID]: () => (isPrepared ? onUnprepareSpell() : onPrepareSpell(false, false, false)),
        [ClassType.WARLOCK]: () => (isKnown ? onForgetSpell() : onLearnSpell(false, false)),
    };

    const spellMini = (className?: string) => (
        <div className={cn("flex w-fit items-center gap-2", className)}>
            {smallIcon}

            <p className="w-full truncate font-medium tracking-wide mouse:group-hover:opacity-0">{name[language]}</p>
        </div>
    );

    return (
        <>
            <div className="spell flex flex-col items-center gap-2">
                <Popover modal={true} open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger
                        className={cn(
                            "focus-shadow group relative flex w-full flex-col items-center rounded-md p-2",
                            (isKnown || isPrepared || isOathOrDomain) && "bg-stone-150 dark:bg-stone-900",
                        )}
                    >
                        <div
                            className="inline-block h-20 min-h-20 w-20 min-w-20 bg-cover brightness-90 dark:brightness-100 sm:h-24 sm:min-h-24 sm:w-24 sm:min-w-24 mouse:transition-transform mouse:group-hover:scale-110"
                            style={{
                                backgroundImage: `url(/spell/${icon})`,
                                maskImage: `url(/spell/${icon})`,
                                maskMode: "alpha",
                                maskSize: "cover",
                                backgroundBlendMode: "luminosity",
                                backgroundColor: getSpellRawColor(color),
                            }}
                        />

                        <h3
                            className={cn(
                                "w-full overflow-hidden text-ellipsis text-center text-sm font-semibold",
                                getSpellColorOnHover(spell.color),
                            )}
                        >
                            {name[language]}
                        </h3>
                    </PopoverTrigger>

                    <PopoverContent className="mx-2 my-3">
                        {spellMini("mb-2 w-full border-b border-stone-300 px-2 pb-2 dark:border-stone-700")}

                        {isCantrip && (
                            <Button
                                variant="menu"
                                size="menu"
                                onClick={() => (isKnownCantrip ? onForgetCantrip() : onAddCantrip(false))}
                            >
                                {isKnownCantrip ? (
                                    <LuZapOff className="mr-2 h-5 w-5" />
                                ) : (
                                    <LuZap className="mr-2 h-5 w-5" />
                                )}
                                <p className="font-medium tracking-wide">
                                    {isKnownCantrip
                                        ? t.dnd.spell.removeCantrip
                                        : `${t.dnd.spell.addCantrip} (${knownCantrips}/${maxKnownCantrips})`}
                                </p>
                            </Button>
                        )}

                        {!isCantrip && (
                            <>
                                {(![ClassType.CLERIC, ClassType.PALADIN].includes(character.class) ||
                                    !isOathOrDomain) && (
                                    <Button variant="menu" size="menu" onClick={addSpellAction[character.class]}>
                                        {addSpellIcon[character.class]}
                                        <p className="font-medium tracking-wide">{addSpellText[character.class]}</p>
                                    </Button>
                                )}

                                {character.class === ClassType.CLERIC && !isPrepared && (
                                    <Button
                                        variant="menu"
                                        size="menu"
                                        onClick={() =>
                                            isOathOrDomain ? onUnprepareSpell() : onPrepareSpell(false, false, true)
                                        }
                                    >
                                        {isOathOrDomain ? (
                                            <LuX className="mr-2 h-5 w-5" />
                                        ) : (
                                            <LuLoader className="mr-2 h-5 w-5" />
                                        )}
                                        <p className="font-medium tracking-wide">
                                            {isOathOrDomain
                                                ? t.dnd.spell.unprepareFromDomain
                                                : `${t.dnd.spell.prepareAsDomain} (${oathOrDomainSpells})`}
                                        </p>
                                    </Button>
                                )}

                                {character.class === ClassType.PALADIN && !isPrepared && (
                                    <Button
                                        variant="menu"
                                        size="menu"
                                        onClick={() =>
                                            isOathOrDomain ? onUnprepareSpell() : onPrepareSpell(false, false, true)
                                        }
                                    >
                                        {isOathOrDomain ? (
                                            <LuX className="mr-2 h-5 w-5" />
                                        ) : (
                                            <LuSwords className="mr-2 h-5 w-5" />
                                        )}
                                        <p className="font-medium tracking-wide">
                                            {isOathOrDomain
                                                ? t.dnd.spell.unprepareFromOath
                                                : `${t.dnd.spell.prepareAsOath} (${oathOrDomainSpells})`}
                                        </p>
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
                        <DialogTitle>{spellMini()}</DialogTitle>
                    </DialogHeader>

                    <p className="text-sm opacity-80">{t.dnd.spell.cannotLearn}</p>

                    <DialogFooter className="flex w-full flex-row justify-end gap-2 pt-4">
                        <DialogClose asChild>
                            <Button variant="default">{t.form.cancel}</Button>
                        </DialogClose>

                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => {
                                setLearnDialogOpen(false);
                                onLearnSpell(true, false);
                            }}
                        >
                            <LuLightbulb className="mr-2 h-5 w-5" />
                            {t.dnd.spell.learnAnyway}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={prepareDialogOpen} onOpenChange={setPrepareDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{spellMini()}</DialogTitle>
                    </DialogHeader>

                    <p className="text-sm opacity-70">{t.dnd.spell.cannotPrepare}</p>

                    <DialogFooter className="flex w-full flex-row justify-end gap-2 pt-4">
                        <DialogClose asChild>
                            <Button variant="default">{t.form.cancel}</Button>
                        </DialogClose>

                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => {
                                setPrepareDialogOpen(false);
                                onPrepareSpell(true, false, false);
                            }}
                        >
                            <LuSparkle className="mr-2 h-5 w-5" />
                            {t.dnd.spell.prepareAnyway}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={cantripDialogOpen} onOpenChange={setCantripDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{spellMini()}</DialogTitle>
                    </DialogHeader>

                    <p className="text-sm opacity-70">{t.dnd.spell.cannotAddCantrip}</p>

                    <DialogFooter className="flex w-full flex-row justify-end gap-2 pt-4">
                        <DialogClose asChild>
                            <Button variant="default">{t.form.cancel}</Button>
                        </DialogClose>

                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => {
                                setCantripDialogOpen(false);
                                onAddCantrip(true);
                            }}
                        >
                            <LuZap className="mr-2 h-5 w-5" />
                            {t.dnd.spell.addCantripAnyway}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={learnHigherLevelDialogOpen} onOpenChange={setLearnHigherLevelDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{spellMini()}</DialogTitle>
                    </DialogHeader>

                    <p className="text-sm opacity-70">
                        {t.dnd.spell.learnSpellLevelTooHigh.replace(
                            "{{PARAM}}",
                            (highestLevelSpellSlot + 1).toString(),
                        )}
                    </p>

                    <DialogFooter className="flex w-full flex-row justify-end gap-2 pt-4">
                        <DialogClose asChild>
                            <Button variant="default">{t.form.cancel}</Button>
                        </DialogClose>

                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => {
                                setLearnHigherLevelDialogOpen(false);
                                onLearnSpell(true, true);
                            }}
                        >
                            <LuLightbulb className="mr-2 h-5 w-5" />
                            {t.dnd.spell.learnAnyway}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={prepareHigherLevelDialogOpen} onOpenChange={setPrepareHigherLevelDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{spellMini()}</DialogTitle>
                    </DialogHeader>

                    <p className="text-sm opacity-70">
                        {t.dnd.spell.prepareSpellLevelTooHigh.replace(
                            "{{PARAM}}",
                            (highestLevelSpellSlot + 1).toString(),
                        )}
                    </p>

                    <DialogFooter className="flex w-full flex-row justify-end gap-2 pt-4">
                        <DialogClose asChild>
                            <Button variant="default">{t.form.cancel}</Button>
                        </DialogClose>

                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => {
                                setPrepareHigherLevelDialogOpen(false);
                                onPrepareSpell(true, true, false);
                            }}
                        >
                            <LuSparkle className="mr-2 h-5 w-5" />
                            {t.dnd.spell.prepareAnyway}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UnknownSpell;
