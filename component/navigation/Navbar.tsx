"use client";

import D20 from "@/asset/dice/D20.svg";
import NavbarItem from "@/component/navigation/NavbarItem";
import Settings from "@/component/navigation/Settings";
import { Button } from "@/component/ui/button";
import { useRoute } from "@/hook/useRoute";
import { useTranslation } from "@/hook/useTranslation";
import { cn } from "@/lib/util";
import { useUser } from "@/server/use/useUser";
import { Language } from "@/type/Language";
import { Route } from "@/type/Route";
import Link from "next/link";
import { ReactNode } from "react";
import { FaHatWizard } from "react-icons/fa6";
import { GiVisoredHelm } from "react-icons/gi";
import { LuSettings } from "react-icons/lu";

export interface Props {
    language: Language;
}

const Navbar = ({ language }: Props) => {
    const { t } = useTranslation(language);
    const { user, signIn } = useUser();
    const route = useRoute();

    const navbar = (children?: ReactNode) => (
        <header className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-t border-stone-300 bg-stone-100 py-2 dark:border-stone-700 dark:bg-stone-950 md:px-4 mouse:hidden">
            <nav className="relative grid h-full w-full grid-cols-4 place-items-center justify-around">
                <Link href={`/${language}${Route.SPELLS}`} className="relative h-full w-full">
                    <NavbarItem
                        selected={route === Route.SPELLS}
                        label={t.enum.route[Route.SPELLS]}
                        icon={<D20 className="h-6" />}
                    />
                </Link>

                {user.data ? (
                    <Link href={`/${language}${Route.CHARACTERS}`} className="relative h-full w-full">
                        <NavbarItem
                            selected={route === Route.CHARACTERS}
                            label={t.enum.route[Route.CHARACTERS]}
                            icon={<GiVisoredHelm className="h-6 w-6" />}
                        />
                    </Link>
                ) : (
                    <Button
                        variant="link"
                        aria-label="View Characters"
                        disabled={user.isLoading}
                        onClick={() => signIn(`/${language}${Route.CHARACTERS}`)}
                        className={cn("relative h-full w-full p-0", user.isLoading && "text-skeleton")}
                    >
                        <NavbarItem
                            label={t.enum.route[Route.CHARACTERS]}
                            icon={<GiVisoredHelm className="h-6 w-6" />}
                        />
                    </Button>
                )}

                {user.data ? (
                    <Link href={`/${language}${Route.MY_SPELLS}`} className="relative h-full w-full">
                        <NavbarItem
                            selected={route === Route.MY_SPELLS}
                            label={t.enum.route[Route.MY_SPELLS]}
                            icon={<FaHatWizard className="h-6 w-6" />}
                        />
                    </Link>
                ) : (
                    <Button
                        variant="link"
                        aria-label="View my spells"
                        disabled={user.isLoading}
                        onClick={() => signIn(`/${language}${Route.MY_SPELLS}`)}
                        className={cn("relative h-full w-full p-0", user.isLoading && "text-skeleton")}
                    >
                        <NavbarItem label={t.enum.route[Route.MY_SPELLS]} icon={<FaHatWizard className="h-6 w-6" />} />
                    </Button>
                )}

                {children}
            </nav>
        </header>
    );

    if (!user.data && user.isLoading)
        return navbar(
            <div className="flex h-full w-full">
                <NavbarItem label={t.settings.title} disabled icon={<LuSettings className="h-6 w-6" />} />
            </div>,
        );

    return navbar(<Settings language={language} />);
};

export default Navbar;
