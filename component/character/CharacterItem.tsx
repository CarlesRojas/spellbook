import BardIcon from "@/asset/class/Bard.svg";
import ClericIcon from "@/asset/class/Cleric.svg";
import DruidIcon from "@/asset/class/Druid.svg";
import PaladinIcon from "@/asset/class/Paladin.svg";
import RangerIcon from "@/asset/class/Ranger.svg";
import SorcererIcon from "@/asset/class/Sorcerer.svg";
import WarlockIcon from "@/asset/class/Warlock.svg";
import WizardIcon from "@/asset/class/Wizard.svg";
import CharacterDropdownMenu from "@/component/character/CharacterDropdownMenu";
import { useTranslation } from "@/hook/useTranslation";
import { getAbility, getClassColor, getClassColorOnHover } from "@/lib/character";
import { cn } from "@/lib/util";
import { Character } from "@/type/Character";
import { Language } from "@/type/Language";
import { Route } from "@/type/Route";
import { ClassType } from "@/type/Spell";
import { User } from "@/type/User";
import Link from "next/link";
import { ReactElement } from "react";

interface CommonProps {
    language: Language;
    user: User;
    disabled?: boolean;
}

interface LoadingProps {
    isLoading: true;
}

interface DefaultProps {
    isLoading?: false;
    character: Character;
}

type Props = CommonProps & (LoadingProps | DefaultProps);

const CharacterItem = (props: Props) => {
    const { isLoading, language, user, disabled } = props;

    const { t } = useTranslation(language);

    if (isLoading) return <div className="skeleton flex h-[5.5rem] min-h-[5.5rem] w-full rounded border" />;

    const { id, name, class: characterClass, level, ability } = props.character;

    return (
        <div
            className={cn(
                "flex w-full items-center justify-between rounded border border-stone-300 bg-stone-50 dark:border-stone-700 dark:bg-black",
                disabled && "pointer-events-none animate-pulse select-none",
            )}
        >
            <Link
                href={`/${language}/${Route.CHARACTER}/${id}`}
                className="focus-shadow group flex grow items-center gap-2 rounded p-3"
            >
                {getClassIcon(characterClass, "mouse:transition-transform mouse:group-hover:scale-110")}

                <div className="relative flex flex-col gap-1">
                    <h3 className={`font-semibold sm:text-lg ${getClassColorOnHover(characterClass)}`}>{name}</h3>

                    <div className="flex items-baseline gap-3 text-sm sm:text-base">
                        <span className={`font-medium ${getClassColor(characterClass)}`}>
                            {t.enum.class[characterClass]}
                        </span>

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
            </Link>

            <div className="flex h-fit w-fit items-center gap-2 p-3">
                <CharacterDropdownMenu character={props.character} language={language} user={user} />
            </div>
        </div>
    );
};

export default CharacterItem;

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
