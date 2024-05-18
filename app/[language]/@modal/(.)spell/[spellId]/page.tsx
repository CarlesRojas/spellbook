import { PageProps } from "@/app/[language]/layout";
import SpellPage from "@/app/[language]/spell/[spellId]/page";
import Modal from "@/component/ui/modal";
import { Language } from "@/type/Language";

interface Props extends PageProps {
    params: { language: Language; spellId: string };
}

const SpellModal = ({ params: { spellId, language } }: Props) => {
    return (
        <Modal>
            <SpellPage params={{ spellId, language }} />
        </Modal>
    );
};

export default SpellModal;
