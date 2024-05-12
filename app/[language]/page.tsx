import { PageProps } from "@/app/[language]/layout";

const Spells = ({ params: { language } }: PageProps) => {
    return (
        <main className="relative flex h-full w-full flex-col items-center">
            <div className="relative flex h-fit min-h-full w-full justify-center overflow-y-auto">Spells</div>
        </main>
    );
};

export default Spells;
