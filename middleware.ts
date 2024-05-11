import { env } from "@/env";
import { DEFAULT_LANGUAGE, LANGUAGES } from "@/type/Language";
import acceptLanguage from "accept-language";
import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Route, pathnameToRoute } from "./type/Route";

acceptLanguage.languages(LANGUAGES);

const excludedPaths = [
    "api",
    "_next/static",
    "_next/image",
    "asset",
    "favicon.ico",
    "sw.js",
    "swe-worker",
    "workbox",
    ".json",
    ".png",
    ".ico",
];

const isLanguageInPathname = (request: NextRequestWithAuth) => {
    return (
        LANGUAGES.some((location) => request.nextUrl.pathname.startsWith(`/${location}`)) ||
        request.nextUrl.pathname.startsWith("/_next")
    );
};

const isUserAuthenticated = (request: NextRequestWithAuth) => {
    const authToken = request.nextauth.token;
    return !!authToken;
};

const userRoutes: Route[] = [];

export default withAuth(
    async function middleware(request: NextRequestWithAuth) {
        const path = request.nextUrl.pathname;
        if (excludedPaths.some((excludedPath) => path.includes(excludedPath))) return NextResponse.next();

        let language = acceptLanguage.get(request.headers.get("Accept-Language")) ?? DEFAULT_LANGUAGE;

        if (!isLanguageInPathname(request)) return NextResponse.redirect(new URL(`/${language}${path}`, request.url));

        const currentRoute = pathnameToRoute(path.replace(`/${language}`, "") || "/");

        if (userRoutes.includes(currentRoute) && !isUserAuthenticated(request))
            return NextResponse.redirect(new URL(Route.HOME, request.url));

        return NextResponse.next();
    },
    {
        secret: env.NEXTAUTH_SECRET,
        callbacks: { authorized: () => true },
    },
);
