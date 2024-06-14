import { z } from "zod";

export const UserSchema = z.object({
    id: z.number(),
    email: z.string(),
    name: z.string(),
    image: z.string().optional(),
    characters: z.array(z.number()),
});

export type User = z.infer<typeof UserSchema>;
