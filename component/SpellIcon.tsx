import { useTranslation } from "@/hook/useTranslation";
import { getSpellColor } from "@/lib/spell";
import { Language } from "@/type/Language";
import { Spell } from "@/type/Spell";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
    spell: Spell;
    language: Language;
    children?: ReactNode;
}

const SpellRow = ({ spell, language, children }: Props) => {
    const { t } = useTranslation(language);
    const { index, icon, color, name, school } = spell;

    return (
        <div className="flex flex-col items-center gap-2">
            <Link
                href={`/${language}/spell/${index}`}
                className="focus-shadow group relative flex w-full flex-col items-center"
                scroll={false}
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
                    <h3 className="user-select-none pointer-events-none w-full text-center text-sm font-semibold opacity-75 mouse:group-hover:opacity-0">
                        {name}
                    </h3>

                    <h3
                        className="absolute z-10 hidden w-full text-center text-sm font-semibold opacity-0 brightness-[0.8] dark:brightness-100 mouse:block mouse:group-hover:opacity-100"
                        style={{
                            color: getSpellColor(color),
                        }}
                    >
                        {name}
                    </h3>
                </div>
            </Link>

            {children}
        </div>
    );
};

export default SpellRow;
