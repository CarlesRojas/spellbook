import { PageProps } from "@/app/[language]/layout";
import SpellList from "@/component/SpellList";
import { getAllSpells } from "@/server/repo/spell";

export const revalidate = 60 * 60 * 24; // 1 day

const Spells = async ({ params: { language } }: PageProps) => {
    const initialSpellsData = await getAllSpells();

    return (
        <main className="relative flex h-full w-full flex-col items-center">
            <div className="relative flex h-fit min-h-full w-full justify-center overflow-y-auto">
                <SpellList language={language} initialSpellsData={initialSpellsData} />
            </div>
        </main>
    );
};

export default Spells;
