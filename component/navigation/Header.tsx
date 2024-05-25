"use client";

import D20 from "@/asset/dice/D20.svg";
import Links from "@/component/navigation/Links";
import Settings from "@/component/navigation/Settings";
import { Button } from "@/component/ui/button";
import { useTranslation } from "@/hook/useTranslation";
import { useUser } from "@/server/use/useUser";
import { Language } from "@/type/Language";
import { Route } from "@/type/Route";
import { Philosopher } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { LuLogIn, LuSettings } from "react-icons/lu";

const philosopher = Philosopher({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export interface Props {
    language: Language;
}

const Header = ({ language }: Props) => {
    const pathname = usePathname();
    const { t } = useTranslation(language);
    const { user, signIn } = useUser();

    const header = (children?: ReactNode) => (
        <header className="fixed left-0 right-0 top-0 z-50 hidden h-16 items-center justify-between border-b border-stone-300 bg-stone-100 px-3 py-2 dark:border-stone-700 dark:bg-stone-950 md:px-4 mouse:flex">
            <nav className="relative flex items-center gap-3 md:gap-4">
                <Link
                    href={`/${language}${Route.SPELLS}`}
                    className="focus-shadow group relative flex gap-3 rounded pr-1"
                >
                    <D20 className="h-8 w-auto text-sky-500 opacity-90 md:h-9 mouse:transition-transform mouse:group-hover:rotate-180" />

                    <h2
                        className={`${philosopher.className} pt-[2px] text-xl font-bold md:text-2xl mouse:transition-transform mouse:group-hover:-translate-x-1`}
                    >
                        {t.title.toUpperCase()}
                    </h2>
                </Link>

                <Links language={language} />
            </nav>

            {children && <div>{children}</div>}
        </header>
    );

    if (!user.data && user.isLoading)
        return header(
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full p-2">
                <LuSettings className="text-skeleton h-6 w-6" />
            </div>,
        );

    return header(
        <div className="flex items-center gap-4">
            {!user.data && (
                <Button onClick={() => signIn(pathname)} className="hidden md:flex">
                    <LuLogIn className="mr-3 h-4 w-4" />
                    {t.auth.signIn}
                </Button>
            )}

            <Settings language={language} />
        </div>,
    );
};

export default Header;
