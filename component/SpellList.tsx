"use client";

import QueryFilter from "@/component/filter/QueryFilter";
import SchoolFilter from "@/component/filter/SchoolFilter";
import SortFilter from "@/component/filter/SortFilter";
import { Button } from "@/component/ui/button";
import { useTranslation } from "@/hook/useTranslation";
import { useUrlState } from "@/hook/useUrlState";
import { cn } from "@/lib/util";
import { GetAllSpellsReturnType, useSpells } from "@/server/use/useSpells";
import { Language } from "@/type/Language";
import { SchoolType, Sort } from "@/type/Spell";
import Link from "next/link";
import { Fragment } from "react";
import { LuPlus } from "react-icons/lu";
import { z } from "zod";

interface Props {
    language: Language;
    initialSpellsData: GetAllSpellsReturnType;
}

const SpellList = ({ language, initialSpellsData }: Props) => {
    const { t } = useTranslation(language);

    const [query, setQuery] = useUrlState("query", "", z.string());
    const [school, setSchool] = useUrlState("school", null, z.nativeEnum(SchoolType).nullable());
    const [sort, setSort] = useUrlState("sort", Sort.LEVEL_ASC, z.nativeEnum(Sort));

    const spells = useSpells(initialSpellsData);
    const filteredSpells = spells.data
        .filter((spell) => {
            if (school && spell.school.index !== school) return false;
            if (query && !spell.name.toLowerCase().includes(query.toLowerCase())) return false;
            return true;
        })
        .sort((a, b) => {
            switch (sort) {
                case Sort.LEVEL_ASC:
                    if (a.level === b.level) return a.name.localeCompare(b.name);
                    return a.level - b.level;
                case Sort.LEVEL_DESC:
                    if (a.level === b.level) return a.name.localeCompare(b.name);
                    return b.level - a.level;
                case Sort.NAME_ASC:
                    return a.name.localeCompare(b.name);
                case Sort.NAME_DESC:
                    return b.name.localeCompare(a.name);
            }
        });

    let lastLevel = -1;

    return (
        <section className="relative flex h-fit min-h-full w-full max-w-screen-lg flex-col p-4">
            <div className="flex w-full flex-col justify-end gap-2 md:flex-row">
                <QueryFilter language={language} query={query} setQuery={setQuery} />

                <div className="flex flex-row justify-end gap-2">
                    <SchoolFilter language={language} school={school} setSchool={setSchool} />
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

            <div className="grid w-full gap-2 md:grid-cols-2 lg:grid-cols-3">
                {filteredSpells.map((spell) => {
                    const isLevelChange = spell.level !== lastLevel;
                    lastLevel = spell.level;

                    return (
                        <Fragment key={spell.index}>
                            {[Sort.LEVEL_ASC, Sort.LEVEL_DESC].includes(sort) && isLevelChange && (
                                <h2 className="sticky top-0 z-20 mt-4 bg-stone-100 py-2 font-semibold tracking-wide text-sky-500 dark:bg-stone-900 md:col-span-2 lg:col-span-3 mouse:top-16">
                                    {spell.level === 0 ? t.dnd.cantrips : `${t.filter.level} ${spell.level}`}
                                </h2>
                            )}

                            <div className="flex items-center justify-between rounded border border-stone-300 dark:border-stone-700">
                                <Link
                                    href={`/${language}/spell/${spell.index}`}
                                    className="focus-shadow group flex grow items-center gap-2 p-1"
                                    scroll={false}
                                >
                                    <div
                                        className="inline-block h-16 w-16 bg-cover mouse:transition-transform mouse:group-hover:scale-110"
                                        style={{
                                            backgroundImage: `url(/spell/${spell.icon})`,
                                            maskImage: `url(/spell/${spell.icon})`,
                                            maskMode: "alpha",
                                            maskSize: "cover",
                                            backgroundBlendMode: "luminosity",
                                            backgroundColor: spell.color,
                                        }}
                                    />

                                    <div className="flex flex-col">
                                        <h3
                                            className="font-semibold brightness-[-1000] saturate-[0.9] dark:brightness-[1000] mouse:group-hover:brightness-100  mouse:group-hover:transition-all"
                                            style={{
                                                color: spell.color,
                                            }}
                                        >
                                            {spell.name}
                                        </h3>
                                        <small className="opacity-60">{t.enum.school[spell.school.index]}</small>
                                    </div>
                                </Link>

                                <div className="h-fit w-fit p-2">
                                    <Button variant="outline" size="icon">
                                        <LuPlus className="h-4 w-4 stroke-[3]" />
                                    </Button>
                                </div>
                            </div>
                        </Fragment>
                    );
                })}
            </div>
        </section>
    );
};

export default SpellList;
