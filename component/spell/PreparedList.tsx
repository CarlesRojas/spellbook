"use client";

import CastableSpell from "@/component/spell/CastableSpell";
import { Button } from "@/component/ui/button";
import { useCharacterStatusSize } from "@/hook/useCharacterStatusSize";
import { useTranslation } from "@/hook/useTranslation";
import { getSpellsByLevel } from "@/lib/spell";
import { CharacterWithSpells } from "@/type/Character";
import { Language } from "@/type/Language";
import { ClassType, Spell, SpellSection } from "@/type/Spell";
import { LuArrowLeft } from "react-icons/lu";

interface Props {
    language: Language;
    spells: Spell[];
    character: CharacterWithSpells;
    setSpellSection: (newState: SpellSection, scroll?: boolean) => void;
}

const PreparedList = ({ language, spells, character, setSpellSection }: Props) => {
    const { t } = useTranslation(language);
    const isWizard = character.class === ClassType.WIZARD;

    const filteredSpells = spells
        .filter((spell) => {
            return true;
        })
        .sort((a, b) => {
            if (a.level === b.level) return a.name[language].localeCompare(b.name[language]);
            return a.level - b.level;
        });

    const spellsByLevel = getSpellsByLevel(filteredSpells);

    const statusBarHeight = useCharacterStatusSize();

    return (
        <div className="relative flex h-fit w-full flex-col p-4">
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
                            />
                        ))}
                    </div>
                ))}
            </div>

            {spells.length === 0 && (
                <div className="flex h-fit w-full flex-col items-center justify-center gap-2 pt-32">
                    <p className="w-full text-center font-medium tracking-wide opacity-90">
                        {t.dnd.spell.noSpellsPrepared}
                    </p>

                    <Button
                        variant="outline"
                        onClick={() => setSpellSection(isWizard ? SpellSection.KNOWN : SpellSection.ALL)}
                    >
                        <LuArrowLeft className="mr-3 h-4 w-4 stroke-[3]" />
                        {isWizard ? t.dnd.spell.viewSpellbook : t.dnd.spell.viewAllSpells}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default PreparedList;
