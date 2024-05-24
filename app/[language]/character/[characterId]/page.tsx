"use client";

import { PageProps } from "@/app/[language]/layout";
import CharacterItem from "@/component/character/CharacterItem";
import BackButton from "@/component/navigation/BackButton";
import NotFound from "@/component/navigation/NotFound";
import { useCharacter } from "@/server/use/useCharacter";
import { useUser } from "@/server/use/useUser";
import { Language } from "@/type/Language";
import { NotFoundType } from "@/type/NotFoundType";
import { LuLoader2 } from "react-icons/lu";

interface Props extends PageProps {
    params: { language: Language; characterId: string };
}

const Characters = ({ params: { language, characterId } }: Props) => {
    const character = useCharacter(characterId);
    const { user } = useUser();

    // TODO better loading state
    if (character.isLoading || user.isLoading)
        return (
            <main className="relative flex h-full min-h-96 w-full flex-col items-center justify-center">
                <LuLoader2 className="h-12 w-12 animate-spin" />
            </main>
        );

    if (!character.data) return <NotFound type={NotFoundType.CHARACTER} language={language} />;
    if (!user.data) return <NotFound type={NotFoundType.USER} language={language} />;

    return (
        <main className="relative flex h-full w-full flex-col items-center">
            <div className="relative flex h-fit min-h-full w-full max-w-screen-lg flex-col gap-4 p-4">
                <BackButton language={language} />

                {/* TODO change this for new component */}
                <CharacterItem character={character.data} language={language} user={user.data} />
            </div>
        </main>
    );
};

export default Characters;
