import { getUser } from "@/server/repo/user";
import { Route } from "@/type/Route";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
import { getSession, signIn as signInWithGoogle, signOut as signOutFromGoogle } from "next-auth/react";

const getUserFromSession = async (session: Session | null) => {
    if (!session?.user || !session.user.email) return null;

    const email = session.user.email;
    const name = session.user.name ?? email;
    const image = session.user.image ?? undefined;
    const user = await getUser(email, name, image);

    return user;
};

const getClientSide = async () => {
    const session = await getSession();
    return getUserFromSession(session);
};

export const useUser = () => {
    const user = useQuery({
        queryKey: ["user"],
        queryFn: () => getClientSide(),
    });

    const signIn = async (callbackUrl: string = Route.SPELLS) => {
        signInWithGoogle("google", { callbackUrl });
    };

    const signOut = async () => {
        signOutFromGoogle();
    };

    const requireUser = (callback: () => void) => {
        if (user.data) callback();
        else signIn();
    };

    return { user, requireUser, signIn, signOut };
};
