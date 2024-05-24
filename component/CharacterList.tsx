"use client";

import { Button } from "@/component/ui/button";
import { useTranslation } from "@/hook/useTranslation";
import { GetUserCharactersReturnType, useCharacters } from "@/server/use/useCharacters";
import { Language } from "@/type/Language";
import { User } from "@/type/User";
import { LuPlus } from "react-icons/lu";
import CharacterItem from "./CharacterItem";

interface Props {
    language: Language;
    initialCharacterData: GetUserCharactersReturnType;
    user: User;
}

const CharacterList = ({ language, initialCharacterData, user }: Props) => {
    const { t } = useTranslation(language);

    const characters = useCharacters(user.email, initialCharacterData);

    return (
        <section className="relative flex h-fit min-h-full w-full max-w-screen-lg flex-col gap-4 p-4">
            <Button onClick={() => console.log("create")}>
                <LuPlus className="mr-3 h-4 w-4 stroke-[3]" />
                {t.dnd.createCharacter}
            </Button>

            <div className="grid w-full grid-cols-2 gap-6">
                {characters.data.map((character) => (
                    <CharacterItem key={character.id} character={character} language={language} />
                ))}
            </div>
        </section>
    );
};

export default CharacterList;
