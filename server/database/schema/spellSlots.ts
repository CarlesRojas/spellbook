import { integer, pgTable, serial } from "drizzle-orm/pg-core";

export const spellSlots = pgTable("spellSlots", {
    id: serial("id").primaryKey().notNull(),

    level1: integer("level1").notNull(),
    level2: integer("level2").notNull(),
    level3: integer("level3").notNull(),
    level4: integer("level4").notNull(),
    level5: integer("level5").notNull(),
    level6: integer("level6").notNull(),
    level7: integer("level7").notNull(),
    level8: integer("level8").notNull(),
    level9: integer("level9").notNull(),
});
