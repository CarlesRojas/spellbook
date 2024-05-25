"use client";

import QueryFilter from "@/component/filter/QueryFilter";
import SortFilter from "@/component/filter/SortFilter";
import SpellItem from "@/component/spell/SpellItem";
import { useTranslation } from "@/hook/useTranslation";
import { useUrlState } from "@/hook/useUrlState";
import { cn } from "@/lib/util";
import { GetAllSpellsReturnType, useSpells } from "@/server/use/useSpells";
import { Language } from "@/type/Language";
import { Sort } from "@/type/Spell";
import { Fragment } from "react";
import { z } from "zod";

interface Props {
    language: Language;
    initialSpellsData: GetAllSpellsReturnType;
}

const SpellList = ({ language, initialSpellsData }: Props) => {
    const { t } = useTranslation(language);

    const [query, setQuery] = useUrlState("query", "", z.string());
    const [sort, setSort] = useUrlState("sort", Sort.LEVEL_ASC, z.nativeEnum(Sort));

    const spells = useSpells(initialSpellsData);
    const filteredSpells = spells.data
        .filter((spell) => {
            if (query && !spell.name[language].toLowerCase().includes(query.toLowerCase())) return false;
            return true;
        })
        .sort((a, b) => {
            switch (sort) {
                case Sort.LEVEL_ASC:
                    if (a.level === b.level) return a.name[language].localeCompare(b.name[language]);
                    return a.level - b.level;
                case Sort.LEVEL_DESC:
                    if (a.level === b.level) return a.name[language].localeCompare(b.name[language]);
                    return b.level - a.level;
                case Sort.NAME_ASC:
                    return a.name[language].localeCompare(b.name[language]);
                case Sort.NAME_DESC:
                    return b.name[language].localeCompare(a.name[language]);
            }
        });

    let lastLevel = -1;

    return (
        <section className="relative flex h-fit min-h-full w-full max-w-screen-lg flex-col p-4">
            <div className="flex w-full flex-col justify-end gap-2 md:flex-row">
                <QueryFilter language={language} query={query} setQuery={setQuery} />

                <div className="flex flex-row gap-2">
                    <SortFilter language={language} sort={sort} setSort={setSort} />
                </div>
            </div>

            <div className={cn("flex justify-end pt-1", spells.isLoading ? "pointer-events-none opacity-0" : "")}>
                <p className="text-sm font-medium tracking-wide opacity-60">
                    {filteredSpells.length > 0
                        ? `${filteredSpells.length} ${filteredSpells.length === 1 ? t.filter.result : t.filter.results}`
                        : `${t.filter.noResults}`}
                </p>
            </div>

            <div className="grid w-full grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                {filteredSpells.map((spell) => {
                    const isLevelChange = spell.level !== lastLevel;
                    lastLevel = spell.level;

                    return (
                        <Fragment key={spell.index}>
                            {[Sort.LEVEL_ASC, Sort.LEVEL_DESC].includes(sort) && isLevelChange && (
                                <h2 className="sticky top-0 z-20 col-span-3 mt-4 w-full bg-stone-100 py-3 text-center text-lg font-bold tracking-wider text-sky-500 dark:bg-stone-950 sm:col-span-4 md:col-span-5 lg:col-span-6 mouse:top-16">
                                    {spell.level === 0 ? t.dnd.cantrips : `${t.filter.level} ${spell.level}`}
                                </h2>
                            )}

                            <SpellItem language={language} spell={spell} />
                        </Fragment>
                    );
                })}
            </div>
        </section>
    );
};

export default SpellList;
