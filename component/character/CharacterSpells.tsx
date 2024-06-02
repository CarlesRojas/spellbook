import ScrollToTop from "@/component/ScrollToTop";
import AllList from "@/component/spell/AllList";
import KnownList from "@/component/spell/KnownList";
import PreparedList from "@/component/spell/PreparedList";
import SpellBookList from "@/component/spell/SpellBookList";
import { getSaveDifficultyClass, getSpellAttackModifier } from "@/lib/character";
import { GetAllSpellsReturnType } from "@/server/use/useSpells";
import { CharacterWithSpells } from "@/type/Character";
import { Language } from "@/type/Language";
import { ClassType, SpellSection } from "@/type/Spell";

interface Props {
    language: Language;
    character: CharacterWithSpells;
    spells: GetAllSpellsReturnType;
    spellSection: SpellSection;
    setSpellSection: (newState: SpellSection, scroll?: boolean) => void;
}

const CharacterSpells = ({ language, character, spells, spellSection, setSpellSection }: Props) => {
    const spellBookRituals = character.knownSpells
        .filter(({ index, ritual }) => {
            if (character.preparedSpells.some(({ index: spellIndex }) => spellIndex === index)) return false;
            return ritual;
        })
        .map((spell) => ({ ...spell, onlyRitual: true }));

    console.log("SAVE THROW", getSaveDifficultyClass(character.class, character.ability, character.level));
    console.log("ATTACK MOD", getSpellAttackModifier(character.class, character.ability, character.level));

    return (
        <>
            {spellSection === SpellSection.ALL && <AllList language={language} spells={spells} character={character} />}

            {spellSection === SpellSection.KNOWN && character.class !== ClassType.WIZARD && (
                <KnownList
                    language={language}
                    spells={[...character.knownSpells, ...character.knownCantrips]}
                    character={character}
                    setSpellSection={setSpellSection}
                />
            )}

            {spellSection === SpellSection.KNOWN && character.class === ClassType.WIZARD && (
                <SpellBookList
                    language={language}
                    spells={character.knownSpells}
                    character={character}
                    setSpellSection={setSpellSection}
                />
            )}

            {spellSection === SpellSection.PREPARED && (
                <PreparedList
                    language={language}
                    spells={[
                        ...character.preparedSpells,
                        ...character.knownCantrips,
                        ...(character.class === ClassType.WIZARD ? spellBookRituals : []),
                    ]}
                    character={character}
                    setSpellSection={setSpellSection}
                />
            )}

            <ScrollToTop />
        </>
    );
};

export default CharacterSpells;
