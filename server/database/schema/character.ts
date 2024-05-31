import { knownCantrips } from "@/server/database/schema/relations/knownCantrips";
import { knownSpells } from "@/server/database/schema/relations/knownSpells";
import { preparedSpells } from "@/server/database/schema/relations/preparedSpells";
import { spellSlots } from "@/server/database/schema/spellSlots";
import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const character = pgTable("character", {
    id: serial("id").primaryKey().notNull(),

    name: text("name").notNull(),
    level: integer("level").notNull(),
    class: text("class").notNull(),
    ability: integer("ability").notNull(),

    spellSlotsAvailableId: integer("spellSlotsAvailableId").references(() => spellSlots.id, { onDelete: "restrict" }),
});

export const characterRelations = relations(character, ({ many, one }) => ({
    knownSpells: many(knownSpells),
    preparedSpells: many(preparedSpells),
    knownCantrips: many(knownCantrips),

    spellSlotsAvailable: one(spellSlots, {
        fields: [character.spellSlotsAvailableId],
        references: [spellSlots.id],
    }),
}));
