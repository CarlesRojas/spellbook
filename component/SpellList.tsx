"use client";

import QueryFilter from "@/component/filter/QueryFilter";
import SchoolFilter from "@/component/filter/SchoolFilter";
import { useTranslation } from "@/hook/useTranslation";
import { useUrlState } from "@/hook/useUrlState";
import { GetAllSpellsReturnType, useSpells } from "@/server/use/useSpells";
import { Language } from "@/type/Language";
import { SchoolType, Sort } from "@/type/Spell";
import { z } from "zod";
import SortFilter from "./filter/SortFilter";

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

    return (
        <section className="relative flex h-fit min-h-full w-full max-w-screen-lg flex-col gap-4 p-4">
            <div className="flex w-full flex-col justify-end gap-2 md:flex-row">
                <QueryFilter language={language} query={query} setQuery={setQuery} />

                <div className="flex flex-row justify-end gap-2">
                    <SchoolFilter language={language} school={school} setSchool={setSchool} />
                    <SortFilter language={language} sort={sort} setSort={setSort} />
                </div>
            </div>

            <div className="grid w-full gap-2 md:grid-cols-2 lg:grid-cols-3">
                {filteredSpells.map((spell) => (
                    <div
                        key={spell.index}
                        className="flex flex-col gap-1 rounded border border-stone-300 p-2 dark:border-stone-700"
                    >
                        <h3 className="text-lg font-bold">{spell.name}</h3>
                        <small>
                            {spell.level} {t.enum.school[spell.school.index]}
                        </small>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SpellList;
