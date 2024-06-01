import HigherLevelDialog from "@/component/spell/HigherLevelDialog";
import { Button } from "@/component/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/component/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/component/ui/popover";
import { SpellToast, ToastWrapper } from "@/component/ui/toast";
import { useTranslation } from "@/hook/useTranslation";
import {
    getSpellBackground,
    getSpellBackgroundOnHover,
    getSpellBorderOnHover,
    getSpellColorOnHover,
    getSpellRawColor,
} from "@/lib/spell";
import { cn } from "@/lib/util";
import { useForgetCantrip } from "@/server/use/useForgetCantrip";
import { useForgetSpell } from "@/server/use/useForgetSpell";
import { useUnprepareSpell } from "@/server/use/useUnprepareSpell";
import { useUpdateSpellSlots } from "@/server/use/useUpdateSpellSlots";
import { CharacterWithSpells } from "@/type/Character";
import { Language } from "@/type/Language";
import { Route } from "@/type/Route";
import { ClassType, Spell } from "@/type/Spell";
import { getSpellSlotKey } from "@/type/SpellSlots";
import Link from "next/link";
import { ReactNode, useMemo, useState } from "react";
import { LuLightbulbOff, LuLoader, LuSparkle, LuView, LuX, LuZapOff } from "react-icons/lu";
import { PiPentagram } from "react-icons/pi";
import { toast } from "sonner";

interface Props {
    spell: Spell;
    language: Language;
    character: CharacterWithSpells;
    showUncastable: boolean;
}

