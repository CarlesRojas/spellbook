"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/component/ui/dropdown-menu";
import { useTranslation } from "@/hook/useTranslation";
import { Language } from "@/type/Language";
import { School } from "@/type/Spell";
import { LuChevronDown } from "react-icons/lu";
import { Button } from "../ui/button";

interface Props {
    language: Language;
    school: School | null;
    schoolsAvailable?: School[];
    setSchool: (school: School | null) => void;
    isLoading?: boolean;
}

const SchoolFilter = ({
    language,
    school,
    schoolsAvailable = Object.values(School),
    setSchool,
    isLoading = false,
}: Props) => {
    const { t } = useTranslation(language);

    return (
        <div className="relative flex w-fit flex-row">
            <DropdownMenu modal={true}>
                <DropdownMenuTrigger className="group" asChild>
                    <Button variant="outline" type="button" className="min-w-fit" disabled={isLoading}>
                        <span className="mr-2 hidden font-medium opacity-60 md:block">{t.filter.title.school}:</span>

                        {school ? t.enum.school[school] : t.filter.all}

                        <LuChevronDown className="ml-2 opacity-60" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={() => setSchool(null)}
                        className={`font-semibold ${school === null ? "!text-sky-500" : ""}`}
                    >
                        <p>{t.filter.all}</p>
                    </DropdownMenuItem>

                    {schoolsAvailable.map((currentSchool) => (
                        <DropdownMenuItem
                            key={currentSchool}
                            onClick={() => setSchool(currentSchool)}
                            className={`font-semibold ${school === currentSchool ? "!text-sky-500" : ""}`}
                        >
                            <p>{t.enum.school[currentSchool]}</p>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default SchoolFilter;
