import { cn } from "@/lib/util";
import { ReactNode } from "react";

interface Props {
    label: string;
    icon: ReactNode;
    selected?: boolean;
}

const NavbarItem = ({ label, icon, selected = false }: Props) => {
    return (
        <div
            className={cn(
                "flex h-full w-full flex-col items-center justify-center gap-1 opacity-80",
                selected && "!text-orange-500 opacity-100",
            )}
        >
            {icon}

            <small className={cn("text-xs font-semibold tracking-wide")}>{label}</small>
        </div>
    );
};

export default NavbarItem;
