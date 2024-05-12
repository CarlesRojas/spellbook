"use client";

import { useTranslation } from "@/hook/useTranslation";
import { Language } from "@/type/Language";
import { NotFoundType } from "@/type/NotFoundType";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { LuArrowLeft, LuUser2 } from "react-icons/lu";
import { Button } from "../ui/button";

interface Props {
    type: NotFoundType;
    language: Language;
}

const NotFound = ({ type, language }: Props) => {
    const { back } = useRouter();
    const { t } = useTranslation(language);

    const icon: Record<NotFoundType, ReactNode> = {
        [NotFoundType.SPELL]: <AiOutlineThunderbolt className="h-12 w-12" />,
        [NotFoundType.USER]: <LuUser2 className="h-12 w-12" />,
    };

    return (
        <div className="relative h-screen w-full justify-center overflow-y-auto overflow-x-hidden">
            <div className="relative m-auto mb-32 flex h-full w-full max-w-screen-lg flex-col items-center justify-center gap-2 p-3">
                {icon[type]}
                <p className="text-lg font-medium tracking-wide">{t.enum.notFound[type]}</p>

                <Button onClick={back} variant="outline" className="mt-4">
                    <LuArrowLeft className="mr-3 h-4 w-4 stroke-[3]" />
                    {t.settings.back}
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
