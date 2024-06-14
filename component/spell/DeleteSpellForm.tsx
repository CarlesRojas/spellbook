import { Button } from "@/component/ui/button";
import { DialogClose, DialogFooter } from "@/component/ui/dialog";
import { Form } from "@/component/ui/form";
import { useTranslation } from "@/hook/useTranslation";
import { useDeleteSpell } from "@/server/use/useDeleteSpell";
import { Language } from "@/type/Language";
import { Spell } from "@/type/Spell";
import { User } from "@/type/User";
import { useForm } from "react-hook-form";
import { LuLoader2, LuTrash2 } from "react-icons/lu";

interface Props {
    spell: Spell;
    language: Language;
    user: User;
    onClose?: () => void;
}

const DeleteSpellForm = ({ spell, user, language, onClose }: Props) => {
    const { t } = useTranslation(language);
    const deleteSpell = useDeleteSpell(user.id);

    const form = useForm();

    const onSubmit = () => {
        deleteSpell.mutate(spell.index);
        onClose?.();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="h-fit max-h-[75vh] space-y-6 overflow-auto px-1 pb-1">
                    <p>{t.dnd.newSpell.deleteDisclaimer}</p>
                </div>

                <DialogFooter className="flex w-full flex-row justify-end gap-2 pt-4">
                    <DialogClose asChild>
                        <Button disabled={deleteSpell.isPending || deleteSpell.isSuccess} variant="outline">
                            {t.form.cancel}
                        </Button>
                    </DialogClose>

                    <Button
                        variant="destructive"
                        type="submit"
                        disabled={deleteSpell.isPending || deleteSpell.isSuccess}
                    >
                        {deleteSpell.isPending || deleteSpell.isSuccess ? (
                            <LuLoader2 className="h-4 w-4 animate-spin stroke-[3]" />
                        ) : (
                            <>
                                <LuTrash2 className="mr-3 h-4 w-4 stroke-[3]" />
                                {t.form.delete}
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
};

export default DeleteSpellForm;
