import { Language } from "@/type/Language";
import { Route, dynamicRoutes } from "@/type/Route";
import { usePathname } from "next/navigation";

export const pathnameToRoute = (pathname: string): Route => {
    const parsedPathname = getPathnameWithoutLanguage(pathname);

    const exactMatch = Object.values(Route).find((route) => route === parsedPathname) as Route;
    if (exactMatch) return exactMatch;

    return dynamicRoutes.find((route) => parsedPathname.startsWith(route)) as Route;
};

export const useRoute = () => {
    return pathnameToRoute(usePathname());
};

export const usePathnameWithoutLanguage = () => {
    return getPathnameWithoutLanguage(usePathname());
};

const getPathnameWithoutLanguage = (pathname: string): string => {
    const languages = Object.values(Language);
    let parsedPathname = pathname;

    for (const language of languages) {
        if (pathname.startsWith(`/${language}`)) {
            parsedPathname = pathname.replace(`/${language}`, "");
            break;
        }
    }

    return parsedPathname || "/";
};
