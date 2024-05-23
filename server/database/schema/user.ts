import { characters } from "@/server/database/schema/relations/characters";
import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: serial("id").notNull(),
    email: text("email").primaryKey().notNull(),
    name: text("name").notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
    characters: many(characters),
}));
