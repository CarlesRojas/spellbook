"use client";

import CharacterSpells from "@/component/character/CharacterSpells";
import CharacterStatus from "@/component/character/CharacterStatus";
import NotFound from "@/component/navigation/NotFound";
import { useUrlState } from "@/hook/useUrlState";
import { useCharacter } from "@/server/use/useCharacter";
import { GetAllSpellsReturnType } from "@/server/use/useSpells";
import { useUser } from "@/server/use/useUser";
import { Language } from "@/type/Language";
import { NotFoundType } from "@/type/NotFoundType";
import { SpellSection } from "@/type/Spell";
import { ReactNode } from "react";
import { z } from "zod";

interface Props {
    language: Language;
    characterId: string;
    initialSpellsData: GetAllSpellsReturnType;
}

const CharacterPage = ({ language, characterId, initialSpellsData }: Props) => {
    const character = useCharacter(characterId);
    const { user } = useUser();

    const [spellSection, setSpellSection] = useUrlState("spells", SpellSection.ALL, z.nativeEnum(SpellSection));

    const wrapper = (children: ReactNode) => (
        <main className="relative flex h-full w-full flex-col items-center">
            <div className="relative flex h-fit min-h-full w-full max-w-screen-lg flex-col">{children}</div>
        </main>
    );

    if (character.isLoading || user.isLoading) return wrapper(<CharacterStatus isLoading language={language} />);
    if (!character.data) return <NotFound type={NotFoundType.CHARACTER} language={language} />;
    if (!user.data) return <NotFound type={NotFoundType.USER} language={language} />;

    return wrapper(
        <>
            <CharacterStatus
                character={character.data}
                language={language}
                user={user.data}
                spellSection={spellSection}
                setSpellSection={setSpellSection}
            />

            <CharacterSpells
                character={character.data}
                language={language}
                user={user.data}
                spellSection={spellSection}
                initialSpellsData={initialSpellsData}
            />
        </>,
    );
};

export default CharacterPage;
