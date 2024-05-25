import { useTranslation } from "@/hook/useTranslation";
import { GetAllSpellsReturnType } from "@/server/use/useSpells";
import { CharacterWithSpells } from "@/type/Character";
import { Language } from "@/type/Language";
import { User } from "@/type/User";
import SpellList from "../spell/SpellList";

interface Props {
    language: Language;
    character: CharacterWithSpells;
    user: User;
    spells: GetAllSpellsReturnType;
}

const CharacterSpells = ({ language, character, spells, user }: Props) => {
    const { t } = useTranslation(language);

    const { id, name, class: characterClass, level, ability, spellSlotsAvailableId, spellSlotsAvailable } = character;

    return (
        <div className="flex w-full flex-col gap-4 p-4">
            <SpellList language={language} initialSpellsData={spells} />
        </div>
    );
};

export default CharacterSpells;
