"use server";

import { getTotalSpellSlots } from "@/lib/character";
import { InferResultType, db } from "@/server/database";
import { spellSlots } from "@/server/database/schema";
import { character } from "@/server/database/schema/character";
import { characters } from "@/server/database/schema/relations/characters";
import { createUser, existsUser } from "@/server/repo/user";
import { Character, CharacterSchema, CharacterWithSpells, CharacterWithSpellsSchema } from "@/type/Character";
import { ClassType } from "@/type/Spell";
import { and, eq } from "drizzle-orm";

export type NewCharacter = typeof character.$inferInsert;
type SelectedCharacter = InferResultType<"character">;
type SelectedCharacterWithSpells = InferResultType<
    "character",
    {
        knownSpells: {
            columns: {};
            with: { spell: { with: { name: true; description: true; highLevelDescription: true; material: true } } };
        };
        preparedSpells: {
            columns: { counts: true };
            with: { spell: { with: { name: true; description: true; highLevelDescription: true; material: true } } };
        };
        knownCantrips: {
            columns: {};
            with: { spell: { with: { name: true; description: true; highLevelDescription: true; material: true } } };
        };
        spellSlotsAvailable: true;
        concentratingOn: true;
    }
>;

interface NewCharacterWithUser extends NewCharacter {
    userEmail: string;
    userName: string;
}

export const createCharacter = async (newCharacter: NewCharacterWithUser) => {
    if (!(await existsUser(newCharacter.userEmail)))
        createUser({ email: newCharacter.userEmail, name: newCharacter.userName });

    const spellSlotsResult = await db
        .insert(spellSlots)
        .values(getTotalSpellSlots(newCharacter.class as ClassType, newCharacter.level))
        .returning();
    const spellSlotsId = spellSlotsResult.length > 0 ? spellSlotsResult[0].id : null;
    if (!spellSlotsId) return null;

    const characterResult = await db
        .insert(character)
        .values({ ...newCharacter, spellSlotsAvailableId: spellSlotsId })
        .returning();
    const characterId = characterResult.length > 0 ? characterResult[0].id : null;
    if (!characterId) return null;

    await db.insert(characters).values({
        characterId,
        userEmail: newCharacter.userEmail,
    });

    return characterId;
};

export const getCharacter = async (id: number) => {
    const result = await db.query.character.findFirst({
        where: (character, { eq }) => eq(character.id, id),
        with: {
            knownSpells: {
                columns: {},
                with: {
                    spell: { with: { name: true, description: true, highLevelDescription: true, material: true } },
                },
            },
            preparedSpells: {
                columns: { counts: true },
                with: {
                    spell: { with: { name: true, description: true, highLevelDescription: true, material: true } },
                },
            },
            knownCantrips: {
                columns: {},
                with: {
                    spell: { with: { name: true, description: true, highLevelDescription: true, material: true } },
                },
            },
            spellSlotsAvailable: true,
            concentratingOn: { with: { name: true, description: true, highLevelDescription: true, material: true } },
        },
    });

    if (!result) return null;
    return toCharacterWithSpells(result);
};

export const getUserCharacters = async (userEmail: string) => {
    const result = await db.query.characters.findMany({
        where: (characters, { eq }) => eq(characters.userEmail, userEmail),
        with: { character: true },
        orderBy: (characters, { desc }) => desc(characters.characterId),
    });

    return result.filter(({ character }) => !!character).map(({ character }) => toCharacter(character!));
};

export const updateCharacter = async (updatedCharacter: Character) => {
    const oldCharacter = await db.query.character.findFirst({
        where: (character, { eq }) => eq(character.id, updatedCharacter.id),
    });
    if (!oldCharacter) return;

    await db.update(character).set(updatedCharacter).where(eq(character.id, updatedCharacter.id));

    if (oldCharacter.spellSlotsAvailableId && oldCharacter.level !== updatedCharacter.level)
        await db
            .update(spellSlots)
            .set(getTotalSpellSlots(updatedCharacter.class, updatedCharacter.level))
            .where(eq(spellSlots.id, oldCharacter.spellSlotsAvailableId));
};

export const setConcentratingSpell = async (updatedCharacter: CharacterWithSpells) => {
    await db
        .update(character)
        .set({ ...updatedCharacter, concentratingOnId: updatedCharacter.concentratingOnId })
        .where(eq(character.id, updatedCharacter.id));
};

export const deleteCharacter = async (id: number) => {
    const characterToDelete = await db.query.character.findFirst({
        where: (character, { eq }) => eq(character.id, id),
    });
    if (!characterToDelete) return;

    await db.delete(character).where(and(eq(character.id, id)));

    characterToDelete.spellSlotsAvailableId &&
        (await db.delete(spellSlots).where(and(eq(spellSlots.id, characterToDelete.spellSlotsAvailableId))));
};

const toCharacter = (character: SelectedCharacter) => {
    return CharacterSchema.parse(character) as Character;
};

const toCharacterWithSpells = (character: SelectedCharacterWithSpells) => {
    const knownSpells = character.knownSpells.map(({ spell }) => ({ ...spell }));
    const preparedSpells = character.preparedSpells.map(({ spell, counts }) => ({ ...spell, counts }));
    const knownCantrips = character.knownCantrips.map(({ spell }) => ({ ...spell }));

    return CharacterWithSpellsSchema.parse({
        ...character,
        knownSpells,
        preparedSpells,
        knownCantrips,
    }) as CharacterWithSpells;
};
