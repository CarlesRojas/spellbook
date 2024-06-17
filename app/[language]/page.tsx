import { PageProps } from "@/app/[language]/layout";
import SpellList from "@/component/spell/SpellList";
import { Button } from "@/component/ui/button";
import { getTranslation } from "@/hook/useTranslation";
import { getAllSpells } from "@/server/repo/spell";
import { Route } from "@/type/Route";
import Link from "next/link";
import { Suspense } from "react";

export const revalidate = 60 * 60 * 24; // 1 day

const Spells = async ({ params: { language } }: PageProps) => {
    const t = getTranslation(language);
    const initialSpellsData = await getAllSpells();

    return (
        <main className="relative flex h-full w-full flex-col items-center">
            <div className="relative flex h-fit min-h-full w-full justify-center">
                <Suspense fallback={null}>
                    <SpellList language={language} initialSpellsData={initialSpellsData} />
                </Suspense>
            </div>

            <div className="flex w-fit flex-wrap gap-x-4">
                <Button className="text-sm opacity-50" variant="link" asChild>
                    <Link href={`${Route.PRIVACY_POLICY}`}>{t.enum.route[Route.PRIVACY_POLICY]}</Link>
                </Button>
            </div>
        </main>
    );
};

export default Spells;
