import { useTranslation } from "@/hook/useTranslation";
import { CharacterWithSpells } from "@/type/Character";
import { Language } from "@/type/Language";
import { User } from "@/type/User";

interface Props {
    language: Language;
    character: CharacterWithSpells;
    user: User;
}

const CharacterSpells = ({ language, character, user }: Props) => {
    const { t } = useTranslation(language);

    const { id, name, class: characterClass, level, ability, spellSlotsAvailableId, spellSlotsAvailable } = character;

    return <div className="flex w-full flex-col gap-4 p-4"></div>;
};

export default CharacterSpells;
