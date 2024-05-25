"use client";

import { PageProps } from "@/app/[language]/layout";
import CharacterStatus from "@/component/character/CharacterStatus";
import NotFound from "@/component/navigation/NotFound";
import { useCharacter } from "@/server/use/useCharacter";
import { useUser } from "@/server/use/useUser";
import { Language } from "@/type/Language";
import { NotFoundType } from "@/type/NotFoundType";
import { ReactNode } from "react";

interface Props extends PageProps {
    params: { language: Language; characterId: string };
}

const Characters = ({ params: { language, characterId } }: Props) => {
    const character = useCharacter(characterId);
    const { user } = useUser();

    const wrapper = (children: ReactNode) => (
        <main className="relative flex h-full w-full flex-col items-center">
            <div className="relative flex h-fit min-h-full w-full max-w-screen-lg flex-col gap-4">{children}</div>
        </main>
    );

    if (character.isLoading || user.isLoading) return wrapper(<CharacterStatus isLoading language={language} />);
    if (!character.data) return <NotFound type={NotFoundType.CHARACTER} language={language} />;
    if (!user.data) return <NotFound type={NotFoundType.USER} language={language} />;

    return wrapper(<CharacterStatus character={character.data} language={language} user={user.data} />);
};

export default Characters;
