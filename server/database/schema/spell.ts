import { knownSpells } from "@/server/database/schema/relations/knownSpells";
import { translation } from "@/server/database/schema/translation";
import { user } from "@/server/database/schema/user";
import { AreaOfEffect, ClassList, Components, Damage, DifficultyClass, SubclassList } from "@/type/Spell";
import { relations } from "drizzle-orm";
import { boolean, integer, json, pgTable, text } from "drizzle-orm/pg-core";

export const spell = pgTable("spell", {
    index: text("index").primaryKey().notNull(),
    nameId: integer("nameId")
        .references(() => translation.id, { onDelete: "restrict" })
        .notNull(),
    descriptionId: integer("descriptionId")
        .references(() => translation.id, { onDelete: "restrict" })
        .notNull(),
    highLevelDescriptionId: integer("highLevelDescriptionId").references(() => translation.id, {
        onDelete: "restrict",
    }),
    range: text("range").notNull(),
    components: json("components").$type<Components>().notNull(),
    materialId: integer("materialId").references(() => translation.id, { onDelete: "restrict" }),
    areaOfEffect: json("areaOfEffect").$type<AreaOfEffect>(),
    ritual: boolean("ritual").notNull(),
    duration: text("duration").notNull(),
    concentration: boolean("concentration").notNull(),
    castingTime: text("castingTime").notNull(),
    attackType: text("attackType"),
    school: text("school").notNull(),
    classes: json("classes").$type<ClassList>().notNull(),
    subclasses: json("subclasses").$type<SubclassList>().notNull(),
    damage: json("damage").$type<Damage>(),
    difficultyClass: json("difficultyClass").$type<DifficultyClass>(),
    level: integer("level").notNull(),
    icon: text("icon").notNull(),
    color: text("color").notNull(),
    userId: integer("userId").references(() => user.id, { onDelete: "cascade" }),
});

export const spellRelations = relations(spell, ({ many, one }) => ({
    name: one(translation, {
        fields: [spell.nameId],
        references: [translation.id],
    }),

    description: one(translation, {
        fields: [spell.descriptionId],
        references: [translation.id],
    }),

    highLevelDescription: one(translation, {
        fields: [spell.highLevelDescriptionId],
        references: [translation.id],
    }),

    material: one(translation, {
        fields: [spell.materialId],
        references: [translation.id],
    }),

    user: one(user, {
        fields: [spell.userId],
        references: [user.id],
    }),

    known: many(knownSpells),
    prepared: many(knownSpells),
    knownCantrips: many(knownSpells),
}));
