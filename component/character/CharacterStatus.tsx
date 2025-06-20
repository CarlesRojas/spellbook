import { getClassIcon } from "@/component/character/CharacterItem";
import EditCharacterForm from "@/component/character/EditCharacterForm";
import { Button } from "@/component/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/component/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/component/ui/popover";
import { useTranslation } from "@/hook/useTranslation";
import {
    getAbility,
    getClassBackgroundColor,
    getClassBackgroundColorOnHover,
    getClassColorOnHover,
    getSaveDifficultyClass,
    getSpellAttackModifier,
    getTotalSpellSlots,
    showKnownSection,
    showPreparedSection,
} from "@/lib/character";
import { cn } from "@/lib/util";
import { useUpdateSpellSlots } from "@/server/use/useUpdateSpellSlots";
import { CharacterWithSpells } from "@/type/Character";
import { Language } from "@/type/Language";
import { ClassType, SpellSection } from "@/type/Spell";
import { SpellSlots } from "@/type/SpellSlots";
import { User } from "@/type/User";
import { useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import { PiCampfireDuotone } from "react-icons/pi";

interface CommonProps {
    language: Language;
}

interface LoadingProps {
    isLoading: true;
}

interface DefaultProps {
    isLoading?: false;
    character: CharacterWithSpells;
    user: User;
    spellSection: SpellSection;
    setSpellSection: (newState: SpellSection, scroll?: boolean) => void;
}

type Props = CommonProps & (LoadingProps | DefaultProps);

const CharacterStatus = (props: Props) => {
    const { isLoading, language } = props;
    const { t } = useTranslation(language);

    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const updateSpellSlots = useUpdateSpellSlots();

    if (isLoading) return <div className="skeleton flex h-[5.5rem] min-h-[5.5rem] w-full rounded border" />;

    const {
        id,
        name,
        class: characterClass,
        level,
        ability,
        spellSlotsAvailableId,
        spellSlotsAvailable,
    } = props.character;

    const longRest = () => {
        updateSpellSlots.mutate({
            characterId: id,
            id: spellSlotsAvailableId,
            ...getTotalSpellSlots(characterClass, level),
        });
    };

    const spendSpellSlot = (spellSlotLevel: keyof SpellSlots) => {
        updateSpellSlots.mutate({
            characterId: id,
            id: spellSlotsAvailableId,
            ...spellSlotsAvailable,
            [spellSlotLevel]: Math.max(0, spellSlotsAvailable[spellSlotLevel] - 1),
        });
    };

    const addSpellSlot = (spellSlotLevel: keyof SpellSlots) => {
        updateSpellSlots.mutate({
            characterId: id,
            id: spellSlotsAvailableId,
            ...spellSlotsAvailable,
            [spellSlotLevel]: Math.min(
                spellSlotsAvailable[spellSlotLevel] + 1,
                getTotalSpellSlots(characterClass, level)[spellSlotLevel],
            ),
        });
    };
    const showKnown = showKnownSection(characterClass);
    const showPrepared = showPreparedSection(characterClass);
    const numberOfSections = 1 + (showKnown ? 1 : 0) + (showPrepared ? 1 : 0);

    const getOathDomainText = () => {
        const map: Record<ClassType, string> = {
            [ClassType.WIZARD]: "",
            [ClassType.SORCERER]: "",
            [ClassType.CLERIC]: ` + ${t.dnd.character.domain}`,
            [ClassType.PALADIN]: ` + ${t.dnd.character.oath}`,
            [ClassType.RANGER]: "",
            [ClassType.BARD]: "",
            [ClassType.DRUID]: "",
            [ClassType.WARLOCK]: "",
        };

        return map[characterClass];
    };

    return (
        <div
            id="statusBar"
            className="sticky top-0 z-40 flex w-full max-w-screen-lg flex-col gap-4 border-b border-stone-300 bg-stone-100 p-4 dark:border-stone-700 dark:bg-stone-950 mouse:top-16"
        >
            <div className="flex w-full flex-col items-center gap-2 sm:gap-4 md:flex-row md:justify-between">
                <div className="relative flex w-full items-center gap-4 md:w-fit">
                    <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                        <DialogTrigger className="relative flex w-full items-center gap-2 md:w-fit">
                            {getClassIcon(characterClass, "h-12 min-h-12 w-12 -my-2")}

                            <div className="flex w-fit grow flex-col md:grow-0">
                                <h3 className="truncate text-left font-semibold">{name}</h3>

                                <div className="flex flex-wrap items-baseline gap-x-3 text-xs sm:gap-x-4 md:text-sm">
                                    <span className="flex gap-1">
                                        <span className="font-medium opacity-50">{t.dnd.level}</span>
                                        <strong className="font-semibold">{level}</strong>
                                    </span>

                                    <span className="flex gap-1">
                                        <span className="font-medium opacity-50">
                                            {t.enum.abilityShort[getAbility(characterClass)]}
                                        </span>
                                        <strong className="font-semibold">{ability}</strong>
                                    </span>

                                    <span className="flex gap-1">
                                        <span className="font-medium opacity-50">{t.dnd.character.attackModifier}</span>
                                        <strong className="font-semibold">
                                            +{getSpellAttackModifier(characterClass, ability, level)}
                                        </strong>
                                    </span>

                                    <span className="flex gap-1">
                                        <span className="font-medium opacity-50">
                                            {t.dnd.character.saveDifficultyClass}
                                        </span>
                                        <strong className="font-semibold">
                                            {getSaveDifficultyClass(characterClass, ability, level)}
                                        </strong>
                                    </span>
                                </div>
                            </div>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader className="flex flex-row items-center gap-2">
                                {getClassIcon(characterClass, "h-8 min-h-8 w-8")}

                                <DialogTitle>
                                    {t.form.edit} {name}
                                </DialogTitle>
                            </DialogHeader>

                            <EditCharacterForm
                                character={props.character}
                                user={props.user}
                                onClose={() => setEditDialogOpen(false)}
                                language={language}
                            />
                        </DialogContent>
                    </Dialog>

                    <Button variant="outline" size="icon" onClick={longRest}>
                        <PiCampfireDuotone className="h-5 w-5" />
                    </Button>
                </div>

                <div className="relative flex h-fit w-full min-w-fit items-start justify-between sm:gap-x-2 md:flex md:w-fit md:justify-end lg:gap-x-4">
                    {spellSlotsAvailable &&
                        Object.keys(spellSlotsAvailable)
                            .sort()
                            .map((slotLevel) => {
                                const maxSpellSlots = getTotalSpellSlots(characterClass, level)[
                                    slotLevel as keyof SpellSlots
                                ];
                                const availableSpellSlots = spellSlotsAvailable[slotLevel as keyof SpellSlots];

                                if (maxSpellSlots === 0)
                                    return <div key={slotLevel} className="w-7 min-w-7 max-w-7 md:hidden" />;

                                const slotLevelNumber = slotLevel.replace(/\D/g, "");

                                return (
                                    <Popover key={slotLevel} modal={true}>
                                        <PopoverTrigger asChild>
                                            <div className="group relative flex h-full w-9 min-w-9 max-w-9 flex-col items-center justify-start gap-y-1 rounded-md px-1 text-sm font-semibold mouse:cursor-pointer">
                                                <p className={getClassColorOnHover(characterClass)}>
                                                    {slotLevelNumber}
                                                </p>

                                                <div className="flex w-full flex-wrap items-center justify-center gap-1">
                                                    {Array.from({ length: maxSpellSlots }).map((_, index) => (
                                                        <div
                                                            key={index}
                                                            className={cn(
                                                                "h-3 max-h-3 min-h-3 w-3 min-w-3 max-w-3 rounded-full bg-stone-500/30",
                                                                index < availableSpellSlots &&
                                                                    getClassBackgroundColor(characterClass),
                                                            )}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </PopoverTrigger>

                                        <PopoverContent className="mx-2 my-3 flex min-w-fit flex-col gap-2 p-2">
                                            <p className="w-full p-0 text-center text-sm font-semibold">
                                                {t.dnd.character.level} {slotLevelNumber}
                                            </p>

                                            <div className="flex w-full items-center justify-center gap-1">
                                                {Array.from({ length: maxSpellSlots }).map((_, index) => (
                                                    <div
                                                        key={index}
                                                        className={cn(
                                                            "h-3 max-h-3 min-h-3 w-3 min-w-3 max-w-3 rounded-full bg-stone-500/30",
                                                            index < availableSpellSlots &&
                                                                getClassBackgroundColor(characterClass),
                                                        )}
                                                    />
                                                ))}
                                            </div>

                                            <div className="flex w-full gap-4 p-0">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="p-0"
                                                    disabled={availableSpellSlots === 0}
                                                    onClick={() => spendSpellSlot(slotLevel as keyof SpellSlots)}
                                                >
                                                    <LuMinus className="h-5 w-5" />
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="p-0"
                                                    disabled={availableSpellSlots === maxSpellSlots}
                                                    onClick={() => addSpellSlot(slotLevel as keyof SpellSlots)}
                                                >
                                                    <LuPlus className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                );
                            })}
                </div>
            </div>

            <div
                className="grid gap-2 sm:flex sm:justify-end"
                style={{ gridTemplateColumns: `repeat(${numberOfSections}, minmax(0, 1fr))` }}
            >
                <Button
                    variant="outline"
                    onClick={() => props.setSpellSection(SpellSection.ALL, true)}
                    className={cn(
                        "w-full tracking-wide sm:w-fit",
                        props.spellSection === SpellSection.ALL &&
                            `!border-transparent !text-white ${getClassBackgroundColor(characterClass)} ${getClassBackgroundColorOnHover(characterClass)}`,
                    )}
                >
                    {t.dnd.spell.all}
                </Button>

                {showKnown && (
                    <Button
                        variant="outline"
                        onClick={() => props.setSpellSection(SpellSection.KNOWN, true)}
                        className={cn(
                            "w-full tracking-wide sm:w-fit",
                            props.spellSection === SpellSection.KNOWN &&
                                `!border-transparent !text-white ${getClassBackgroundColor(characterClass)} ${getClassBackgroundColorOnHover(characterClass)}`,
                        )}
                    >
                        {characterClass === ClassType.WIZARD ? t.dnd.spell.spellbook : t.dnd.spell.known}
                    </Button>
                )}

                {showPrepared && (
                    <Button
                        variant="outline"
                        onClick={() => props.setSpellSection(SpellSection.PREPARED, true)}
                        className={cn(
                            "w-full tracking-wide sm:w-fit",
                            props.spellSection === SpellSection.PREPARED &&
                                `!border-transparent !text-white ${getClassBackgroundColor(characterClass)} ${getClassBackgroundColorOnHover(characterClass)}`,
                        )}
                    >
                        {`${t.dnd.spell.prepared}${getOathDomainText()}`}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CharacterStatus;
