"use client";

import ClassFilter from "@/component/filter/ClassFilter";
import QueryFilter from "@/component/filter/QueryFilter";
import UnknownSpell from "@/component/spell/UnknownSpell";
import { useTranslation } from "@/hook/useTranslation";
import { useUrlState } from "@/hook/useUrlState";
import { CharacterWithSpells } from "@/type/Character";
import { Language } from "@/type/Language";
import { ClassType, Spell } from "@/type/Spell";
import { Fragment } from "react";
import { z } from "zod";

interface Props {
    language: Language;
    spells: Spell[];
    character: CharacterWithSpells;
}

const AllList = ({ language, spells, character }: Props) => {
    const { t } = useTranslation(language);

    const [query, setQuery] = useUrlState("query", "", z.string());
    const [classFilter, setClassFilter] = useUrlState("class", character.class, z.nativeEnum(ClassType).nullable());

    const filteredSpells = spells
        .filter((spell) => {
            if (query && !spell.name[language].toLowerCase().includes(query.toLowerCase())) return false;
            if (classFilter && !spell.classes.includes(classFilter)) return false;
            return true;
        })
        .sort((a, b) => {
            if (a.level === b.level) return a.name[language].localeCompare(b.name[language]);
            return a.level - b.level;
        });

    let lastLevel = -1;

    return (
        <div className="relative flex h-fit w-full flex-col p-4">
            <div className="flex w-full justify-end gap-2 md:flex-row">
                <ClassFilter language={language} classType={classFilter} setClass={setClassFilter} />
                <QueryFilter language={language} query={query} setQuery={setQuery} className="w-fit grow" />
            </div>

            <div className="flex justify-end pt-1">
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
                            {isLevelChange && (
                                <h2 className="sticky top-0 z-20 col-span-3 mt-4 w-full bg-stone-100 py-3 text-center text-lg font-bold tracking-wider text-sky-500 dark:bg-stone-950 sm:col-span-4 md:col-span-5 lg:col-span-6 mouse:top-16">
                                    {spell.level === 0 ? t.dnd.cantrips : `${t.filter.level} ${spell.level}`}
                                </h2>
                            )}

                            <UnknownSpell language={language} spell={spell} character={character} />
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default AllList;
