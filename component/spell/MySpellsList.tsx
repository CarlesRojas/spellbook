"use client";

import ScrollToTop from "@/component/ScrollToTop";
import QueryFilter from "@/component/filter/QueryFilter";
import UserSpellForm from "@/component/spell/UserSpellForm";
import UserSpellItem from "@/component/spell/UserSpellItem";
import { Button } from "@/component/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/component/ui/dialog";
import { useTranslation } from "@/hook/useTranslation";
import { useUrlState } from "@/hook/useUrlState";
import { getSpellsByLevel } from "@/lib/spell";
import { cn } from "@/lib/util";
import { useSpells, useUserSpells } from "@/server/use/useSpells";
import { Language } from "@/type/Language";
import { User } from "@/type/User";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { z } from "zod";

interface Props {
    language: Language;
    user: User;
}

const MySpellsList = ({ language, user }: Props) => {
    const { t } = useTranslation(language);

    const [query, setQuery] = useUrlState("query", "", z.string());

    const userSpells = useUserSpells(user.id);
    const spells = useSpells();

    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    const filteredSpells = userSpells.data
        ? userSpells.data
              .filter((spell) => {
                  if (query && !spell.name[language].toLowerCase().includes(query.toLowerCase())) return false;
                  return true;
              })
              .sort((a, b) => {
                  if (a.level === b.level) return a.name[language].localeCompare(b.name[language]);
                  return a.level - b.level;
              })
        : [];

    const spellsByLevel = getSpellsByLevel(filteredSpells);

    return (
        <section className="relative flex h-fit min-h-full w-full max-w-screen-lg flex-col">
            <div className="sticky top-0 z-50 bg-stone-100 p-4 dark:bg-stone-950 mouse:top-16">
                <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button disabled={spells.isLoading || !spells.data}>
                            <LuPlus className="mr-3 h-4 w-4 stroke-[3]" />
                            {t.dnd.newSpell.createSpell}
                        </Button>
                    </DialogTrigger>

                    <DialogContent position="top" className="md:w-full">
                        <DialogHeader>
                            <DialogTitle className="px-2">{t.dnd.newSpell.createSpell}</DialogTitle>
                        </DialogHeader>

                        {spells.data && (
                            <UserSpellForm
                                user={user}
                                spells={spells.data}
                                language={language}
                                onClose={() => setCreateDialogOpen(false)}
                            />
                        )}
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-col p-4">
                <div className="flex w-full flex-col justify-end gap-2 md:flex-row">
                    <QueryFilter language={language} query={query} setQuery={setQuery} />
                </div>

                <div className={cn("flex justify-end", userSpells.isLoading ? "pointer-events-none opacity-0" : "")}>
                    <p className="text-sm font-medium tracking-wide opacity-60">
                        {filteredSpells.length > 0
                            ? `${filteredSpells.length} ${filteredSpells.length === 1 ? t.filter.result : t.filter.results}`
                            : `${t.filter.noResults}`}
                    </p>
                </div>

                <div className="flex w-full flex-col gap-2">
                    {Object.entries(spellsByLevel).map(([level, levelSpells]) => (
                        <div
                            key={level}
                            className="hidden w-full grid-cols-3 gap-4 has-[.spell]:grid sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
                        >
                            <h2 className="sticky top-[4rem] z-20 col-span-3 mt-4 w-full bg-stone-100 py-2 text-center text-lg font-bold tracking-wider text-sky-500 dark:bg-stone-950 sm:col-span-4 md:col-span-5 lg:col-span-6 mouse:top-[8rem]">
                                {level === "0" ? t.dnd.cantrips : `${t.filter.level} ${level}`}
                            </h2>

                            {levelSpells.map((spell) => (
                                <UserSpellItem
                                    key={spell.index}
                                    language={language}
                                    spell={spell}
                                    user={user}
                                    spells={spells.data}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <ScrollToTop />
        </section>
    );
};

export default MySpellsList;
