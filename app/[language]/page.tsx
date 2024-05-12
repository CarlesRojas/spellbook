import { PageProps } from "@/app/[language]/layout";
import SpellList from "@/component/SpellList";
import { getAllSpells } from "@/server/repo/spell";

const Spells = async ({ params: { language } }: PageProps) => {
    const spells = await getAllSpells();

    return (
        <main className="relative flex h-full w-full flex-col items-center">
            <div className="relative flex h-fit min-h-full w-full justify-center overflow-y-auto">
                <SpellList spells={spells} language={language} />
            </div>
        </main>
    );
};

export default Spells;
