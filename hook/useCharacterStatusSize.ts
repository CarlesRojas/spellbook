import debounce from "just-debounce-it";
import { useEffect, useMemo, useState } from "react";

export const useCharacterStatusSize = () => {
    const [height, setHeight] = useState(0);
    const setHeightDebounced = useMemo(() => debounce(setHeight, 300), [setHeight]);

    useEffect(() => {
        const handleResize = () => {
            const element = document.getElementById("statusBar");
            const header = document.getElementById("header");
            if (!element) return;

            setHeightDebounced(element.offsetHeight + (header ? header.offsetHeight : 0));
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [setHeightDebounced]);

    return height;
};
