import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const translation = pgTable("translation", {
    id: serial("id").primaryKey().notNull(),

    en: text("en").notNull(),
    es: text("es").notNull(),
});
