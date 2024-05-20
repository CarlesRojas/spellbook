"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/component/ui/dropdown-menu";
import { useTranslation } from "@/hook/useTranslation";
import { Language } from "@/type/Language";
import { Sort } from "@/type/Spell";
import { LuChevronDown } from "react-icons/lu";
import { Button } from "../ui/button";

interface Props {
    language: Language;
    sort: Sort;
    setSort: (sort: Sort) => void;
    isLoading?: boolean;
}

const SortFilter = ({ language, sort, setSort, isLoading = false }: Props) => {
    const { t } = useTranslation(language);

    return (
        <div className="relative flex w-fit flex-row">
            <DropdownMenu modal={true}>
                <DropdownMenuTrigger className="group" asChild>
                    <Button variant="outline" type="button" className="min-w-fit rounded-r-none" disabled={isLoading}>
                        <span className="mr-2 font-medium opacity-60">{t.filter.title.sort}</span>

                        {t.enum.sort[sort]}

                        <LuChevronDown className="ml-2 opacity-60" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    {Object.values(Sort).map((sortFilter) => (
                        <DropdownMenuItem
                            key={sortFilter}
                            onClick={() => setSort(sortFilter)}
                            disabled={isLoading}
                            className={`font-semibold ${sortFilter === sort ? "!text-orange-500" : ""}`}
                        >
                            <p>{t.enum.sort[sortFilter]}</p>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default SortFilter;
