import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: serial("id").notNull(),
    email: text("email").primaryKey().notNull(),
    name: text("name").notNull(),
});
