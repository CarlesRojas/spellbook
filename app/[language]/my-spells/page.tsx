import { PageProps } from "@/app/[language]/layout";
import NotFound from "@/component/navigation/NotFound";
import { getServerUser } from "@/server/use/useServerUser";
import { NotFoundType } from "@/type/NotFoundType";
import { Route } from "@/type/Route";
import { RedirectType, redirect } from "next/navigation";

const MySpells = async ({ params: { language } }: PageProps) => {
    const user = await getServerUser();
    if (!user) return <NotFound type={NotFoundType.USER} language={language} />;

    redirect(`/${language}${Route.MY_SPELLS}/${user.id}`, RedirectType.replace);
};

export default MySpells;
