"use client";

import { Button } from "@/component/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/component/ui/dropdown-menu";
import { useRoute } from "@/hook/useRoute";
import { useTranslation } from "@/hook/useTranslation";
import { cn } from "@/lib/util";
import { useUser } from "@/server/use/useUser";
import { Language } from "@/type/Language";
import { Route } from "@/type/Route";
import Link from "next/link";
import { ReactNode } from "react";
import { LuMenu, LuX } from "react-icons/lu";

export interface Props {
    language: Language;
}

const Links = ({ language }: Props) => {
    const { t } = useTranslation(language);
    const route = useRoute();
    const { user, signIn } = useUser();

    const signInButton = (children: ReactNode, route: string) => (
        <Button
            disabled={user.isLoading}
            className={cn(user.isLoading && "text-skeleton")}
            variant="link"
            onClick={() => signIn(route)}
        >
            {children}
        </Button>
    );

    const signInDropdownButton = (children: ReactNode, route: string) => (
        <DropdownMenuItem disabled={user.isLoading} className="font-semibold" onClick={() => signIn(route)}>
            {children}
        </DropdownMenuItem>
    );

    return (
        <>
            <div className="relative hidden items-center md:flex">
                <Button asChild variant="link" className={route === Route.SPELLS ? "!text-sky-500" : ""}>
                    <Link href={`/${language}${Route.SPELLS}`}>{t.enum.route[Route.SPELLS]}</Link>
                </Button>

                {user.data ? (
                    <Button asChild variant="link" className={route === Route.CHARACTERS ? "!text-sky-500" : ""}>
                        <Link href={`/${language}${Route.CHARACTERS}/${user.data.id}`}>
                            {t.enum.route[Route.CHARACTERS]}
                        </Link>
                    </Button>
                ) : (
                    signInButton(t.enum.route[Route.CHARACTERS], `/${language}${Route.CHARACTERS}`)
                )}
            </div>

            <div className="flex md:hidden">
                <DropdownMenu modal={true}>
                    <DropdownMenuTrigger className="rounded-ful focus-shadow group">
                        <Button
                            asChild
                            variant="link"
                            aria-label="Open menu"
                            className="flex h-12 w-12 items-center justify-center rounded-full p-3 group-data-[state=open]:hidden"
                        >
                            <LuMenu className="mouse:group-hover:text-sky-500" />
                        </Button>

                        <Button
                            asChild
                            variant="link"
                            aria-label="Close menu"
                            className="hidden h-12 w-12 items-center justify-center rounded-full p-3 group-data-[state=open]:flex"
                        >
                            <LuX className="mouse:group-hover:text-sky-500" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="my-3 md:hidden">
                        <Link href={`/${language}${Route.SPELLS}`}>
                            <DropdownMenuItem
                                className={`font-semibold ${route === Route.SPELLS ? "!text-sky-500" : ""}`}
                            >
                                {t.enum.route[Route.SPELLS]}
                            </DropdownMenuItem>
                        </Link>

                        {user.data ? (
                            <Link href={`/${language}${Route.CHARACTERS}/${user.data.id}`}>
                                <DropdownMenuItem
                                    className={`font-semibold ${route === Route.CHARACTERS ? "!text-sky-500" : ""}`}
                                >
                                    {t.enum.route[Route.CHARACTERS]}
                                </DropdownMenuItem>
                            </Link>
                        ) : (
                            signInDropdownButton(t.enum.route[Route.CHARACTERS], `/${language}${Route.CHARACTERS}`)
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
};

export default Links;
