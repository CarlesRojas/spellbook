import { PageProps } from "@/app/[language]/layout";
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

    const { name, icon, color } = spell;

    return (
        <main className="relative flex h-full w-full flex-col items-center">
            <div className="relative flex h-fit min-h-full w-full items-center justify-center">
                <div className="flex w-full max-w-screen-lg items-center gap-2 p-4">
                    <div
                        className="inline-block h-32 min-h-32 w-32 min-w-32 bg-cover mouse:transition-transform mouse:group-hover:scale-110"
                        style={{
                            backgroundImage: `url(/spell/${icon})`,
                            maskImage: `url(/spell/${icon})`,
                            maskMode: "alpha",
                            maskSize: "cover",
                            backgroundBlendMode: "luminosity",
                            backgroundColor: color,
                        }}
                    />
                    <h1 className="p-4 text-lg font-semibold tracking-wide">{name}</h1>
                </div>
            </div>
        </main>
    );
};

export default SpellPage;
