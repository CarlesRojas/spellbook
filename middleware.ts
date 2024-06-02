import { env } from "@/env";
import { pathnameToRoute } from "@/hook/useRoute";
import { DEFAULT_LANGUAGE, LANGUAGES, LANGUAGE_COOKIE_NAME, Language } from "@/type/Language";
import { Route } from "@/type/Route";
import acceptLanguage from "accept-language";
import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

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

const getLanguageInCookie = (request: NextRequestWithAuth) => {
    const cookie = request.cookies.get(LANGUAGE_COOKIE_NAME);
    if (!cookie) return null;

    if (!Object.values(Language).includes(cookie.value as Language)) return null;

    return cookie.value;
};

const getLanguageInPathname = (pathname: string) => {
    for (const language of LANGUAGES) if (pathname.startsWith(`/${language}`)) return language;
    return null;
};

const isLanguageInPathname = (pathname: string) => {
    return !!getLanguageInPathname(pathname) || pathname.startsWith("/_next");
};

const isUserAuthenticated = (request: NextRequestWithAuth) => {
    const authToken = request.nextauth.token;
    return !!authToken;
};

const userRoutes: Route[] = [Route.CHARACTERS, Route.CHARACTER];

export default withAuth(
    async function middleware(request: NextRequestWithAuth) {
        const path = request.nextUrl.pathname;
        if (excludedPaths.some((excludedPath) => path.includes(excludedPath))) return NextResponse.next();

        let language =
            getLanguageInPathname(path) ??
            getLanguageInCookie(request) ??
            acceptLanguage.get(request.headers.get("Accept-Language")) ??
            DEFAULT_LANGUAGE;

        if (!isLanguageInPathname(path)) return NextResponse.redirect(new URL(`/${language}${path}`, request.url));

        const currentRoute = pathnameToRoute(path || "/");
        if (userRoutes.includes(currentRoute) && !isUserAuthenticated(request))
            return NextResponse.redirect(new URL(`/${language}${Route.SPELLS}`, request.url));

        const response = NextResponse.next();
        response.cookies.set(LANGUAGE_COOKIE_NAME, language);

        return response;
    },
    {
        secret: env.NEXTAUTH_SECRET,
        callbacks: { authorized: () => true },
    },
);
