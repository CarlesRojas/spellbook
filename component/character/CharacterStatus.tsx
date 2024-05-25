import { getClassIcon } from "@/component/character/CharacterItem";
import { Button } from "@/component/ui/button";
import { useTranslation } from "@/hook/useTranslation";
import { getAbility, getClassBackgroundColor, getTotalSpellSlots } from "@/lib/character";
import { cn } from "@/lib/util";
import { CharacterWithSpells } from "@/type/Character";
import { Language } from "@/type/Language";
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
}

type Props = CommonProps & (LoadingProps | DefaultProps);

const CharacterStatus = (props: Props) => {
    const { isLoading, language } = props;

    const { t } = useTranslation(language);

    if (isLoading) return <div className="skeleton flex h-[5.5rem] min-h-[5.5rem] w-full rounded border" />;

    const { id, name, class: characterClass, level, ability, spellSlotsAvailable } = props.character;

    return (
        <div className="fixed flex w-full max-w-screen-lg flex-col items-center gap-2 border-b border-stone-300 bg-stone-100 p-3 dark:border-stone-700 dark:bg-stone-950 sm:flex-row sm:justify-between sm:gap-4 sm:border-none sm:p-4 mouse:top-16">
            <div className="relative flex w-full items-center gap-2 sm:w-fit">
                {getClassIcon(characterClass, "h-12 min-h-12 w-12 -my-2")}

                <div className="flex w-fit grow flex-col sm:grow-0">
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

                <Button variant="outline" size="icon" className="sm:ml-4">
                    <LuPencil className="h-4 w-4" />
                </Button>
            </div>

            <div className="relative flex h-fit w-full items-center justify-between sm:w-fit sm:justify-normal sm:gap-x-4 lg:gap-x-6">
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
                                return <div key={slotLevel} className="w-7 min-w-7 max-w-7 sm:hidden" />;

                            return (
                                <div
                                    key={slotLevel}
                                    className="relative flex h-full w-7 min-w-7 max-w-7 flex-col items-center justify-center rounded-md text-sm font-semibold"
                                >
                                    <p>{slotLevel.replace(/\D/g, "")}</p>

                                    <div className="flex w-full flex-wrap items-center justify-center gap-1">
                                        {Array.from({ length: Math.max(maxSpellSlots, 3) }).map((_, index) => (
                                            <div
                                                key={index}
                                                className={cn(
                                                    "h-3 max-h-3 min-h-3 w-3 min-w-3 max-w-3 rounded-full bg-stone-500/30",
                                                    index < availableSpellSlots &&
                                                        getClassBackgroundColor(characterClass),
                                                    index > maxSpellSlots &&
                                                        "pointer-events-none select-none opacity-0",
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

                <div className="relative flex h-full w-fit items-center justify-center ">
                    <Button variant="outline" size="icon" className="">
                        <PiCampfireDuotone className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CharacterStatus;
