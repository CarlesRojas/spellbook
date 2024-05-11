import { AreaOfEffect, Class, ComponentType, Damage, DifficultyClass, School } from "@/type/Spell";
import { boolean, json, pgEnum, pgTable, text } from "drizzle-orm/pg-core";

const componentEnum = pgEnum("component_type", Object.values(ComponentType) as [string, ...string[]]);

export const spell = pgTable("spell", {
    index: text("index").primaryKey().notNull(),
    name: text("name").notNull(),
    description: text("description").array().notNull(),
    highLevelDescription: text("high_level_description").array().notNull(),
    range: text("range").notNull(),
    components: componentEnum("components").array().notNull(),
    material: text("material"),
    areaOfEffect: json("area_of_effect").$type<AreaOfEffect>(),
    ritual: boolean("ritual").notNull(),
    duration: text("duration").notNull(),
    concentration: boolean("concentration").notNull(),
    castingTime: text("casting_time").notNull(),
    attackType: text("attack_type"),
    school: json("school").$type<School>().notNull(),
    classes: json("classes").$type<Class>().array().notNull(),
    subclasses: json("subclasses").$type<Class>().array().notNull(),
    damage: json("damage").$type<Damage>(),
    difficultyClass: json("difficulty_class").$type<DifficultyClass>(),
});
