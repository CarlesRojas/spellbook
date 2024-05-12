import { PageProps } from "@/app/[language]/layout";
import NotFound from "@/component/navigation/NotFound";
import { getUserById } from "@/server/repo/user";
import { Language } from "@/type/Language";
import { NotFoundType } from "@/type/NotFoundType";

interface Props extends PageProps {
    params: { language: Language; userId: string };
}

const Spellbooks = async ({ params: { language, userId } }: Props) => {
    const user = await getUserById(parseInt(userId));
    if (!user) return <NotFound type={NotFoundType.USER} language={language} />;

    return (
        <main className="relative flex h-full w-full flex-col items-center">
            <div className="relative flex h-fit min-h-full w-full justify-center">Spellbooks</div>
        </main>
    );
};

export default Spellbooks;
