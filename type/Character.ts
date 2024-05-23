import { ClassType, SpellSchema } from "@/type/Spell";
import { SpellSlotsSchema } from "@/type/SpellSlots";
import { ArrayWith20Positions } from "@/type/utils";
import { z } from "zod";

export const CharacterSchema = z.object({
    id: z.number(),

    name: z.string(),
    level: z.number().min(0).max(20),
    class: z.nativeEnum(ClassType),
    ability: z.number(),

    knownSpells: z.array(SpellSchema),
    preparedSpells: z.array(SpellSchema),
    knownCantrips: z.array(SpellSchema),

    spellSlotsAvailable: SpellSlotsSchema,
});
export type Character = z.infer<typeof CharacterSchema>;

export const ZERO: ArrayWith20Positions<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
