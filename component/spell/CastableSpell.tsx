import { Button } from "@/component/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/component/ui/popover";
import { useTranslation } from "@/hook/useTranslation";
import {
    getSpellColor,
    getSpellColorBackgroundOnHover,
    getSpellColorBorderOnHover,
    getSpellColorOnHover,
} from "@/lib/spell";
import { cn } from "@/lib/util";
import { useForgetCantrip } from "@/server/use/useForgetCantrip";
import { useForgetSpell } from "@/server/use/useForgetSpell";
import { useUnprepareSpell } from "@/server/use/useUnprepareSpell";
import { CharacterWithSpells } from "@/type/Character";
import { Language } from "@/type/Language";
import { Route } from "@/type/Route";
import { ClassType, Spell } from "@/type/Spell";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { LuBookMinus, LuLightbulbOff, LuLoader, LuView, LuX, LuZapOff } from "react-icons/lu";
import { toast } from "sonner";
import { SpellToast, ToastWrapper } from "../ui/toast";

interface Props {
    spell: Spell;
    language: Language;
    character: CharacterWithSpells;
}

const CastableSpell = ({ spell, language, character }: Props) => {
    const { t } = useTranslation(language);
    const { index, icon, color, name, level } = spell;

    const [popoverOpen, setPopoverOpen] = useState(false);

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

    const smallIcon = (
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
    );

    const spellMini = (className?: string) => (
        <div className={cn("flex w-fit items-center gap-2", className)}>
            {smallIcon}

            <p className="w-full truncate font-medium tracking-wide mouse:group-hover:opacity-0">{name[language]}</p>
        </div>
    );

    const removeSpellText: Record<ClassType, string> = {
        [ClassType.WIZARD]: t.dnd.spell.removeFromSpellbook,
        [ClassType.SORCERER]: t.dnd.spell.forget,
        [ClassType.CLERIC]: t.dnd.spell.unprepare,
        [ClassType.PALADIN]: t.dnd.spell.unprepare,
        [ClassType.RANGER]: t.dnd.spell.forget,
        [ClassType.BARD]: t.dnd.spell.forget,
        [ClassType.DRUID]: t.dnd.spell.unprepare,
        [ClassType.WARLOCK]: t.dnd.spell.forget,
    };

    const removeSpellIcon: Record<ClassType, ReactNode> = {
        [ClassType.WIZARD]: <LuBookMinus className="mr-2 h-5 w-5" />,
        [ClassType.SORCERER]: <LuLightbulbOff className="mr-2 h-5 w-5" />,
        [ClassType.CLERIC]: <LuLightbulbOff className="mr-2 h-5 w-5" />,
        [ClassType.PALADIN]: <LuLightbulbOff className="mr-2 h-5 w-5" />,
        [ClassType.RANGER]: <LuLightbulbOff className="mr-2 h-5 w-5" />,
        [ClassType.BARD]: <LuLightbulbOff className="mr-2 h-5 w-5" />,
        [ClassType.DRUID]: <LuLightbulbOff className="mr-2 h-5 w-5" />,
        [ClassType.WARLOCK]: <LuLightbulbOff className="mr-2 h-5 w-5" />,
    };

    const removeSpellAction: Record<ClassType, () => void> = {
        [ClassType.WIZARD]: onForgetSpell,
        [ClassType.SORCERER]: onForgetSpell,
        [ClassType.CLERIC]: onUnprepareSpell,
        [ClassType.PALADIN]: onUnprepareSpell,
        [ClassType.RANGER]: onForgetSpell,
        [ClassType.BARD]: onForgetSpell,
        [ClassType.DRUID]: onUnprepareSpell,
        [ClassType.WARLOCK]: onForgetSpell,
    };

    return (
        <div className="flex items-center justify-between rounded-lg border border-stone-200 bg-stone-50 dark:border-stone-900 dark:bg-[#141210]">
            <Popover modal={true} open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger className="focus-shadow group relative flex w-full items-center gap-2 rounded-md p-2">
                    <div
                        className="inline-block h-14 min-h-14 w-14 min-w-14 bg-cover brightness-90 dark:brightness-100 sm:h-16 sm:min-h-16 sm:w-16 sm:min-w-16 mouse:transition-transform mouse:group-hover:scale-110"
                        style={{
                            backgroundImage: `url(/spell/${icon})`,
                            maskImage: `url(/spell/${icon})`,
                            maskMode: "alpha",
                            maskSize: "cover",
                            backgroundBlendMode: "luminosity",
                            backgroundColor: getSpellColor(color),
                        }}
                    />

                    <h3
                        className={cn(
                            "w-full overflow-hidden text-ellipsis text-left text-sm font-semibold sm:text-base",
                            getSpellColorOnHover(spell.color),
                        )}
                    >
                        {name[language]}
                    </h3>
                </PopoverTrigger>

                <PopoverContent className="mx-2 my-3" align="start">
                    {spellMini("mb-2 w-full border-b border-stone-300 px-2 pb-2 dark:border-stone-700")}

                    {isCantrip && (
                        <Button variant="menu" size="menu" onClick={onForgetCantrip}>
                            <LuZapOff className="mr-2 h-5 w-5" />
                            <p className="font-medium tracking-wide">{t.dnd.spell.removeCantrip}</p>
                        </Button>
                    )}

                    {!isCantrip && (
                        <>
                            {(![ClassType.CLERIC, ClassType.PALADIN].includes(character.class) || !isOathOrDomain) && (
                                <Button variant="menu" size="menu" onClick={removeSpellAction[character.class]}>
                                    {removeSpellIcon[character.class]}
                                    <p className="font-medium tracking-wide">{removeSpellText[character.class]}</p>
                                </Button>
                            )}

                            {character.class === ClassType.CLERIC && !isPrepared && (
                                <Button variant="menu" size="menu" onClick={onUnprepareSpell}>
                                    <LuX className="mr-2 h-5 w-5" />
                                    <p className="font-medium tracking-wide">{t.dnd.spell.unprepareFromDomain}</p>
                                </Button>
                            )}

                            {character.class === ClassType.PALADIN && !isPrepared && (
                                <Button variant="menu" size="menu" onClick={onUnprepareSpell}>
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
                <Button
                    variant="outline"
                    className={cn(
                        getSpellColorOnHover(color),
                        getSpellColorBorderOnHover(color),
                        getSpellColorBackgroundOnHover(color),
                    )}
                >
                    <LuLoader className="mr-3 h-4 w-4 stroke-[3]" />
                    {t.dnd.spell.cast}
                </Button>
            </div>
        </div>
    );
};

export default CastableSpell;
