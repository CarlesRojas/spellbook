"use server";

import { InferResultType, db } from "@/server/database";
import { user } from "@/server/database/schema/user";
import { User, UserSchema } from "@/type/User";

type NewUser = typeof user.$inferInsert;
type SelectedUser = InferResultType<"user", { characters: true }>;

export const createUser = async (newUser: NewUser) => {
    const result = await db.insert(user).values(newUser).returning();

    return result.length > 0 ? result[0].email : null;
};

export const getUser = async (email: string, name: string, image?: string) => {
    if (!(await existsUser(email))) await createUser({ email, name });

    const result = await db.query.user.findFirst({
        where: (user, { eq }) => eq(user.email, email),
        with: { characters: true },
    });

    if (!result) return null;
    return toUser(result, image);
};

export const getUserById = async (id: number) => {
    const result = await db.query.user.findFirst({
        where: (user, { eq }) => eq(user.id, id),
        with: { characters: true },
    });

    if (!result) return null;
    return toUser(result);
};

export const existsUser = async (email: string) => {
    const result = await db.query.user.findFirst({
        where: (user, { eq }) => eq(user.email, email),
    });

    return !!result;
};

const toUser = (user: SelectedUser, image?: string): User => {
    const characters = user.characters
        .filter(({ characterId }) => !!characterId)
        .map(({ characterId }) => characterId!);

    return UserSchema.parse({ ...user, image, characters }) as User;
};
