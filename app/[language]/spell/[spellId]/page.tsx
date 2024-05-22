import { PageProps } from "@/app/[language]/layout";
import BackButton from "@/component/navigation/BackButton";
import NotFound from "@/component/navigation/NotFound";
import { useTranslation } from "@/hook/useTranslation";
import { getSpellColor } from "@/lib/spell";
import { getAllSpells, getSpell } from "@/server/repo/spell";
import { Language } from "@/type/Language";
import { NotFoundType } from "@/type/NotFoundType";
import { convertHtmlToReact } from "@hedgedoc/html-to-react";

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
                        className="mb-2 inline-block h-32 min-h-32 w-32 min-w-32 bg-cover brightness-90 dark:brightness-100"
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
                    <small className="text-sm opacity-60">{t.enum.school[school]}</small>
                </div>

                <div className="prose prose-stone flex w-full max-w-screen-lg flex-col gap-4 dark:prose-invert">
                    {/* TODO <p key={i}>{parseParagraphsWithDice(description[language]).map((paragraphPart) => paragraphPart)}</p> */}
                    {convertHtmlToReact(description[language])}
                </div>
            </div>
        </main>
    );
};

export default SpellPage;
