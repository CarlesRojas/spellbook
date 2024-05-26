import { Button } from "@/component/ui/button";
import { useTranslation } from "@/hook/useTranslation";
import {
    getSpellColor,
    getSpellColorBackgroundOnHover,
    getSpellColorBorderOnHover,
    getSpellColorOnHover,
} from "@/lib/spell";
import { cn } from "@/lib/util";
import { CharacterWithSpells } from "@/type/Character";
import { Language } from "@/type/Language";
import { Spell } from "@/type/Spell";
import Link from "next/link";
import { LuLoader } from "react-icons/lu";

interface Props {
    spell: Spell;
    language: Language;
    character: CharacterWithSpells;
}

const CastableSpell = ({ spell, language, character }: Props) => {
    const { t } = useTranslation(language);
    const { index, icon, color, name, school } = spell;

    return (
        <div className="flex items-center justify-between rounded border border-stone-300 bg-stone-50 dark:border-stone-700 dark:bg-black">
            <Link
                href={`/${language}/spell/${index}`}
                className="focus-shadow group flex grow items-center gap-2 p-2"
                scroll={false}
            >
                <div
                    className="inline-block h-16 min-h-16 w-16 min-w-16 bg-cover brightness-90 dark:brightness-100 mouse:transition-transform mouse:group-hover:scale-110"
                    style={{
                        backgroundImage: `url(/spell/${icon})`,
                        maskImage: `url(/spell/${icon})`,
                        maskMode: "alpha",
                        maskSize: "cover",
                        backgroundBlendMode: "luminosity",
                        backgroundColor: getSpellColor(color),
                    }}
                />

                <div className="relative flex flex-col">
                    <h3 className="user-select-none pointer-events-none font-semibold opacity-100 mouse:group-hover:opacity-0">
                        {name[language]}
                    </h3>

                    <h3
                        className="absolute z-10 hidden font-semibold opacity-0 brightness-[0.8] dark:brightness-100 mouse:block mouse:group-hover:opacity-100"
                        style={{
                            color: getSpellColor(color),
                        }}
                    >
                        {name[language]}
                    </h3>
                </div>
            </Link>

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
