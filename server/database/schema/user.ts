import { characters } from "@/server/database/schema/relations/characters";
import { relations } from "drizzle-orm";
import { pgTable, serial, text, uniqueIndex } from "drizzle-orm/pg-core";

export const user = pgTable(
    "user",
    {
        id: serial("id").notNull().unique(),
        email: text("email").primaryKey().notNull(),
        name: text("name").notNull(),
    },
    (table) => ({
        idIndex: uniqueIndex("id_index").on(table.id),
    }),
);

export const userRelations = relations(user, ({ many }) => ({
    characters: many(characters),
}));
