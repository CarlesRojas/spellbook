"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getUserFromSession } from "@/server/use/useUser";
import { getServerSession } from "next-auth";

export const getServerUser = async () => {
    const session = await getServerSession(authOptions);
    return await getUserFromSession(session);
};
