import ScrollToTop from "@/component/ScrollToTop";
import AllList from "@/component/spell/AllList";
import KnownList from "@/component/spell/KnownList";
import PreparedList from "@/component/spell/PreparedList";
import SpellBookList from "@/component/spell/SpellBookList";
import { useTranslation } from "@/hook/useTranslation";
import { GetAllSpellsReturnType } from "@/server/use/useSpells";
import { CharacterWithSpells } from "@/type/Character";
import { Language } from "@/type/Language";
import { ClassType, SpellSection } from "@/type/Spell";
import { User } from "@/type/User";

interface Props {
    language: Language;
    character: CharacterWithSpells;
    user: User;
    spells: GetAllSpellsReturnType;
    spellSection: SpellSection;
}

const CharacterSpells = ({ language, character, spells, user, spellSection }: Props) => {
    const { t } = useTranslation(language);

    return (
        <>
            {spellSection === SpellSection.ALL && <AllList language={language} spells={spells} character={character} />}

            {spellSection === SpellSection.KNOWN && character.class !== ClassType.WIZARD && (
                <KnownList
                    language={language}
                    spells={[...character.knownSpells, ...character.knownCantrips]}
                    character={character}
                />
            )}

            {spellSection === SpellSection.KNOWN && character.class === ClassType.WIZARD && (
                <SpellBookList language={language} spells={character.knownSpells} character={character} />
            )}

            {spellSection === SpellSection.PREPARED && (
                <PreparedList
                    language={language}
                    spells={[...character.preparedSpells, ...character.knownCantrips]}
                    character={character}
                />
            )}

            <ScrollToTop />
        </>
    );
};

export default CharacterSpells;
