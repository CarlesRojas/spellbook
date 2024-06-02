"use client";

import QueryFilter from "@/component/filter/QueryFilter";
import CastableSpell from "@/component/spell/CastableSpell";
import { Button } from "@/component/ui/button";
import { useCharacterStatusSize } from "@/hook/useCharacterStatusSize";
import { useTranslation } from "@/hook/useTranslation";
import { useUrlState } from "@/hook/useUrlState";
import { getSpellRawColor, getSpellsByLevel } from "@/lib/spell";
import { useSetConcentratingOnSpell } from "@/server/use/useSetConcentratingOnSpell";
import { CharacterWithSpells } from "@/type/Character";
import { Language } from "@/type/Language";
import { Spell, SpellSection } from "@/type/Spell";
import { LuArrowLeft } from "react-icons/lu";
import { z } from "zod";

interface Props {
    language: Language;
    spells: Spell[];
    character: CharacterWithSpells;
    setSpellSection: (newState: SpellSection, scroll?: boolean) => void;
}

const KnownList = ({ language, spells, character, setSpellSection }: Props) => {
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

    const statusBarHeight = useCharacterStatusSize();

    const setConcentratingOnSpell = useSetConcentratingOnSpell();

    return (
        <div className="relative flex h-fit w-full flex-col p-4">
            <div className="flex w-full justify-end gap-4 md:flex-row">
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
                        className="hidden w-full grid-cols-1 gap-2 has-[.spell]:grid md:grid-cols-2 lg:grid-cols-3"
                    >
                        <h2
                            className="sticky z-20 col-span-1 mt-4 w-full bg-stone-100 py-2 text-center text-lg font-bold tracking-wider text-sky-500 dark:bg-stone-950 md:col-span-2 lg:col-span-3"
                            style={{ top: statusBarHeight - 1 }}
                        >
                            {level === "0" ? t.dnd.cantrips : `${t.filter.level} ${level}`}
                        </h2>

                        {spells.map((spell) => (
                            <CastableSpell
                                key={spell.index}
                                language={language}
                                spell={spell}
                                character={character}
                                showUncastable={true}
                                setConcentratingSpell={(concentratingSpell: Spell | null) =>
                                    setConcentratingOnSpell.mutate({
                                        ...character,
                                        concentratingOnId: concentratingSpell?.index ?? null,
                                        concentratingOn: concentratingSpell,
                                    })
                                }
                            />
                        ))}
                    </div>
                ))}
            </div>

            {spells.length === 0 && (
                <div className="flex h-fit w-full flex-col items-center justify-center gap-2 pt-32">
                    <p className="w-full text-center font-medium tracking-wide opacity-90">
                        {t.dnd.spell.noSpellsLearned}
                    </p>

                    <Button variant="outline" onClick={() => setSpellSection(SpellSection.ALL)}>
                        <LuArrowLeft className="mr-3 h-4 w-4 stroke-[3]" />
                        {t.dnd.spell.viewAllSpells}
                    </Button>
                </div>
            )}

            {character.concentratingOn && (
                <div className="fixed bottom-[4.75rem] left-3 right-20 z-40 h-fit w-fit rounded-lg bg-white shadow-md dark:bg-black mouse:bottom-6 mouse:left-6 mouse:right-28">
                    <div className="flex h-fit w-fit items-center gap-2 rounded-lg border border-stone-300 p-2 dark:border-stone-700">
                        <div
                            className="inline-block h-8 max-h-8 min-h-8 w-8 min-w-8 max-w-8 bg-cover brightness-90 dark:brightness-100"
                            style={{
                                backgroundImage: `url(/spell/${character.concentratingOn.icon})`,
                                maskImage: `url(/spell/${character.concentratingOn.icon})`,
                                maskMode: "alpha",
                                maskSize: "cover",
                                backgroundBlendMode: "luminosity",
                                backgroundColor: getSpellRawColor(character.concentratingOn.color),
                            }}
                        />

                        <p className="w-full text-left text-sm font-medium leading-tight tracking-wide opacity-90">
                            {`${t.dnd.spell.concentratingOn} ${character.concentratingOn.name[language]}`}
                        </p>

                        <Button
                            className="ml-2 min-w-fit"
                            variant="secondary"
                            onClick={() =>
                                setConcentratingOnSpell.mutate({
                                    ...character,
                                    concentratingOnId: null,
                                    concentratingOn: null,
                                })
                            }
                        >
                            {t.dnd.spell.stopConcentrating}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KnownList;
