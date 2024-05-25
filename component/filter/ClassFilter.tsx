"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/component/ui/dropdown-menu";
import { useTranslation } from "@/hook/useTranslation";
import { Language } from "@/type/Language";
import { ClassType } from "@/type/Spell";
import { LuChevronDown } from "react-icons/lu";
import { Button } from "../ui/button";

interface Props {
    language: Language;
    classType: ClassType | null;
    setClass: (newState: ClassType | null, scroll?: boolean) => void;
    isLoading?: boolean;
}

const ClassFilter = ({ language, classType, setClass, isLoading }: Props) => {
    const { t } = useTranslation(language);

    return (
        <div className="relative flex w-fit flex-row">
            <DropdownMenu modal={true}>
                <DropdownMenuTrigger className="group" asChild>
                    <Button variant="outline" type="button" className="min-w-fit" disabled={isLoading}>
                        <span className="mr-2 hidden font-medium opacity-60 md:block">{t.filter.title.class}:</span>

                        {classType ? t.enum.class[classType] : t.filter.all}

                        <LuChevronDown className="ml-2 opacity-60" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={() => setClass(null)}
                        className={`font-semibold ${classType === null ? "!text-sky-500" : ""}`}
                    >
                        <p>{t.filter.all}</p>
                    </DropdownMenuItem>

                    {Object.values(ClassType).map((currentClass) => (
                        <DropdownMenuItem
                            key={currentClass}
                            onClick={() => setClass(currentClass)}
                            className={`font-semibold ${classType === currentClass ? "!text-sky-500" : ""}`}
                        >
                            <p>{t.enum.class[currentClass]}</p>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ClassFilter;
