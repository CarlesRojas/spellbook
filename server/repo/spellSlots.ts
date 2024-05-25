"use server";

import { db } from "@/server/database";
import { spellSlots } from "@/server/database/schema";
import { SpellSlots } from "@/type/SpellSlots";
import { eq } from "drizzle-orm";

interface SpellSlotsWithId extends SpellSlots {
    id: number;
    characterId: number;
}

export const updateSpellSlots = async (newSpellSlots: SpellSlotsWithId) => {
    await db.update(spellSlots).set(newSpellSlots).where(eq(spellSlots.id, newSpellSlots.id));
};
