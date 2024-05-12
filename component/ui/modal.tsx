"use client";

import { Dialog, DialogContent } from "@/component/ui/dialog";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
    children: ReactNode;
}

const Modal = ({ children }: Props) => {
    const router = useRouter();

    return createPortal(
        <Dialog open={true} onOpenChange={(open) => !open && router.back()}>
            <DialogContent>{children}</DialogContent>
        </Dialog>,
        document.getElementById("modal-root")!,
    );
};

export default Modal;
