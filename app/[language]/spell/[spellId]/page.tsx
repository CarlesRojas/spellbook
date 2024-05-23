import { PageProps } from "@/app/[language]/layout";
import BackButton from "@/component/navigation/BackButton";
import NotFound from "@/component/navigation/NotFound";
import { useTranslation } from "@/hook/useTranslation";
import { parseParagraphsWithDice } from "@/lib/dice";
import { getSpellColor } from "@/lib/spell";
import { renderObject } from "@/lib/util";
import { getAllSpells, getSpell } from "@/server/repo/spell";
import { Language } from "@/type/Language";
import { NotFoundType } from "@/type/NotFoundType";
import { VscTools } from "react-icons/vsc";

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
    const { t } = useTranslation(language);
    const spell = await getSpell(spellId);
    if (!spell) return <NotFound type={NotFoundType.SPELL} language={language} />;

    const {
        index,
        name,
        description,
        highLevelDescription,
        range,
        components,
        material,
        areaOfEffect,
        ritual,
        duration,
        concentration,
        castingTime,
        attackType,
        school,
        classes,
        subclasses,
        damage,
        difficultyClass,
        level,
        icon,
        color,
    } = spell;

    return (
        <main className="relative flex h-full w-full flex-col items-center">
            <div className="relative flex h-fit min-h-full w-full max-w-screen-lg flex-col gap-4 p-4">
                <BackButton language={language} />

                <div className="flex w-full flex-col items-center">
                    <div
                        className="mb-2 inline-block h-36 min-h-36 w-36 min-w-36 bg-cover brightness-90 dark:brightness-100"
                        style={{
                            backgroundImage: `url(/spell/${icon})`,
                            maskImage: `url(/spell/${icon})`,
                            maskMode: "alpha",
                            maskSize: "cover",
                            backgroundBlendMode: "luminosity",
                            backgroundColor: getSpellColor(color),
                        }}
                    />

                    <h1 className="text-lg font-semibold tracking-wide">{name[language]}</h1>
                </div>

                <div className="prose prose-stone w-full max-w-screen-lg dark:prose-invert">
                    {parseParagraphsWithDice(description[language])}
                </div>

                <div className="mt-32 flex w-full flex-col gap-4 border-4 border-dashed border-yellow-500 p-4">
                    <VscTools className="h-10 w-10" />

                    {renderObject(spell)}
                </div>
            </div>
        </main>
    );
};

export default SpellPage;
