import { character } from "@/server/database/schema/character";
import { spell } from "@/server/database/schema/spell";
import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";

export const preparedSpells = pgTable(
    "preparedSpells",
    {
        characterId: integer("characterId").references(() => character.id, { onDelete: "cascade" }),
        spellIndex: text("spellIndex").references(() => spell.index, { onDelete: "cascade" }),
        counts: boolean("counts").default(true),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.characterId, t.spellIndex] }),
    }),
);

export const preparedSpellsRelations = relations(preparedSpells, ({ one }) => ({
    character: one(character, {
        fields: [preparedSpells.characterId],
        references: [character.id],
    }),

    spell: one(spell, {
        fields: [preparedSpells.spellIndex],
        references: [spell.index],
    }),
}));
