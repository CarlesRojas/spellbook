import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        idToken: string;
        accessToken: string;
    }

    interface Session extends DefaultSession {
        user: User;
    }
}
