"use client";

import { Button } from "@/component/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/component/ui/dropdown-menu";
import { useTranslation } from "@/hook/useTranslation";
import { Language } from "@/type/Language";
import { LuMoreHorizontal, LuPencil, LuTrash2 } from "react-icons/lu";

export interface Props {
    language: Language;
}

const CharacterDropdownMenu = ({ language }: Props) => {
    const { t } = useTranslation(language);

    return (
        <DropdownMenu modal={true}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <LuMoreHorizontal className="h-4 w-4 stroke-[3]" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mx-2 my-3">
                <DropdownMenuItem onClick={() => console.log("Edit")}>
                    <LuPencil className="mr-2 h-5 w-5" />
                    <p className="font-medium tracking-wide">{"Edit"}</p>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => console.log("Delete")}>
                    <LuTrash2 className="mr-2 h-5 w-5 text-red-500" />
                    <p className="font-medium tracking-wide text-red-500">{"Delete"}</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default CharacterDropdownMenu;
