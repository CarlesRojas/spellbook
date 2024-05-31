import { Button } from "@/component/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/component/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/component/ui/popover";
import { SpellToast, ToastWrapper } from "@/component/ui/toast";
import { useTranslation } from "@/hook/useTranslation";
import { getPreparedSpellsAmount } from "@/lib/character";
import { getSpellColorOnHover, getSpellRawColor } from "@/lib/spell";
import { cn } from "@/lib/util";
import { useForgetSpell } from "@/server/use/useForgetSpell";
import { usePrepareSpell } from "@/server/use/usePrepareSpell";
import { useUnprepareSpell } from "@/server/use/useUnprepareSpell";
import { CharacterWithSpells } from "@/type/Character";
import { Language } from "@/type/Language";
import { Route } from "@/type/Route";
import { Spell } from "@/type/Spell";
import Link from "next/link";
import { useState } from "react";
import { LuBookMinus, LuSparkle, LuView } from "react-icons/lu";
import { toast } from "sonner";

interface Props {
    spell: Spell;
    language: Language;
    character: CharacterWithSpells;
}

const BookSpell = ({ spell, language, character }: Props) => {
    const { t } = useTranslation(language);

    const { index, icon, color, name, level } = spell;

    const [popoverOpen, setPopoverOpen] = useState(false);

    const isPrepared = character.preparedSpells.some(
        ({ index: spellIndex, counts }) => spellIndex === index && !!counts,
    );
    const preparedSpells = character.preparedSpells.length;
    const maxPreparedSpells = getPreparedSpellsAmount(character.class, character.ability, character.level);

    const prepareSpell = usePrepareSpell();
    const forgetSpell = useForgetSpell();
    const unprepareSpell = useUnprepareSpell();

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

    const onForgetSpell = () => {
        setPopoverOpen(false);
        forgetSpell.mutate({ characterId: character.id, spellIndex: index });
        toast.custom((currToast) => (
            <ToastWrapper onClose={() => toast.dismiss(currToast)}>
                <SpellToast
                    icon={smallIcon}
                    message={t.dnd.spell.toast.removeFromSpellbook.replace("{{PARAM}}", spell.name[language])}
                />
            </ToastWrapper>
        ));
    };

    const [prepareDialogOpen, setPrepareDialogOpen] = useState(false);
    const onPrepareSpell = (bypassMax: boolean) => {
        setPopoverOpen(false);

        if (!bypassMax && preparedSpells >= maxPreparedSpells) return setPrepareDialogOpen(true);

        prepareSpell.mutate({
            characterId: character.id,
            spellIndex: index,
            counts: true,
            spell: { ...spell, counts: true },
        });
        toast.custom((currToast) => (
            <ToastWrapper onClose={() => toast.dismiss(currToast)}>
                <SpellToast
                    icon={smallIcon}
                    message={t.dnd.spell.toast.prepare.replace("{{PARAM}}", spell.name[language])}
                />
            </ToastWrapper>
        ));
    };
    const onUnprepareSpell = (showToast: boolean) => {
        setPopoverOpen(false);
        unprepareSpell.mutate({ characterId: character.id, spellIndex: index });
        showToast &&
            toast.custom((currToast) => (
                <ToastWrapper onClose={() => toast.dismiss(currToast)}>
                    <SpellToast
                        icon={smallIcon}
                        message={t.dnd.spell.toast.unprepare.replace("{{PARAM}}", spell.name[language])}
                    />
                </ToastWrapper>
            ));
    };

    const spellMini = (className?: string) => (
        <div className={cn("flex w-fit items-center gap-2", className)}>
            {smallIcon}

            <p className="w-full truncate font-medium tracking-wide mouse:group-hover:opacity-0">{name[language]}</p>
        </div>
    );

    return (
        <>
            <div className="flex flex-col items-center gap-2">
                <Popover modal={true} open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger
                        className={cn(
                            "focus-shadow group relative flex w-full flex-col items-center rounded-md p-2",
                            isPrepared && "bg-stone-900",
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

                        <Button
                            variant="menu"
                            size="menu"
                            onClick={() => (isPrepared ? onUnprepareSpell(true) : onPrepareSpell(false))}
                        >
                            {isPrepared ? (
                                <LuSparkle className="mr-2 h-5 w-5 rotate-45" />
                            ) : (
                                <LuSparkle className="mr-2 h-5 w-5" />
                            )}
                            <p className="font-medium tracking-wide">
                                {isPrepared
                                    ? t.dnd.spell.unprepare
                                    : `${t.dnd.spell.prepare} (${preparedSpells}/${maxPreparedSpells})`}
                            </p>
                        </Button>

                        <Button
                            variant="menu"
                            size="menu"
                            onClick={() => {
                                onForgetSpell();
                                onUnprepareSpell(false);
                            }}
                        >
                            <LuBookMinus className="mr-2 h-5 w-5" />
                            <p className="font-medium tracking-wide">{t.dnd.spell.removeFromSpellbook}</p>
                        </Button>

                        <Button asChild variant="menu" size="menu">
                            <Link href={`/${language}${Route.SPELL}/${index}`}>
                                <LuView className="mr-2 h-5 w-5" />
                                <p className="font-medium tracking-wide">{t.dnd.spell.view}</p>
                            </Link>
                        </Button>
                    </PopoverContent>
                </Popover>
            </div>

            <Dialog open={prepareDialogOpen} onOpenChange={setPrepareDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t.dnd.spell.cannotPrepare}</DialogTitle>
                    </DialogHeader>

                    <div className="ml-1 flex flex-col gap-2">{spellMini()}</div>

                    <DialogFooter className="flex w-full flex-row justify-end gap-2 pt-4">
                        <DialogClose asChild>
                            <Button variant="default">{t.form.cancel}</Button>
                        </DialogClose>

                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => {
                                setPrepareDialogOpen(false);
                                onPrepareSpell(true);
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

export default BookSpell;
