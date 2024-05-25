import { PageProps } from "@/app/[language]/layout";
import CharacterPage from "@/component/character/CharacterPage";
import { getAllSpells } from "@/server/repo/spell";
import { Language } from "@/type/Language";
import { Suspense } from "react";

export const revalidate = 60 * 60 * 24; // 1 day

interface Props extends PageProps {
    params: { language: Language; characterId: string };
}

const Character = async ({ params: { language, characterId } }: Props) => {
    const initialSpellsData = await getAllSpells();

    return (
        <main className="relative flex h-full w-full flex-col items-center">
            <div className="relative flex h-fit min-h-full w-full justify-center">
                <Suspense fallback={null}>
                    <CharacterPage
                        characterId={characterId}
                        language={language}
                        initialSpellsData={initialSpellsData}
                    />
                </Suspense>
            </div>
        </main>
    );
};

export default Character;
