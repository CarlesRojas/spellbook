"use client";
import { PageProps } from "@/app/[language]/layout";
import { clearSpells, createSpell } from "@/server/repo/spell";
import spells from "@/server/scraper/resultSpells.json";
import { SpellSchema } from "@/type/Spell";

const Spells = ({ params: { language } }: PageProps) => {
    const createSpells = async () => {
        await clearSpells();
        for (const spell of spells) {
            console.log(spell);
            await createSpell(SpellSchema.parse(spell));
        }
    };

    return (
        <main className="relative flex h-full w-full flex-col items-center">
            <div className="relative flex h-fit min-h-full w-full justify-center overflow-y-auto">
                Spells<button onClick={createSpells}>Create</button>
            </div>
        </main>
    );
};

export default Spells;