const CastableSpell = ({ spell, language, character, showUncastable }: Props) => {
    const { t } = useTranslation(language);
    const { index, icon, color, name, level, ritual: isRitual, highLevelDescription, onlyRitual } = spell;

    const [spellPopoverOpen, setSpellPopoverOpen] = useState(false);
    const [castWithHigherLevelSlotDialogOpen, setCastWithHigherLevelSlotDialogOpen] = useState(false);
    const [removeSpellDialogOpen, setRemoveSpellDialogOpen] = useState(false);
    const openRemoveSpellDialog = () => {
        setSpellPopoverOpen(false);
        setRemoveSpellDialogOpen(true);
    };

    const isCantrip = level === 0;
    const isPrepared = character.preparedSpells.some(
        ({ index: spellIndex, counts }) => spellIndex === index && !!counts,
    );
    const isOathOrDomain = character.preparedSpells.some(
        ({ index: spellIndex, counts }) => spellIndex === index && !counts,
    );

    const forgetSpell = useForgetSpell();
    const unprepareSpell = useUnprepareSpell();
    const forgetCantrip = useForgetCantrip();
    const updateSpellSlots = useUpdateSpellSlots();

    const spendSpellSlot = (castedSpellLevel: number) => {
        const spellSlotKey = getSpellSlotKey(castedSpellLevel);
        updateSpellSlots.mutate({
            characterId: character.id,
            id: character.spellSlotsAvailableId,
            ...character.spellSlotsAvailable,
            [spellSlotKey]: Math.max(0, character.spellSlotsAvailable[spellSlotKey] - 1),
        });
    };

    const onForgetSpell = () => {
        setSpellPopoverOpen(false);
        forgetSpell.mutate({ characterId: character.id, spellIndex: index });
        toast.custom((currToast) => (
            <ToastWrapper onClose={() => toast.dismiss(currToast)}>
                <SpellToast
                    icon={smallIcon}
                    message={t.dnd.spell.toast.forget.replace("{{PARAM}}", spell.name[language])}
                />
            </ToastWrapper>
        ));
    };

    const onUnprepareSpell = () => {
        setSpellPopoverOpen(false);
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

    const onForgetCantrip = () => {
        setSpellPopoverOpen(false);
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

    const cast = (castedSpellLevel: number) => {
        setCastWithHigherLevelSlotDialogOpen(false);
        if (castedSpellLevel > 0) spendSpellSlot(castedSpellLevel);

        toast.custom((currToast) => (
            <ToastWrapper onClose={() => toast.dismiss(currToast)} className={cn(getSpellBackground(color))}>
                <SpellToast
                    icon={smallIcon}
                    message={(castedSpellLevel === -1
                        ? t.dnd.spell.toast.castAsRitual
                        : castedSpellLevel === 0
                          ? t.dnd.spell.toast.castAsCantrip
                          : t.dnd.spell.toast.cast
                    ).replace("{{PARAM}}", spell.name[language])}
                />
            </ToastWrapper>
        ));
    };

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

    const spellMini = (className?: string) => (
        <div className={cn("flex w-fit items-center gap-2", className)}>
            {smallIcon}

            <p className="w-full truncate font-medium tracking-wide mouse:group-hover:opacity-0">{name[language]}</p>
        </div>
    );

    const removeSpellText: Record<ClassType, string> = {
        [ClassType.WIZARD]: t.dnd.spell.unprepare,
        [ClassType.SORCERER]: t.dnd.spell.forget,
        [ClassType.CLERIC]: t.dnd.spell.unprepare,
        [ClassType.PALADIN]: t.dnd.spell.unprepare,
        [ClassType.RANGER]: t.dnd.spell.forget,
        [ClassType.BARD]: t.dnd.spell.forget,
        [ClassType.DRUID]: t.dnd.spell.unprepare,
        [ClassType.WARLOCK]: t.dnd.spell.forget,
    };

    const removeSpellConfirmationText: Record<ClassType, string> = {
        [ClassType.WIZARD]: t.dnd.spell.confirmation.unprepare,
        [ClassType.SORCERER]: t.dnd.spell.confirmation.forget,
        [ClassType.CLERIC]: t.dnd.spell.confirmation.unprepare,
        [ClassType.PALADIN]: t.dnd.spell.confirmation.unprepare,
        [ClassType.RANGER]: t.dnd.spell.confirmation.forget,
        [ClassType.BARD]: t.dnd.spell.confirmation.forget,
        [ClassType.DRUID]: t.dnd.spell.confirmation.unprepare,
        [ClassType.WARLOCK]: t.dnd.spell.confirmation.forget,
    };

    const removeSpellIcon: Record<ClassType, ReactNode> = {
        [ClassType.WIZARD]: <LuSparkle className="mr-2 h-5 w-5 rotate-45" />,
        [ClassType.SORCERER]: <LuLightbulbOff className="mr-2 h-5 w-5" />,
        [ClassType.CLERIC]: <LuSparkle className="mr-2 h-5 w-5 rotate-45" />,
        [ClassType.PALADIN]: <LuSparkle className="mr-2 h-5 w-5 rotate-45" />,
        [ClassType.RANGER]: <LuLightbulbOff className="mr-2 h-5 w-5" />,
        [ClassType.BARD]: <LuLightbulbOff className="mr-2 h-5 w-5" />,
        [ClassType.DRUID]: <LuSparkle className="mr-2 h-5 w-5 rotate-45" />,
        [ClassType.WARLOCK]: <LuLightbulbOff className="mr-2 h-5 w-5" />,
    };

    const removeSpellAction: Record<ClassType, () => void> = {
        [ClassType.WIZARD]: onUnprepareSpell,
        [ClassType.SORCERER]: onForgetSpell,
        [ClassType.CLERIC]: onUnprepareSpell,
        [ClassType.PALADIN]: onUnprepareSpell,
        [ClassType.RANGER]: onForgetSpell,
        [ClassType.BARD]: onForgetSpell,
        [ClassType.DRUID]: onUnprepareSpell,
        [ClassType.WARLOCK]: onForgetSpell,
    };

    const isCastable = useMemo(() => {
        if (level === 0 || isRitual) return true;
        for (let i = level; i <= 9; i++) if (character.spellSlotsAvailable[getSpellSlotKey(i)] > 0) return true;
        return false;
    }, [character.spellSlotsAvailable, isRitual, level]);

    const minLevelToCast = useMemo(() => {
        if (level === 0) return 0;
        for (let i = level; i <= 9; i++) if (character.spellSlotsAvailable[getSpellSlotKey(i)] > 0) return i;
        return false;
    }, [character.spellSlotsAvailable, level]);

    const higherSpellSlotsAvailable = useMemo(() => {
        for (let i = level + 1; i <= 9; i++) if (character.spellSlotsAvailable[getSpellSlotKey(i)] > 0) return true;
        return false;
    }, [character.spellSlotsAvailable, level]);

    const canCastHigher = higherSpellSlotsAvailable && highLevelDescription;

    const canOnlyCastRitual = onlyRitual || (isRitual && minLevelToCast !== level && !canCastHigher);

    if (!showUncastable && !isCastable) return null;

    return (
        <div className="spell flex items-center justify-between rounded-lg border border-stone-200 bg-stone-50 dark:border-stone-900 dark:bg-[#141210]">
            <Popover modal={true} open={spellPopoverOpen} onOpenChange={setSpellPopoverOpen}>
                <PopoverTrigger className="focus-shadow group relative flex w-full items-center gap-2 rounded-md p-2">
                    <div
                        className="inline-block h-14 min-h-14 w-14 min-w-14 bg-cover brightness-90 dark:brightness-100 mouse:transition-transform mouse:group-hover:scale-110"
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
                            "w-full overflow-hidden text-ellipsis text-left text-sm font-semibold",
                            getSpellColorOnHover(spell.color),
                        )}
                    >
                        {name[language]}
                    </h3>
                </PopoverTrigger>

                <PopoverContent className="mx-2 my-3" align="start">
                    {spellMini("mb-2 w-full border-b border-stone-300 px-2 pb-2 dark:border-stone-700")}

                    {isCantrip && (
                        <Button variant="menu" size="menu" onClick={openRemoveSpellDialog}>
                            <LuZapOff className="mr-2 h-5 w-5" />
                            <p className="font-medium tracking-wide">{t.dnd.spell.removeCantrip}</p>
                        </Button>
                    )}

                    {!isCantrip && (
                        <>
                            {(![ClassType.CLERIC, ClassType.PALADIN].includes(character.class) || !isOathOrDomain) && (
                                <Button variant="menu" size="menu" onClick={openRemoveSpellDialog}>
                                    {removeSpellIcon[character.class]}
                                    <p className="font-medium tracking-wide">{removeSpellText[character.class]}</p>
                                </Button>
                            )}

                            {character.class === ClassType.CLERIC && !isPrepared && (
                                <Button variant="menu" size="menu" onClick={openRemoveSpellDialog}>
                                    <LuX className="mr-2 h-5 w-5" />
                                    <p className="font-medium tracking-wide">{t.dnd.spell.unprepareFromDomain}</p>
                                </Button>
                            )}

                            {character.class === ClassType.PALADIN && !isPrepared && (
                                <Button variant="menu" size="menu" onClick={openRemoveSpellDialog}>
                                    <LuX className="mr-2 h-5 w-5" />
                                    <p className="font-medium tracking-wide">{t.dnd.spell.unprepareFromOath}</p>
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

            <div className="flex h-fit w-fit min-w-fit gap-2 p-2">
                {!canOnlyCastRitual && (
                    <Button
                        variant={"outline"}
                        disabled={!isCastable}
                        className={cn(
                            getSpellColorOnHover(color),
                            getSpellBorderOnHover(color),
                            getSpellBackgroundOnHover(color),
                            !isCastable && "bg-red-500/30 !opacity-100 dark:bg-red-500/40",
                        )}
                        onClick={() => {
                            isRitual || canCastHigher || minLevelToCast !== level
                                ? setCastWithHigherLevelSlotDialogOpen(true)
                                : cast(level);
                        }}
                    >
                        {!!isCastable ? (
                            <LuLoader className="mr-3 h-4 w-4 stroke-[3]" />
                        ) : (
                            <LuX className="mr-3 h-4 w-4 stroke-[3]" />
                        )}

                        {t.dnd.spell.cast}
                    </Button>
                )}

                {canOnlyCastRitual && (
                    <Button
                        variant={"outline"}
                        className={cn(
                            getSpellColorOnHover(color),
                            getSpellBorderOnHover(color),
                            getSpellBackgroundOnHover(color),
                        )}
                        onClick={() => cast(-1)}
                    >
                        <PiPentagram className="mr-3 h-4 w-4 stroke-[3]" />
                        {t.dnd.cast.ritual}
                    </Button>
                )}
            </div>

            {castWithHigherLevelSlotDialogOpen && (
                <HigherLevelDialog
                    spell={spell}
                    language={Language.ES}
                    spellMini={spellMini}
                    open={castWithHigherLevelSlotDialogOpen}
                    onOpenChange={setCastWithHigherLevelSlotDialogOpen}
                    cast={cast}
                    availableSpellSlots={character.spellSlotsAvailable}
                />
            )}

            <Dialog open={removeSpellDialogOpen} onOpenChange={setRemoveSpellDialogOpen}>
                <DialogContent>
                    <DialogHeader className="flex flex-row items-center gap-2">
                        <DialogTitle>{spellMini()}</DialogTitle>
                    </DialogHeader>

                    {isCantrip && <p className="px-2 opacity-75">{t.dnd.spell.confirmation.removeCantrip}</p>}

                    {!isCantrip && (
                        <>
                            {(![ClassType.CLERIC, ClassType.PALADIN].includes(character.class) || !isOathOrDomain) && (
                                <p className="px-2 opacity-75">{removeSpellConfirmationText[character.class]}</p>
                            )}

                            {character.class === ClassType.CLERIC && !isPrepared && (
                                <p className="px-2 opacity-75">{t.dnd.spell.confirmation.unprepareFromDomain}</p>
                            )}

                            {character.class === ClassType.PALADIN && !isPrepared && (
                                <p className="px-2 opacity-75">{t.dnd.spell.confirmation.unprepareFromOath}</p>
                            )}
                        </>
                    )}

                    <DialogFooter className="flex w-full flex-row justify-end gap-2 pt-4">
                        <DialogClose asChild>
                            <Button variant="outline">{t.form.cancel}</Button>
                        </DialogClose>

                        {isCantrip && (
                            <Button variant="destructive" onClick={onForgetCantrip}>
                                <LuZapOff className="mr-2 h-5 w-5" />
                                <p className="opacity-75">{t.dnd.spell.removeCantrip}</p>
                            </Button>
                        )}

                        {!isCantrip && (
                            <>
                                {(![ClassType.CLERIC, ClassType.PALADIN].includes(character.class) ||
                                    !isOathOrDomain) && (
                                    <Button variant="destructive" onClick={removeSpellAction[character.class]}>
                                        {removeSpellIcon[character.class]}
                                        <p className="font-medium tracking-wide">{removeSpellText[character.class]}</p>
                                    </Button>
                                )}

                                {character.class === ClassType.CLERIC && !isPrepared && (
                                    <Button variant="destructive" onClick={onUnprepareSpell}>
                                        <LuX className="mr-2 h-5 w-5" />
                                        <p className="font-medium tracking-wide">{t.dnd.spell.unprepareFromDomain}</p>
                                    </Button>
                                )}

                                {character.class === ClassType.PALADIN && !isPrepared && (
                                    <Button variant="destructive" onClick={onUnprepareSpell}>
                                        <LuX className="mr-2 h-5 w-5" />
                                        <p className="font-medium tracking-wide">{t.dnd.spell.unprepareFromOath}</p>
                                    </Button>
                                )}
                            </>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CastableSpell;
