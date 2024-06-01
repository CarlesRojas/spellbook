import { PageProps } from "@/app/[language]/layout";
import BackButton from "@/component/navigation/BackButton";
import NotFound from "@/component/navigation/NotFound";
import { useTranslation } from "@/hook/useTranslation";
import { parseParagraphsWithDice } from "@/lib/dice";
import { damageColor, damageTypeIcon, getSpellRawColor } from "@/lib/spell";
import { cn } from "@/lib/util";
import { getAllSpells, getSpell } from "@/server/repo/spell";
import { Language } from "@/type/Language";
import { NotFoundType } from "@/type/NotFoundType";
import { ReactNode } from "react";

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
        school,
        damage,
        difficultyClass,
        level,
        icon,
        color,
    } = spell;

    const tags: {
        label: string;
        value: string;
        icon?: ReactNode;
        color?: string;
    }[] = [
        {
            label: t.dnd.spell.tag.level,
            value: level === 0 ? t.dnd.cantrip : level + (ritual ? `(${t.dnd.spell.tag.ritual})` : ""),
        },
        {
            label: t.dnd.spell.tag.castingTime,
            value: t.enum.castingTime[castingTime] + (concentration ? ` (${t.dnd.spell.tag.concentration})` : ""),
        },
        { label: t.dnd.spell.tag.duration, value: t.enum.duration[duration] },
        {
            label: t.dnd.spell.tag.components,
            value: components.map((component) => t.enum.component[component]).join(", "),
        },
        {
            label: t.dnd.spell.tag.range,
            value: t.enum.range[range],
        },
    ];

    if (areaOfEffect)
        tags.push({
            label: t.dnd.spell.tag.areaOfEffect,
            value: `${t.enum.areaOfEffect[areaOfEffect.type]} (${areaOfEffect.size} ${t.dnd.spell.feet})`,
        });

    if (difficultyClass) tags.push({ label: t.dnd.spell.tag.savingThrow, value: t.enum.ability[difficultyClass.type] });

    if (damage && damage.type)
        tags.push({
            label: t.dnd.spell.tag.damageType,
            value: t.enum.damageType[damage.type],
            icon: damageTypeIcon[damage.type],
            color: damageColor[damage.type],
        });

    return (
        <main className="relative flex h-full w-full flex-col items-center">
            <div className="relative flex h-fit min-h-full w-full max-w-screen-lg flex-col gap-8 p-4">
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
                            backgroundColor: getSpellRawColor(color),
                        }}
                    />

                    <h1 className="text-lg font-semibold tracking-wide">{name[language]}</h1>
                    <p className="font-medium tracking-wide opacity-50">{t.enum.school[school]}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {tags.map(({ label, value, icon, color }, index) => (
                        <div key={index} className="flex w-full flex-col">
                            <p className="text-sm font-medium tracking-wide opacity-50">{label}</p>

                            <div className="flex items-center gap-1">
                                {icon && <div className="h-fit w-fit">{icon}</div>}
                                <p className={cn("font-semibold tracking-wide", color, color && "font-bold")}>
                                    {value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="prose prose-stone w-full max-w-screen-lg dark:prose-invert">
                    {parseParagraphsWithDice(description[language])}
                </div>

                {highLevelDescription && (
                    <div className="prose prose-stone w-full max-w-screen-lg dark:prose-invert">
                        <h2 className="text-lg font-semibold tracking-wide text-sky-500">
                            {t.dnd.spell.highLevelDescription}
                        </h2>

                        {parseParagraphsWithDice(highLevelDescription[language])}
                    </div>
                )}

                {damage && (damage.slotLevel || damage.characterLevel) && (
                    <div className="grid w-full max-w-screen-lg gap-8 md:grid-cols-2">
                        {damage.slotLevel && (
                            <div className="flex flex-col">
                                <table className="prose prose-stone w-full table-auto dark:prose-invert">
                                    <thead>
                                        <tr>
                                            <th className="p-2 text-left">{t.dnd.spell.slotLevel}</th>
                                            <th className="p-2 text-left">{t.dnd.spell.damage}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(damage.slotLevel).map(([level, description]) => (
                                            <tr key={level}>
                                                <td className="p-2 text-left">{level}</td>
                                                <td className="p-2 text-left">
                                                    {parseParagraphsWithDice(description)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {damage.characterLevel && (
                            <div className="flex flex-col">
                                <table className="prose prose-stone w-full table-auto dark:prose-invert">
                                    <thead>
                                        <tr>
                                            <th className="p-2 text-left">{t.dnd.spell.characterLevel}</th>
                                            <th className="p-2 text-left">{t.dnd.spell.damage}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(damage.characterLevel).map(([level, description]) => (
                                            <tr key={level}>
                                                <td className="p-2 text-left">{level}</td>
                                                <td className="p-2 text-left">
                                                    {parseParagraphsWithDice(description)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {difficultyClass && difficultyClass.description && (
                    <div className="prose prose-stone w-full max-w-screen-lg dark:prose-invert">
                        <h2 className="text-lg font-semibold tracking-wide text-sky-500">
                            {t.dnd.spell.difficultyClass}
                        </h2>

                        {parseParagraphsWithDice(difficultyClass.description[language])}
                    </div>
                )}

                {material && (
                    <div className="prose prose-stone w-full max-w-screen-lg dark:prose-invert">
                        <h2 className="text-lg font-semibold tracking-wide text-sky-500">{t.dnd.spell.material}</h2>

                        {parseParagraphsWithDice(material[language])}
                    </div>
                )}
            </div>
        </main>
    );
};

export default SpellPage;
