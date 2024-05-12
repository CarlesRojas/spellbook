import { PageProps } from "@/app/[language]/layout";
import NotFound from "@/component/navigation/NotFound";
import { getSpell } from "@/server/repo/spell";
import { Language } from "@/type/Language";
import { NotFoundType } from "@/type/NotFoundType";

interface Props extends PageProps {
    params: { language: Language; spellId: string };
}

const Spell = async ({ params: { language, spellId } }: Props) => {
    const spell = await getSpell(spellId);
    if (!spell) return <NotFound type={NotFoundType.SPELL} language={language} />;

    const { name } = spell;

    return (
        <main className="relative flex h-full w-full flex-col items-center">
            <div className="relative flex h-fit min-h-full w-full justify-center overflow-y-auto">
                <p className="p-4 font-semibold">Page for {name}</p>
            </div>
        </main>
    );
};

export default Spell;
