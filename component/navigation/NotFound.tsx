import { useTranslation } from "@/hook/useTranslation";
import { Language } from "@/type/Language";
import { NotFoundType } from "@/type/NotFoundType";
import { ReactNode } from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { LuUser2 } from "react-icons/lu";
import BackButton from "./BackButton";

interface Props {
    type: NotFoundType;
    language: Language;
}

const NotFound = ({ type, language }: Props) => {
    const { t } = useTranslation(language);

    const icon: Record<NotFoundType, ReactNode> = {
        [NotFoundType.SPELL]: <AiOutlineThunderbolt className="h-12 w-12" />,
        [NotFoundType.USER]: <LuUser2 className="h-12 w-12" />,
    };

    return (
        <div className="relative h-screen w-full justify-center">
            <div className="relative m-auto mb-32 flex h-full w-full max-w-screen-lg flex-col items-center justify-center gap-2 p-3">
                {icon[type]}
                <p className="mb-4 text-lg font-medium tracking-wide">{t.enum.notFound[type]}</p>

                <BackButton language={language} />
            </div>
        </div>
    );
};

export default NotFound;
