import BardIcon from "@/asset/class/Bard.svg";
import ClericIcon from "@/asset/class/Cleric.svg";
import DruidIcon from "@/asset/class/Druid.svg";
import PaladinIcon from "@/asset/class/Paladin.svg";
import RangerIcon from "@/asset/class/Ranger.svg";
import SorcererIcon from "@/asset/class/Sorcerer.svg";
import WarlockIcon from "@/asset/class/Warlock.svg";
import WizardIcon from "@/asset/class/Wizard.svg";
import { Button } from "@/component/ui/button";
import { useTranslation } from "@/hook/useTranslation";
import { getAbility, getClassColor, getClassColorOnHover } from "@/lib/character";
import { cn } from "@/lib/util";
import { Character } from "@/type/Character";
import { Language } from "@/type/Language";
import { Route } from "@/type/Route";
import { ClassType } from "@/type/Spell";
import Link from "next/link";
import { ReactElement } from "react";
import { LuMoreHorizontal } from "react-icons/lu";

interface Props {
    language: Language;
    character: Character;
}

export const getClassIcon = (classType: ClassType, className?: string) => {
    const map: Record<ClassType, ReactElement> = {
        [ClassType.WIZARD]: (
            <WizardIcon className={cn("h-16 min-h-16 w-16", getClassColor(ClassType.WIZARD), className)} />
        ),
        [ClassType.SORCERER]: (
            <SorcererIcon className={cn("h-16 min-h-16 w-16", getClassColor(ClassType.SORCERER), className)} />
        ),
        [ClassType.CLERIC]: (
            <ClericIcon className={cn("h-16 min-h-16 w-16", getClassColor(ClassType.CLERIC), className)} />
        ),
        [ClassType.PALADIN]: (
            <PaladinIcon className={cn("h-16 min-h-16 w-16", getClassColor(ClassType.PALADIN), className)} />
        ),
        [ClassType.RANGER]: (
            <RangerIcon className={cn("h-16 min-h-16 w-16", getClassColor(ClassType.RANGER), className)} />
        ),
        [ClassType.BARD]: <BardIcon className={cn("h-16 min-h-16 w-16", getClassColor(ClassType.BARD), className)} />,
        [ClassType.DRUID]: (
            <DruidIcon className={cn("h-16 min-h-16 w-16", getClassColor(ClassType.DRUID), className)} />
        ),
        [ClassType.WARLOCK]: (
            <WarlockIcon className={cn("h-16 min-h-16 w-16", getClassColor(ClassType.WARLOCK), className)} />
        ),
    };

    return map[classType];
};

const CharacterItem = ({ language, character }: Props) => {
    const { t } = useTranslation(language);
    const { id, name, class: characterClass, level, ability } = character;

    return (
        <div className="flex w-full items-center justify-between rounded border border-stone-300 bg-stone-50 dark:border-stone-700 dark:bg-stone-950">
            <Link
                href={`/${language}/${Route.CHARACTER}/${id}`}
                className="focus-shadow group flex grow items-center gap-3 p-3"
                scroll={false}
            >
                {getClassIcon(characterClass, "mouse:transition-transform mouse:group-hover:scale-110")}

                <div className="relative flex flex-col">
                    <h3 className={`font-semibold tracking-wide ${getClassColorOnHover(characterClass)}`}>{name}</h3>

                    <div className="flex gap-4">
                        <p>
                            <span className="text-sm font-semibold opacity-50">{t.dnd.level}</span>{" "}
                            <strong className="text-sm font-semibold">{level}</strong>
                        </p>

                        <p>
                            <span className="text-sm font-semibold opacity-50">
                                {t.enum.ability[getAbility(characterClass)]}
                            </span>{" "}
                            <strong className="text-sm font-semibold">{ability}</strong>
                        </p>
                    </div>
                </div>
            </Link>

            <div className="flex h-fit w-fit items-center gap-2 p-3">
                <Button variant="outline" size="icon">
                    <LuMoreHorizontal className="h-4 w-4 stroke-[3]" />
                </Button>
            </div>
        </div>
    );
};

export default CharacterItem;