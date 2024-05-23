import { character } from "@/server/database/schema/character";
import { spell } from "@/server/database/schema/spell";
import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";

export const knownSpells = pgTable(
    "knownSpells",
    {
        characterId: integer("characterId").references(() => character.id, { onDelete: "cascade" }),
        spellIndex: text("spellIndex").references(() => spell.index, { onDelete: "cascade" }),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.characterId, t.spellIndex] }),
    }),
);

export const knownSpellsRelations = relations(knownSpells, ({ one }) => ({
    character: one(character, {
        fields: [knownSpells.characterId],
        references: [character.id],
    }),

    spell: one(spell, {
        fields: [knownSpells.spellIndex],
        references: [spell.index],
    }),
}));
