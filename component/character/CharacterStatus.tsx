import { getClassIcon } from "@/component/character/CharacterItem";
import { Button } from "@/component/ui/button";
import { useTranslation } from "@/hook/useTranslation";
import { getAbility, getClassBackgroundColor, getClassColorOnHover, getTotalSpellSlots } from "@/lib/character";
import { cn } from "@/lib/util";
import { CharacterWithSpells } from "@/type/Character";
import { Language } from "@/type/Language";
import { LuPencil } from "react-icons/lu";

interface CommonProps {
    language: Language;
}

interface LoadingProps {
    isLoading: true;
}

interface DefaultProps {
    isLoading?: false;
    character: CharacterWithSpells;
}

type Props = CommonProps & (LoadingProps | DefaultProps);

const CharacterStatus = (props: Props) => {
    const { isLoading, language } = props;

    const { t } = useTranslation(language);

    if (isLoading) return <div className="skeleton flex h-[5.5rem] min-h-[5.5rem] w-full rounded border" />;

    const { id, name, class: characterClass, level, ability, spellSlotsAvailable } = props.character;

    return (
        <div className="fixed flex w-full max-w-screen-lg flex-col items-center gap-4 rounded border-b border-stone-300 bg-stone-100 p-3 dark:border-stone-700 dark:bg-stone-950 sm:justify-between sm:p-4 md:flex-row mouse:top-16">
            <div className="relative flex w-full items-center justify-between gap-6 md:w-fit md:justify-normal">
                <div className="flex items-center gap-3">
                    {getClassIcon(characterClass, "h-9 min-h-9 w-9 -my-2 -mx-1")}

                    <div className="flex items-baseline gap-3 sm:gap-4">
                        <h3 className={`font-semibold ${getClassColorOnHover(characterClass)}`}>{name}</h3>

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

                <Button variant="outline" size="icon" className="-mx-2 -my-2">
                    <LuPencil className="h-4 w-4" />
                </Button>
            </div>

            <div className="relative flex w-full items-start justify-between sm:gap-x-4 md:w-fit md:justify-normal lg:gap-x-6">
                {spellSlotsAvailable &&
                    Object.keys(spellSlotsAvailable)
                        .sort()
                        .map((slotLevel) => {
                            const maxSpellSlots = getTotalSpellSlots(characterClass, level)[
                                slotLevel as keyof typeof spellSlotsAvailable
                            ];
                            const availableSpellSlots =
                                spellSlotsAvailable[slotLevel as keyof typeof spellSlotsAvailable];

                            if (maxSpellSlots === 0) return null;

                            return (
                                <div
                                    key={slotLevel}
                                    className="relative flex w-7 min-w-7 max-w-7 flex-col items-center justify-center rounded-md text-sm font-semibold"
                                >
                                    {slotLevel.replace(/\D/g, "")}

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
