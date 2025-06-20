"use client";

import ScrollToTop from "@/component/ScrollToTop";
import QueryFilter from "@/component/filter/QueryFilter";
import SpellItem from "@/component/spell/SpellItem";
import { useTranslation } from "@/hook/useTranslation";
import { useUrlState } from "@/hook/useUrlState";
import { getSpellsByLevel } from "@/lib/spell";
import { cn } from "@/lib/util";
import { GetAllSpellsReturnType, useSpellsPreloaded, useUserSpells } from "@/server/use/useSpells";
import { useUser } from "@/server/use/useUser";
import { Language } from "@/type/Language";
import { z } from "zod";

interface Props {
    language: Language;
    initialSpellsData: GetAllSpellsReturnType;
}

const SpellList = ({ language, initialSpellsData }: Props) => {
    const { t } = useTranslation(language);

    const [query, setQuery] = useUrlState("query", "", z.string());

    const { user } = useUser();
    const spells = useSpellsPreloaded(initialSpellsData);
    const userSpells = useUserSpells(user.data?.id);

    const allSpells = [...spells.data];
    if (userSpells.data) allSpells.push(...userSpells.data);

    const filteredSpells = allSpells
        .filter((spell) => {
            if (query && !spell.name[language].toLowerCase().includes(query.toLowerCase())) return false;
            return true;
        })
        .sort((a, b) => {
            if (a.level === b.level) return a.name[language].localeCompare(b.name[language]);
            return a.level - b.level;
        });

    const spellsByLevel = getSpellsByLevel(filteredSpells);

    return (
        <section className="relative flex h-fit min-h-full w-full max-w-screen-lg flex-col p-4">
            <div className="flex w-full flex-col justify-end gap-2 md:flex-row">
                <QueryFilter language={language} query={query} setQuery={setQuery} />
            </div>

            <div className={cn("flex justify-end", spells.isLoading ? "pointer-events-none opacity-0" : "")}>
                <p className="text-sm font-medium tracking-wide opacity-60">
                    {filteredSpells.length > 0
                        ? `${filteredSpells.length} ${filteredSpells.length === 1 ? t.filter.result : t.filter.results}`
                        : `${t.filter.noResults}`}
                </p>
            </div>

            <div className="flex w-full flex-col gap-2">
                {Object.entries(spellsByLevel).map(([level, spells]) => (
                    <div
                        key={level}
                        className="hidden w-full grid-cols-3 gap-4 has-[.spell]:grid sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
                    >
                        <h2 className="sticky top-0 z-20 col-span-3 mt-4 w-full bg-stone-100 py-2 text-center text-lg font-bold tracking-wider text-sky-500 dark:bg-stone-950 sm:col-span-4 md:col-span-5 lg:col-span-6 mouse:top-16">
                            {level === "0" ? t.dnd.cantrips : `${t.filter.level} ${level}`}
                        </h2>

                        {spells.map((spell) => (
                            <SpellItem key={spell.index} language={language} spell={spell} />
                        ))}
                    </div>
                ))}
            </div>

            <ScrollToTop />
        </section>
    );
};

export default SpellList;
