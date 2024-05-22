"use server";

import { InferResultType, db } from "@/server/database";
import { spell } from "@/server/database/schema/spell";
import { Spell, SpellSchema } from "@/type/Spell";

type NewSpell = typeof spell.$inferInsert;
type SelectedSpell = InferResultType<
    "spell",
    {
        name: true;
        description: true;
        highLevelDescription: true;
        material: true;
    }
>;

export const createSpell = async (newSpell: NewSpell) => {
    const result = await db.insert(spell).values(newSpell).returning();

    return result.length > 0 ? result[0].index : null;
};

export const getSpell = async (index: string) => {
    const result = await db.query.spell.findFirst({
        where: (spell, { eq }) => eq(spell.index, index),
        with: {
            name: true,
            description: true,
            highLevelDescription: true,
            material: true,
        },
    });

    if (!result) return null;
    return toDomain(result);
};

export const existsSpell = async (index: string) => {
    const result = await db.query.spell.findFirst({
        where: (spell, { eq }) => eq(spell.index, index),
    });

    return !!result;
};

export const getAllSpells = async () => {
    const result = await db.query.spell.findMany({
        with: {
            name: true,
            description: true,
            highLevelDescription: true,
            material: true,
        },
    });

    return result.map(toDomain);
};

export const clearSpells = async () => {
    await db.delete(spell).execute();
};

const toDomain = (spell: SelectedSpell): Spell => {
    return SpellSchema.parse({ ...spell }) as Spell;
};
