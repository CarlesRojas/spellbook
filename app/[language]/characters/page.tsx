import { PageProps } from "@/app/[language]/layout";
import CharacterList from "@/component/character/CharacterList";
import NotFound from "@/component/navigation/NotFound";
import { getServerUser } from "@/server/use/useServerUser";
import { NotFoundType } from "@/type/NotFoundType";

const Characters = async ({ params: { language } }: PageProps) => {
    const user = await getServerUser();
    if (!user) return <NotFound type={NotFoundType.USER} language={language} />;

    return (
        <main className="relative flex h-full w-full flex-col items-center">
            <div className="relative flex h-fit min-h-full w-full justify-center">
                <CharacterList language={language} user={user} />
            </div>
        </main>
    );
};

export default Characters;
