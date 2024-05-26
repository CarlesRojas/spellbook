import LoadingLogo from "@/component/LoadingLogo";

const Loading = () => {
    return (
        <main className="relative flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center">
            <LoadingLogo />
        </main>
    );
};

export default Loading;
