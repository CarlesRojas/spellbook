import { PageProps } from "@/app/[language]/layout";
import Spell from "@/component/Spell";
import NotFound from "@/component/navigation/NotFound";
import { getAllSpells, getSpell } from "@/server/repo/spell";
import { Language } from "@/type/Language";
import { NotFoundType } from "@/type/NotFoundType";

interface Props extends PageProps {
    params: { language: Language; spellId: string };
}

export async function generateStaticParams() {
    const spells = await getAllSpells();
    const result = Object.values(Language).flatMap((language) =>
        spells.map(({ index }) => ({ language, spellId: index })),
    );
    return result;
}

const SpellPage = async ({ params: { language, spellId } }: Props) => {
    const spell = await getSpell(spellId);
    if (!spell) return <NotFound type={NotFoundType.SPELL} language={language} />;

    return (
        <main className="relative flex h-full w-full flex-col items-center">
            <div className="relative flex h-fit min-h-full w-full justify-center">
                <Spell spellId={spellId} spellInitialData={spell} />
            </div>
        </main>
    );
};

export default SpellPage;
