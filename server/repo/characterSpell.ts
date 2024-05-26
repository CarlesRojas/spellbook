"use server";

import { db } from "@/server/database";
import { knownCantrips, knownSpells, preparedSpells } from "@/server/database/schema";
import { Spell, SpellWithCounts } from "@/type/Spell";
import { and, eq } from "drizzle-orm";

interface CharacterSpell {
    characterId: number;
    spellIndex: string;
    counts?: boolean;
}

interface CharacterSpellComplete extends CharacterSpell {
    spell: Spell;
}

interface CharacterSpellCompleteWithCounts extends CharacterSpell {
    spell: SpellWithCounts;
}

export const learnSpell = async ({ characterId, spellIndex }: CharacterSpellComplete) => {
    await db.insert(knownSpells).values({ characterId, spellIndex });
};

export const forgetSpell = async ({ characterId, spellIndex }: CharacterSpell) => {
    await Promise.all([
        db
            .delete(knownSpells)
            .where(and(eq(knownSpells.characterId, characterId), eq(knownSpells.spellIndex, spellIndex))),
        db
            .delete(preparedSpells)
            .where(and(eq(preparedSpells.characterId, characterId), eq(preparedSpells.spellIndex, spellIndex))),
    ]);
};

export const prepareSpell = async ({ characterId, spellIndex, counts = true }: CharacterSpellCompleteWithCounts) => {
    await db.insert(preparedSpells).values({ characterId, spellIndex, counts });
};

export const unprepareSpell = async ({ characterId, spellIndex }: CharacterSpell) => {
    await db
        .delete(preparedSpells)
        .where(and(eq(preparedSpells.characterId, characterId), eq(preparedSpells.spellIndex, spellIndex)));
};

export const learnCantrip = async ({ characterId, spellIndex }: CharacterSpellComplete) => {
    await db.insert(knownCantrips).values({ characterId, spellIndex });
};

export const forgetCantrip = async ({ characterId, spellIndex }: CharacterSpell) => {
    await db
        .delete(knownCantrips)
        .where(and(eq(knownCantrips.characterId, characterId), eq(knownCantrips.spellIndex, spellIndex)));
};
