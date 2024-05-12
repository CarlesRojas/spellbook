import { PageProps } from "@/app/[language]/layout";
import Spell from "@/app/[language]/spell/[spellId]/page";
import { Language } from "@/type/Language";
import Modal from "./modal";

interface Props extends PageProps {
    params: { language: Language; spellId: string };
}

const SpellModal = (props: Props) => {
    return (
        <Modal>
            <Spell {...props} />
        </Modal>
    );
};

export default SpellModal;
