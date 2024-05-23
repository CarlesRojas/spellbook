import { character } from "@/server/database/schema/character";
import { user } from "@/server/database/schema/user";
import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";

export const characters = pgTable(
    "characters",
    {
        characterId: integer("characterId").references(() => character.id, { onDelete: "cascade" }),
        userEmail: text("userEmail").references(() => user.email, { onDelete: "cascade" }),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.characterId, t.userEmail] }),
    }),
);

export const charactersRelations = relations(characters, ({ one }) => ({
    character: one(character, {
        fields: [characters.characterId],
        references: [character.id],
    }),

    user: one(user, {
        fields: [characters.userEmail],
        references: [user.email],
    }),
}));
