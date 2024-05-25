import SpellList from "@/component/spell/SpellList";
import { useTranslation } from "@/hook/useTranslation";
import { useUrlState } from "@/hook/useUrlState";
import { GetAllSpellsReturnType } from "@/server/use/useSpells";
import { CharacterWithSpells } from "@/type/Character";
import { Language } from "@/type/Language";
import { SpellSection } from "@/type/Spell";
import { User } from "@/type/User";
import { z } from "zod";

interface Props {
    language: Language;
    character: CharacterWithSpells;
    user: User;
    spellSection: SpellSection;
    initialSpellsData: GetAllSpellsReturnType;
}

const CharacterSpells = ({ language, character, user, spellSection, initialSpellsData }: Props) => {
    const { t } = useTranslation(language);

    const [query, setQuery] = useUrlState("query", "", z.string());

    const { id, name, class: characterClass, level, ability, spellSlotsAvailableId, spellSlotsAvailable } = character;

    return (
        <div className="flex w-full flex-col gap-4 p-4">
            <SpellList language={language} initialSpellsData={initialSpellsData} />
        </div>
    );
};

export default CharacterSpells;
