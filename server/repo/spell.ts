"use server";

import { InferResultType, db } from "@/server/database";
import { spell } from "@/server/database/schema/spell";
import { deleteTranslation } from "@/server/repo/translation";
import { Spell, SpellSchema } from "@/type/Spell";
import { eq } from "drizzle-orm";

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

export const updateSpell = async (updatedSpell: NewSpell) => {
    const result = await db.update(spell).set(updatedSpell).where(eq(spell.index, updatedSpell.index)).returning();

    return result.length > 0 ? result[0] : null;
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
    return toSpell(result);
};

export const deleteSpell = async (index: string) => {
    const spellToDelete = await db.query.spell.findFirst({
        where: (spell, { eq }) => eq(spell.index, index),
    });
    if (!spellToDelete) return;

    await db.delete(spell).where(eq(spell.index, index));

    spellToDelete.nameId && (await deleteTranslation(spellToDelete.nameId));
    spellToDelete.descriptionId && (await deleteTranslation(spellToDelete.descriptionId));
    spellToDelete.highLevelDescriptionId && (await deleteTranslation(spellToDelete.highLevelDescriptionId));
    spellToDelete.materialId && (await deleteTranslation(spellToDelete.materialId));
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
        where: (spell, { isNull }) => isNull(spell.userId),
    });

    return result.map(toSpell);
};

export const getUserSpells = async (userId: number) => {
    const result = await db.query.spell.findMany({
        with: {
            name: true,
            description: true,
            highLevelDescription: true,
            material: true,
        },
        where: (spell, { eq }) => eq(spell.userId, userId),
    });

    return result.map(toSpell);
};

export const clearSpells = async () => {
    await db.delete(spell).execute();
};

const toSpell = (spell: SelectedSpell): Spell => {
    return SpellSchema.parse(spell) as Spell;
};
