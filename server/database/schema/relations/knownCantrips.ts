import { character } from "@/server/database/schema/character";
import { spell } from "@/server/database/schema/spell";
import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";

export const knownCantrips = pgTable(
    "knownCantrips",
    {
        characterId: integer("characterId").references(() => character.id, { onDelete: "cascade" }),
        spellIndex: text("spellIndex").references(() => spell.index, { onDelete: "cascade" }),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.characterId, t.spellIndex] }),
    }),
);

export const knownCantripsRelations = relations(knownCantrips, ({ one }) => ({
    character: one(character, {
        fields: [knownCantrips.characterId],
        references: [character.id],
    }),

    spell: one(spell, {
        fields: [knownCantrips.spellIndex],
        references: [spell.index],
    }),
}));
