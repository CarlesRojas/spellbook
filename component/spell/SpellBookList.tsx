"use client";

import QueryFilter from "@/component/filter/QueryFilter";
import BookSpell from "@/component/spell/BookSpell";
import { useTranslation } from "@/hook/useTranslation";
import { useUrlState } from "@/hook/useUrlState";
import { getSpellsByLevel } from "@/lib/spell";
import { CharacterWithSpells } from "@/type/Character";
import { Language } from "@/type/Language";
import { Spell } from "@/type/Spell";
import { z } from "zod";

interface Props {
    language: Language;
    spells: Spell[];
    character: CharacterWithSpells;
}

const SpellBookList = ({ language, spells, character }: Props) => {
    const { t } = useTranslation(language);

    const [query, setQuery] = useUrlState("query", "", z.string());

    const filteredSpells = spells
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
        <div className="relative flex h-fit w-full flex-col p-4">
            <div className="flex w-full justify-end gap-2 md:flex-row">
                <QueryFilter language={language} query={query} setQuery={setQuery} className="w-fit grow" />
            </div>

            <div className="flex justify-end">
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
                        <h2 className="sticky top-0 z-20 col-span-3 mt-4 w-full bg-stone-100 py-3 text-center text-lg font-bold tracking-wider text-sky-500 dark:bg-stone-950 sm:col-span-4 md:col-span-5 lg:col-span-6 mouse:top-16">
                            {level === "0" ? t.dnd.cantrips : `${t.filter.level} ${level}`}
                        </h2>

                        {spells.map((spell) => (
                            <BookSpell key={spell.index} language={language} spell={spell} character={character} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpellBookList;
