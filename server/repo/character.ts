"use server";

import { getTotalSpellSlots } from "@/lib/character";
import { InferResultType, db } from "@/server/database";
import { spellSlots } from "@/server/database/schema";
import { character } from "@/server/database/schema/character";
import { characters } from "@/server/database/schema/relations/characters";
import { createUser, existsUser } from "@/server/repo/user";
import { Character, CharacterSchema } from "@/type/Character";
import { ClassType } from "@/type/Spell";
import { and, eq } from "drizzle-orm";

type NewCharacter = typeof character.$inferInsert;
type SelectedCharacter = InferResultType<
    "character",
    {
        knownSpells: { columns: {}; with: { spell: true } };
        preparedSpells: { columns: {}; with: { spell: true } };
        knownCantrips: { columns: {}; with: { spell: true } };
        spellSlotsAvailable: true;
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
            knownSpells: { columns: {}, with: { spell: true } },
            preparedSpells: { columns: {}, with: { spell: true } },
            knownCantrips: { columns: {}, with: { spell: true } },
            spellSlotsAvailable: true,
        },
    });

    if (!result) return null;
    return toDomain(result);
};

export const getUserCharacters = async (userEmail: string) => {
    const result = await db.query.characters.findMany({
        where: (characters, { eq }) => eq(characters.userEmail, userEmail),
        with: {
            character: {
                with: {
                    knownSpells: { columns: {}, with: { spell: true } },
                    preparedSpells: { columns: {}, with: { spell: true } },
                    knownCantrips: { columns: {}, with: { spell: true } },
                    spellSlotsAvailable: true,
                },
            },
        },
        orderBy: (characters, { desc }) => desc(characters.characterId),
    });

    return result.filter(({ character }) => !!character).map(({ character }) => toDomain(character!));
};

export const deleteCharacter = async (id: number) => {
    await db.delete(character).where(and(eq(character.id, id)));
};

const toDomain = (character: SelectedCharacter) => {
    const knownSpells = character.knownSpells.map((elem) => elem.spell);
    const preparedSpells = character.preparedSpells.map((elem) => elem.spell);
    const knownCantrips = character.knownCantrips.map((elem) => elem.spell);

    return CharacterSchema.parse({
        ...character,
        knownSpells,
        preparedSpells,
        knownCantrips,
    }) as Character;
};
