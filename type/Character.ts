import { ClassType, SpellSchema, SpellWithCountsSchema } from "@/type/Spell";
import { SpellSlotsSchema } from "@/type/SpellSlots";
import { ArrayWith20Positions } from "@/type/utils";
import { z } from "zod";

export const CharacterSchema = z.object({
    id: z.number(),

    name: z.string(),
    level: z.number().min(1).max(20),
    class: z.nativeEnum(ClassType),
    ability: z.number(),

    spellSlotsAvailableId: z.number(),
    concentratingOnId: z.string().nullable(),
});
export type Character = z.infer<typeof CharacterSchema>;

export const CharacterWithSpellsSchema = CharacterSchema.extend({
    knownSpells: z.array(SpellSchema),
    preparedSpells: z.array(SpellWithCountsSchema),
    knownCantrips: z.array(SpellSchema),
    spellSlotsAvailable: SpellSlotsSchema,
    concentratingOn: SpellSchema.nullable().optional(),
});
export type CharacterWithSpells = z.infer<typeof CharacterWithSpellsSchema>;

export const ZERO: ArrayWith20Positions<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
