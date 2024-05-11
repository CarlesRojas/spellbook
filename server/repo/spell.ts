"use server";

import { InferResultType, db } from "@/server/database";
import { spell } from "@/server/database/schema/spell";
import { Spell, SpellSchema } from "@/type/Spell";

type NewSpell = typeof spell.$inferInsert;
type SelectedSpell = InferResultType<"spell">;

export const createSpell = async (newSpell: NewSpell) => {
    const result = await db.insert(spell).values(newSpell).returning();

    return result.length > 0 ? result[0].index : null;
};

export const getSpell = async (index: string) => {
    const result = await db.query.spell.findFirst({
        where: (spell, { eq }) => eq(spell.index, index),
    });

    if (!result) return null;
    return toDomain(result);
};

export const clearSpells = async () => {
    await db.delete(spell).execute();
};

const toDomain = (spell: SelectedSpell): Spell => {
    return SpellSchema.parse({ ...spell }) as Spell;
};
