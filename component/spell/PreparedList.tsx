"use client";

import CastableSpell from "@/component/spell/CastableSpell";
import { useTranslation } from "@/hook/useTranslation";
import { CharacterWithSpells } from "@/type/Character";
import { Language } from "@/type/Language";
import { Spell } from "@/type/Spell";
import { Fragment } from "react";

interface Props {
    language: Language;
    spells: Spell[];
    character: CharacterWithSpells;
}

const KnownList = ({ language, spells, character }: Props) => {
    const { t } = useTranslation(language);

    const filteredSpells = spells
        .filter((spell) => {
            return true;
        })
        .sort((a, b) => {
            if (a.level === b.level) return a.name[language].localeCompare(b.name[language]);
            return a.level - b.level;
        });

    let lastLevel = -1;

    return (
        <div className="relative flex h-fit w-full flex-col p-4">
            <div className="flex justify-end pt-1">
                <p className="text-sm font-medium tracking-wide opacity-60">
                    {filteredSpells.length > 0
                        ? `${filteredSpells.length} ${filteredSpells.length === 1 ? t.filter.result : t.filter.results}`
                        : `${t.filter.noResults}`}
                </p>
            </div>
            {/* TODO show how many you can have prepared (Cantrips too) */}

            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                {filteredSpells.map((spell) => {
                    const isLevelChange = spell.level !== lastLevel;
                    lastLevel = spell.level;

                    return (
                        <Fragment key={spell.index}>
                            {isLevelChange && (
                                <h2 className="sticky top-0 z-20 col-span-1 mt-4 w-full bg-stone-100 py-3 text-center text-lg font-bold tracking-wider text-sky-500 dark:bg-stone-950 md:col-span-2 lg:col-span-3 mouse:top-16">
                                    {spell.level === 0 ? t.dnd.cantrips : `${t.filter.level} ${spell.level}`}
                                </h2>
                            )}

                            <CastableSpell language={language} spell={spell} character={character} />
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default KnownList;
