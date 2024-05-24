import Header from "@/component/navigation/Header";
import Navbar from "@/component/navigation/Navbar";
import { QueryProvider } from "@/component/provider/QueryProvider";
import AuthProvider from "@/component/provider/SessionProvider";
import ThemeProvider from "@/component/provider/ThemeProvider";
import { getTranslation } from "@/hook/useTranslation";
import { Language, LANGUAGES } from "@/type/Language";
import { type Metadata, type Viewport } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { ReactNode } from "react";
import "../globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export interface PageProps {
    params: { language: Language };
}

export interface Props extends PageProps {
    children: ReactNode;
    modal: ReactNode;
}

export async function generateStaticParams() {
    return LANGUAGES.map((language) => ({ language }));
}

export async function generateMetadata({ params: { language } }: PageProps): Promise<Metadata> {
    const t = getTranslation(language);
    return {
        title: t.title,
        description: t.description,
        manifest: "/manifest.json",
    };
}

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#f5f5f4" },
        { media: "(prefers-color-scheme: dark)", color: "#1c1917" },
    ],
};

const RootLayout = ({ children, modal, params: { language } }: Props) => {
    return (
        <html lang={language} suppressHydrationWarning>
            <head>
                <Script src="https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js" />
            </head>

            <QueryProvider>
                <AuthProvider>
                    <body
                        className={`${montserrat.className} bg-stone-100 text-stone-950 dark:bg-stone-950 dark:text-stone-100`}
                    >
                        <ThemeProvider>
                            <Header language={language} />

                            <div className="relative w-full pb-16 md:pt-16 mouse:pt-16">{children}</div>

                            <Navbar language={language} />

                            {modal}
                        </ThemeProvider>
                    </body>
                </AuthProvider>
            </QueryProvider>
        </html>
    );
};

export default RootLayout;
