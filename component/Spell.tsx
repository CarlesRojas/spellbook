"use client";

import { GetSpellReturnType, useSpell } from "@/server/use/useSpell";

interface Props {
    spellId: string;
    spellInitialData?: GetSpellReturnType;
}

const Spell = ({ spellId, spellInitialData }: Props) => {
    const spell = useSpell(spellId, spellInitialData);

    return <p className="p-4 font-semibold">Page for {spell.data?.name}</p>;
};

export default Spell;
