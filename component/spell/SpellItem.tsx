import { useTranslation } from "@/hook/useTranslation";
import { getSpellColor } from "@/lib/spell";
import { Language } from "@/type/Language";
import { Route } from "@/type/Route";
import { Spell } from "@/type/Spell";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
    spell: Spell;
    language: Language;
    children?: ReactNode;
}

const SpellItem = ({ spell, language, children }: Props) => {
    const { t } = useTranslation(language);
    const { index, icon, color, name } = spell;

    return (
        <div className="anim-enter-view flex flex-col items-center gap-2">
            <Link
                href={`/${language}${Route.SPELL}/${index}`}
                className="focus-shadow group relative flex w-full flex-col items-center rounded-md p-2"
            >
                <div
                    className="inline-block h-20 min-h-20 w-20 min-w-20 bg-cover brightness-90 dark:brightness-100 sm:h-24 sm:min-h-24 sm:w-24 sm:min-w-24 mouse:transition-transform mouse:group-hover:scale-110"
                    style={{
                        backgroundImage: `url(/spell/${icon})`,
                        maskImage: `url(/spell/${icon})`,
                        maskMode: "alpha",
                        maskSize: "cover",
                        backgroundBlendMode: "luminosity",
                        backgroundColor: getSpellColor(color),
                    }}
                />

                <div className="relative flex w-full">
                    <h3 className="w-full text-center text-sm font-semibold opacity-75 mouse:group-hover:opacity-0">
                        {name[language]}
                    </h3>

                    <h3
                        className="pointer-events-none absolute z-10 hidden w-full select-none text-center text-sm font-semibold opacity-0 brightness-[0.8] dark:brightness-100 mouse:block mouse:group-hover:opacity-100"
                        style={{
                            color: getSpellColor(color),
                        }}
                    >
                        {name[language]}
                    </h3>
                </div>
            </Link>

            {children}
        </div>
    );
};

export default SpellItem;
