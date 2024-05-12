"use client";

import { Dialog, DialogContent } from "@/component/ui/dialog";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const Modal = ({ children }: Props) => {
    const router = useRouter();

    return (
        <Dialog open={true} onOpenChange={(open) => !open && router.back()}>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
};

export default Modal;
