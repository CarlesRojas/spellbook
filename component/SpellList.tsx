"use client";

import { useUrlState } from "@/hook/useUrlState";
import { Language } from "@/type/Language";
import { Spell } from "@/type/Spell";
import { z } from "zod";
import Query from "./filter/Query";

interface Props {
    language: Language;
    spells: Spell[];
}

const SpellList = ({ language, spells }: Props) => {
    const [query, setQuery] = useUrlState("query", "", z.string());

    const filteredSpells = spells.filter((spell) => {
        if (!query) return true;
        const regex = new RegExp(query, "i");
        return regex.test(spell.name);
    });

    return (
        <section className="relative flex h-fit min-h-full w-full max-w-screen-lg flex-col gap-4 p-4">
            <div className="grid w-full gap-2 md:flex md:flex-row md:justify-end">
                <Query language={language} query={query} setQuery={(newQuery) => setQuery(newQuery)} />
            </div>

            <div className="grid w-full gap-2 md:grid-cols-2 lg:grid-cols-3">
                {filteredSpells.map((spell) => (
                    <div
                        key={spell.index}
                        className="flex flex-col gap-1 rounded border border-stone-300 p-2 dark:border-stone-700"
                    >
                        <h3 className="text-lg font-bold">{spell.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SpellList;
