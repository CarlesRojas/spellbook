import { PageProps } from "@/app/[language]/layout";
import Spell from "@/app/[language]/spell/[spellId]/page";
import Modal from "@/component/ui/modal";
import { Language } from "@/type/Language";

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
