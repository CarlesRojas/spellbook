import { getClassIcon } from "@/component/character/CharacterItem";
import EditCharacterForm from "@/component/character/EditCharacterForm";
import { Button } from "@/component/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/component/ui/dialog";
import { useTranslation } from "@/hook/useTranslation";
import { getAbility, getClassBackgroundColor, getTotalSpellSlots } from "@/lib/character";
import { cn } from "@/lib/util";
import { useUpdateSpellSlots } from "@/server/use/useUpdateSpellSlots";
import { CharacterWithSpells } from "@/type/Character";
import { Language } from "@/type/Language";
import { User } from "@/type/User";
import { useState } from "react";
import { LuPencil } from "react-icons/lu";
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

    // const spendSpellSlot = (level: number) => {
    //     updateSpellSlots.mutate({
    //         characterId: id,
    //         id: spellSlotsAvailableId,
    //         ...getTotalSpellSlots(characterClass, level),
    //     });
    // };

    return (
        <div className="fixed flex w-full max-w-screen-lg flex-col items-center gap-2 bg-stone-100 p-3 dark:bg-stone-950 sm:p-4 md:flex-row md:justify-between md:gap-4 mouse:top-16">
            <div className="relative flex w-full items-center gap-2 md:w-fit">
                {getClassIcon(characterClass, "h-12 min-h-12 w-12 -my-2")}

                <div className="flex w-fit grow flex-col md:grow-0">
                    <h3 className="truncate font-semibold">{name}</h3>

                    <div className="flex items-baseline gap-3 sm:gap-4">
                        <span>
                            <span className="font-medium opacity-50">{t.dnd.level}</span>{" "}
                            <strong className="font-semibold">{level}</strong>
                        </span>

                        <span>
                            <span className="font-medium opacity-50">
                                {t.enum.abilityShort[getAbility(characterClass)]}
                            </span>{" "}
                            <strong className="font-semibold">{ability}</strong>
                        </span>
                    </div>
                </div>

                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="icon" className="sm:ml-4">
                            <LuPencil className="h-4 w-4" />
                        </Button>
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
                    <PiCampfireDuotone className="h-6 w-6" />
                </Button>
            </div>

            <div className="relative flex h-fit w-full min-w-fit items-start justify-between sm:gap-x-4 md:w-fit md:justify-end lg:gap-x-6">
                {spellSlotsAvailable &&
                    Object.keys(spellSlotsAvailable)
                        .sort()
                        .map((slotLevel) => {
                            const maxSpellSlots = getTotalSpellSlots(characterClass, level)[
                                slotLevel as keyof typeof spellSlotsAvailable
                            ];
                            const availableSpellSlots =
                                spellSlotsAvailable[slotLevel as keyof typeof spellSlotsAvailable];

                            if (maxSpellSlots === 0)
                                return <div key={slotLevel} className="w-7 min-w-7 max-w-7 md:hidden" />;

                            return (
                                <div
                                    key={slotLevel}
                                    className="relative flex h-full w-7 min-w-7 max-w-7 flex-col items-center justify-center rounded-md text-sm font-semibold"
                                >
                                    <p>{slotLevel.replace(/\D/g, "")}</p>

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
                            );
                        })}
            </div>
        </div>
    );
};

export default CharacterStatus;
