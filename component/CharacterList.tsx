"use client";

import { useTranslation } from "@/hook/useTranslation";
import { renderObject } from "@/lib/util";
import { GetUserCharactersReturnType, useCharacters } from "@/server/use/useCharacters";
import { Language } from "@/type/Language";
import { User } from "@/type/User";
import { VscTools } from "react-icons/vsc";

interface Props {
    language: Language;
    initialCharacterData: GetUserCharactersReturnType;
    user: User;
}

const CharacterList = ({ language, initialCharacterData, user }: Props) => {
    const { t } = useTranslation(language);

    const characters = useCharacters(user.email, initialCharacterData);

    return (
        <section className="relative flex h-fit min-h-full w-full max-w-screen-lg flex-col p-4">
            <div className="flex w-full gap-6">
                {characters.data.map((character) => (
                    <div
                        key={character.id}
                        className=" flex w-full flex-col gap-4 border-4 border-dashed border-yellow-500 p-4"
                    >
                        <VscTools className="h-10 w-10" />

                        {renderObject(character)}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CharacterList;
