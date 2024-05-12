"use client";

import { useTranslation } from "@/hook/useTranslation";
import { Language } from "@/type/Language";
import { useState } from "react";
import { LuLoader2, LuSearch, LuX } from "react-icons/lu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Props {
    language: Language;
    query: string;
    setQuery: (query: string) => void;
    isLoading?: boolean;
}

const Query = ({ language, query, setQuery, isLoading = false }: Props) => {
    const { t } = useTranslation(language);

    const [internalQuery, setInternalQuery] = useState(query);

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        setQuery(internalQuery);
    };

    return (
        <form className="flex w-full md:max-w-96 md:place-self-end" onSubmit={submit}>
            <div className="relative w-full">
                <Input
                    placeholder={t.filter.query}
                    autoComplete="off"
                    className="rounded-r-none"
                    disabled={isLoading}
                    value={internalQuery}
                    onChange={(event) => setInternalQuery(event.target.value)}
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
                        className="absolute right-0 top-0"
                    >
                        <LuX className="h-4 w-4 stroke-[3]" />
                    </Button>
                )}
            </div>

            <Button
                size="icon"
                type="submit"
                className="rounded-l-none border-l-0"
                disabled={isLoading}
                aria-label="Search"
            >
                {isLoading ? (
                    <LuLoader2 className="h-4 w-4 animate-spin stroke-[3]" />
                ) : (
                    <LuSearch className="h-4 w-4 stroke-[3]" />
                )}
            </Button>
        </form>
    );
};

export default Query;
