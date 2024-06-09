import { useTranslation } from "@/hook/useTranslation";
import { getSpellColorOnHover, getSpellRawColor } from "@/lib/spell";
import { cn } from "@/lib/util";
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

const UserSpellItem = ({ spell, language, children }: Props) => {
    const { t } = useTranslation(language);
    const { index, icon, color, name } = spell;

    return (
        // Add anim-enter-view to use scroll animation
        <div className="spell flex flex-col items-center gap-2">
            <Link
                href={`/${language}${Route.SPELL}/${index}`}
                className="focus-shadow group relative flex w-full flex-col items-center rounded-md  p-2"
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
                        "w-full overflow-hidden text-ellipsis text-center text-sm font-semibold leading-tight",
                        getSpellColorOnHover(spell.color),
                    )}
                >
                    {name[language]}
                </h3>
            </Link>

            {children}
        </div>
    );
};

export default UserSpellItem;
