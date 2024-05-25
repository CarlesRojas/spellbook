import { Button } from "@/component/ui/button";
import { cn } from "@/lib/util";
import { useEffect, useState } from "react";
import { LuArrowUp } from "react-icons/lu";

const ScrollToTop = () => {
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollTop(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const onTop = scrollTop <= 50;

    return (
        <Button
            variant="outline"
            className={cn(
                "fixed bottom-20 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full p-3 transition-all mouse:bottom-8 mouse:right-8",
                onTop && "pointer-events-none select-none opacity-0 disabled:opacity-0",
            )}
            // disabled={onTop}
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
            <LuArrowUp className="h-5 w-5 stroke-[3]" />
        </Button>
    );
};

export default ScrollToTop;
