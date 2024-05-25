"use client";

import { useTranslation } from "@/hook/useTranslation";
import { cn } from "@/lib/util";
import { Language } from "@/type/Language";
import debounce from "just-debounce-it";
import { useMemo, useState } from "react";
import { LuX } from "react-icons/lu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Props {
    language: Language;
    query: string;
    setQuery: (query: string) => void;
    isLoading?: boolean;
    className?: string;
}

const QueryFilter = ({ language, className, query, setQuery, isLoading = false }: Props) => {
    const { t } = useTranslation(language);

    const [internalQuery, setInternalQuery] = useState(query);
    const setQueryDebounced = useMemo(() => debounce(setQuery, 300), [setQuery]);

    return (
        <form
            className={cn("relative flex w-full md:max-w-96 md:place-self-end", className)}
            onSubmit={(event) => event.preventDefault()}
        >
            <Input
                placeholder={t.filter.title.query}
                autoComplete="off"
                disabled={isLoading}
                value={internalQuery}
                onChange={(event) => {
                    setInternalQuery(event.target.value);
                    setQueryDebounced(event.target.value);
                }}
            />

            {!!query && (
                <Button
                    size="icon"
                    variant="ghost"
                    type="button"
                    disabled={isLoading}
                    aria-label="Clear Search"
                    onClick={() => {
                        setInternalQuery("");
                        setQuery("");
                    }}
                    className="absolute right-0 top-0 z-20"
                >
                    <LuX className="h-4 w-4 stroke-[3]" />
                </Button>
            )}
        </form>
    );
};

export default QueryFilter;
