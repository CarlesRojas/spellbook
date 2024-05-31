"use client";

import { Switch } from "@/component/ui/switch";
import { useTranslation } from "@/hook/useTranslation";
import { cn } from "@/lib/util";
import { Language } from "@/type/Language";

interface Props {
    language: Language;
    showUncastable: boolean;
    setShowUncastable: (showUncastable: boolean) => void;
    isLoading?: boolean;
    className?: string;
}

const ShowUncastableFilter = ({ language, className, showUncastable, setShowUncastable, isLoading = false }: Props) => {
    const { t } = useTranslation(language);

    return (
        <form
            className={cn("relative flex h-10 w-fit max-w-[40vw] items-center gap-3", className)}
            onSubmit={(event) => event.preventDefault()}
        >
            <label className="w-fit text-right text-sm font-medium opacity-75">{t.filter.title.showUncastable}</label>
            <Switch checked={showUncastable} onCheckedChange={setShowUncastable} />
        </form>
    );
};

export default ShowUncastableFilter;
