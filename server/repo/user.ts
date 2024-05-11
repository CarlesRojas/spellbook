"use server";

import { InferResultType, db } from "@/server/database";
import { user } from "@/server/database/schema/user";
import { User, UserSchema } from "@/type/User";

type NewUser = typeof user.$inferInsert;
type SelectedUser = InferResultType<"user">;

export const createUser = async (newUser: NewUser) => {
    const result = await db.insert(user).values(newUser).returning();

    return result.length > 0 ? result[0].email : null;
};

export const getUser = async (email: string, name: string, image?: string) => {
    if (!existsUser(email)) await createUser({ email, name });

    const result = await db.query.user.findFirst({
        where: (user, { eq }) => eq(user.email, email),
    });

    if (!result) return null;
    return toDomain(result, image);
};

export const getUserById = async (id: number) => {
    const result = await db.query.user.findFirst({
        where: (user, { eq }) => eq(user.id, id),
    });

    if (!result) return null;
    return toDomain(result);
};

export const existsUser = async (email: string) => {
    const result = await db.query.user.findFirst({
        where: (user, { eq }) => eq(user.email, email),
    });

    return !!result;
};

const toDomain = (user: SelectedUser, image?: string): User => {
    return UserSchema.parse({ ...user, image }) as User;
};
