"use client";

import NavbarItem from "@/component/navigation/NavbarItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/component/ui/avatar";
import { Button } from "@/component/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/component/ui/dropdown-menu";
import { useIsMounted } from "@/hook/useIsMounted";
import { usePathnameWithoutLanguage } from "@/hook/useRoute";
import { useTranslation } from "@/hook/useTranslation";
import { useUser } from "@/server/use/useUser";
import { Language } from "@/type/Language";
import { useTheme } from "next-themes";
import Link from "next/link";
import { LuLanguages, LuLoader2, LuLogIn, LuLogOut, LuMoon, LuSettings, LuSun, LuUser } from "react-icons/lu";

export interface Props {
    language: Language;
}

const Settings = ({ language }: Props) => {
    const { setTheme, resolvedTheme } = useTheme();
    const isMounted = useIsMounted();
    const { t } = useTranslation(language);
    const { user, signOut, signIn } = useUser();
    const pathnameWithoutLanguage = usePathnameWithoutLanguage();

    return (
        <DropdownMenu modal={true}>
            <DropdownMenuTrigger className="focus-shadow rounded-full">
                <div className="group hidden rounded-full md:flex mouse:flex">
                    {user.data ? (
                        <Button
                            asChild
                            variant="link"
                            aria-label="Open Settings"
                            className="flex h-12 w-12 items-center justify-center rounded-full p-0"
                        >
                            <Avatar className="border border-stone-300 dark:border-stone-700 mouse:transition-transform mouse:group-hover:scale-105">
                                <AvatarImage
                                    alt="User Image"
                                    src={user.data.image ?? undefined}
                                    referrerPolicy="no-referrer"
                                />
                                <AvatarFallback className="bg-transparent p-3">
                                    {user.data.name ? (
                                        <p className="pt-[2px] text-lg">{user.data.name[0]}</p>
                                    ) : (
                                        <LuUser className="h-full w-full" />
                                    )}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    ) : (
                        <Button
                            asChild
                            variant="link"
                            aria-label="Open Settings"
                            className="flex h-12 w-12 items-center justify-center rounded-full p-3"
                        >
                            <LuSettings className="mouse:group-hover:text-amber-600" />
                        </Button>
                    )}
                </div>

                <div className="group flex h-12 max-h-12 w-full md:hidden mouse:hidden">
                    <Button asChild variant="link" aria-label="Open Settings" className="relative h-full w-full p-0">
                        <NavbarItem
                            label={t.settings.title}
                            icon={<LuSettings className="h-6 w-6 mouse:group-hover:text-amber-600" />}
                        />
                    </Button>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mx-2 my-3">
                <DropdownMenuLabel>
                    {user.data?.name
                        ? `${t.settings.hi} ${user.data.name.split(" ").slice(0, 2).join(" ")}!`
                        : `${t.settings.hi}!`}
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <LuLanguages className="mr-3 h-4 w-4" />
                        <p className="mr-3">{t.settings.language}</p>
                    </DropdownMenuSubTrigger>

                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            {Object.values(Language).map((currentLanguage) => (
                                <Link href={`/${currentLanguage}${pathnameWithoutLanguage}`} key={currentLanguage}>
                                    <DropdownMenuItem
                                        className={`font-semibold ${currentLanguage === language ? "!text-amber-600" : ""}`}
                                    >
                                        {t.enum.language[currentLanguage]}
                                    </DropdownMenuItem>
                                </Link>
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuItem
                    disabled={!isMounted}
                    onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                >
                    {!isMounted && <LuLoader2 className="mr-3 h-4 w-4 animate-spin" />}
                    {resolvedTheme === "dark" && <LuSun className="mr-3 h-4 w-4" />}
                    {resolvedTheme !== "dark" && <LuMoon className="mr-3 h-4 w-4" />}

                    <p>
                        {!isMounted && t.settings.theme.loading}
                        {isMounted && resolvedTheme === "dark"
                            ? t.settings.theme.switchToLight
                            : t.settings.theme.switchToDark}
                    </p>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {user.data ? (
                    <DropdownMenuItem onClick={() => signOut()}>
                        <LuLogOut className="mr-3 h-4 w-4" />
                        <p>{t.auth.signOut}</p>
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem onClick={() => signIn()}>
                        <LuLogIn className="mr-3 h-4 w-4" />
                        <p>{t.auth.signIn}</p>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Settings;
