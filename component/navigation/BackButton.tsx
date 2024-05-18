"use client";

import { Button } from "@/component/ui/button";
import { useTranslation } from "@/hook/useTranslation";
import { Language } from "@/type/Language";
import { useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";

interface Props {
    language: Language;
}

const BackButton = ({ language }: Props) => {
    const { t } = useTranslation(language);
    const { back } = useRouter();

    return (
        <Button variant="outline" onClick={back}>
            <LuArrowLeft className="mr-3 h-4 w-4 stroke-[3]" />
            {t.settings.back}
        </Button>
    );
};

export default BackButton;
