import { cn } from "@/lib/util";
import { ReactNode } from "react";

interface Props {
    label: string;
    icon: ReactNode;
    selected?: boolean;
    disabled?: boolean;
}

const NavbarItem = ({ label, icon, selected = false, disabled = false }: Props) => {
    return (
        <div
            className={cn(
                "flex h-full w-full flex-col items-center justify-center gap-1 opacity-70",
                selected && "!text-sky-500 opacity-100",
                disabled && "text-skeleton",
            )}
        >
            {icon}

            <small className={cn("text-[0.7rem] font-semibold tracking-wide opacity-80", selected && "opacity-100")}>
                {label}
            </small>
        </div>
    );
};

export default NavbarItem;
