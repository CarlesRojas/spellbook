import { Button } from "@/component/ui/button";
import { Form } from "@/component/ui/form";
import { useTranslation } from "@/hook/useTranslation";
import { useDeleteCharacter } from "@/server/use/useDeleteCharacter";
import { Character } from "@/type/Character";
import { Language } from "@/type/Language";
import { User } from "@/type/User";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { LuLoader2, LuTrash2 } from "react-icons/lu";
import { DialogFooter } from "../ui/dialog";

interface Props {
    character: Character;
    language: Language;
    user: User;
    onClose?: () => void;
}

const DeleteCharacterForm = ({ character, user, language, onClose }: Props) => {
    const { t } = useTranslation(language);
    const deleteCharacter = useDeleteCharacter(user.email);

    const form = useForm();

    const onSubmit = () => {
        deleteCharacter.mutate(character.id);
        onClose?.();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="h-fit max-h-[75vh] space-y-6 overflow-auto px-1 pb-1">
                    <p>{t.dnd.character.deleteDisclaimer}</p>
                </div>

                <DialogFooter className="flex w-full flex-row justify-end gap-2 pt-4">
                    <DialogClose asChild>
                        <Button disabled={deleteCharacter.isPending || deleteCharacter.isSuccess} variant="outline">
                            {t.form.cancel}
                        </Button>
                    </DialogClose>

                    <Button
                        variant="destructive"
                        type="submit"
                        disabled={deleteCharacter.isPending || deleteCharacter.isSuccess}
                    >
                        {deleteCharacter.isPending || deleteCharacter.isSuccess ? (
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

export default DeleteCharacterForm;
