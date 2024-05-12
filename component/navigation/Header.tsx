"use client";

import D20 from "@/asset/D20.svg";
import { Button } from "@/component/ui/button";
import { useTranslation } from "@/hook/useTranslation";
import { useUser } from "@/server/use/useUser";
import { Language } from "@/type/Language";
import { Route } from "@/type/Route";
import { Philosopher } from "next/font/google";
import Link from "next/link";
import { ReactNode } from "react";
import { LuLoader2, LuLogIn } from "react-icons/lu";

const philosopher = Philosopher({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export interface Props {
    language: Language;
}

const Header = ({ language }: Props) => {
    const { t } = useTranslation(language);
    const { user, signIn } = useUser();

    const header = (children?: ReactNode) => (
        <header className="fixed left-0 right-0 top-0 z-50 hidden h-16 items-center justify-between border-b border-stone-300 bg-stone-100 px-3 py-2 dark:border-stone-700 dark:bg-stone-900 md:flex md:px-4 mouse:flex">
            <nav className="relative flex items-center gap-3 md:gap-4">
                <Link href={`/${language}${Route.HOME}`} className="focus-ring group relative flex gap-3 rounded">
                    <D20 className="h-8 w-auto opacity-90 md:h-9 mouse:transition-transform mouse:group-hover:rotate-180" />

                    <h2
                        className={`${philosopher.className} pt-[2px] text-xl font-bold md:text-2xl mouse:transition-transform mouse:group-hover:-translate-x-1`}
                    >
                        {t.title.toUpperCase()}
                    </h2>
                </Link>

                {/* <Links language={language} /> */}
            </nav>

            {children && <div>{children}</div>}
        </header>
    );

    if (!user.data && user.isLoading) return header(<LuLoader2 className="h-4 w-4 stroke-[3]" />);

    return header(
        <div className="flex items-center gap-4">
            {!user.data && (
                <Button onClick={() => signIn()} className="hidden md:flex">
                    <LuLogIn className="mr-3 h-4 w-4" />
                    {t.auth.signIn}
                </Button>
            )}

            {/* <UserDropdownMenu language={language} /> */}
        </div>,
    );
};

export default Header;
