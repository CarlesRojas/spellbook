"use client";

import { Button } from "@/component/ui/button";
import { useRoute } from "@/hook/useRoute";
import { useTranslation } from "@/hook/useTranslation";
import { useUser } from "@/server/use/useUser";
import { Language } from "@/type/Language";
import { Route } from "@/type/Route";
import Link from "next/link";
import { ReactNode } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export interface Props {
    language: Language;
}

const Links = ({ language }: Props) => {
    const { t } = useTranslation(language);
    const route = useRoute();
    const { user, signIn } = useUser();

    const signInButton = (children: ReactNode) => (
        <Button variant="link" onClick={() => signIn()}>
            {children}
        </Button>
    );

    const signInDropdownButton = (children: ReactNode) => (
        <DropdownMenuItem className="font-semibold" onClick={() => signIn()}>
            {children}
        </DropdownMenuItem>
    );

    return (
        <>
            <div className="relative hidden items-center md:flex">
                <Button asChild variant="link" className={route === Route.SPELLS ? "!text-orange-500" : ""}>
                    <Link href={`/${language}${Route.SPELLS}`}>{t.enum.route[Route.SPELLS]}</Link>
                </Button>

                {user.data ? (
                    <Button asChild variant="link" className={route === Route.SPELLBOOKS ? "!text-orange-500" : ""}>
                        <Link href={`/${language}${Route.SPELLBOOKS}/${user.data.id}`}>
                            {t.enum.route[Route.SPELLBOOKS]}
                        </Link>
                    </Button>
                ) : (
                    signInButton(t.enum.route[Route.SPELLBOOKS])
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
                            <LuMenu className="mouse:group-hover:text-orange-500" />
                        </Button>

                        <Button
                            asChild
                            variant="link"
                            aria-label="Close menu"
                            className="hidden h-12 w-12 items-center justify-center rounded-full p-3 group-data-[state=open]:flex"
                        >
                            <LuX className="mouse:group-hover:text-orange-500" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="my-3 md:hidden">
                        <Link href={`/${language}${Route.SPELLS}`}>
                            <DropdownMenuItem
                                className={`font-semibold ${route === Route.SPELLS ? "!text-orange-500" : ""}`}
                            >
                                {t.enum.route[Route.SPELLS]}
                            </DropdownMenuItem>
                        </Link>

                        {user.data ? (
                            <Link href={`/${language}${Route.SPELLBOOKS}/${user.data.id}`}>
                                <DropdownMenuItem
                                    className={`font-semibold ${route === Route.SPELLBOOKS ? "!text-orange-500" : ""}`}
                                >
                                    {t.enum.route[Route.SPELLBOOKS]}
                                </DropdownMenuItem>
                            </Link>
                        ) : (
                            signInDropdownButton(t.enum.route[Route.SPELLBOOKS])
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
};

export default Links;
