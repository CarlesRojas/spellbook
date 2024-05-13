import { PageProps } from "@/app/[language]/layout";
import Spell from "@/component/Spell";
import Modal from "@/component/ui/modal";
import { Language } from "@/type/Language";

interface Props extends PageProps {
    params: { language: Language; spellId: string };
}

const SpellModal = ({ params: { spellId } }: Props) => {
    return (
        <Modal>
            <Spell spellId={spellId} />
        </Modal>
    );
};

export default SpellModal;
