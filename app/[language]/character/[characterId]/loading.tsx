import { LuLoader2 } from "react-icons/lu";

const Loading = () => {
    return (
        <main className="relative flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center">
            <LuLoader2 className="h-8 w-8 animate-spin opacity-60" />
        </main>
    );
};

export default Loading;
