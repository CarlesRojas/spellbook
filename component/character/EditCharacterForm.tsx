import { Button } from "@/component/ui/button";
import { DialogClose, DialogFooter } from "@/component/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/component/ui/form";
import { Input } from "@/component/ui/input";
import { useTranslation } from "@/hook/useTranslation";
import { getAbility } from "@/lib/character";
import { useEditCharacter } from "@/server/use/useEditCharacter";
import { Character } from "@/type/Character";
import { Language } from "@/type/Language";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LuLoader2, LuMinus, LuPencil, LuPlus } from "react-icons/lu";
import { z } from "zod";

interface Props {
    character: Character;
    language: Language;
    editName?: boolean;
    onSuccess?: () => void;
}

const EditCharacterForm = ({ character, editName, language, onSuccess }: Props) => {
    const { t } = useTranslation(language);
    const editCharacter = useEditCharacter(onSuccess);

    const formSchema = z.object({
        name: z
            .string()
            .min(2, { message: t.dnd.character.error.nameTooShort })
            .max(16, { message: t.dnd.character.error.nameTooLong }),
        level: z.number().min(1).max(20),
        ability: z.coerce.number(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ability: character.ability,
            level: character.level,
            name: character.name,
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        editCharacter.mutate({
            ...character,
            ...values,
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex h-fit max-h-[75vh] flex-wrap gap-x-8 gap-y-4 overflow-auto px-1 pb-1 sm:gap-x-10">
                    {editName && (
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>{t.dnd.character.name}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={`${t.dnd.character.name}...`}
                                            disabled={editCharacter.isPending || editCharacter.isSuccess}
                                            {...field}
                                            className="w-fit min-w-80 text-lg font-semibold tracking-wide placeholder:text-lg placeholder:font-normal"
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    <FormField
                        control={form.control}
                        name="level"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel>{t.dnd.character.level}</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-4">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            type="button"
                                            disabled={
                                                field.value <= 1 || editCharacter.isPending || editCharacter.isSuccess
                                            }
                                            onClick={() => field.onChange(field.value - 1)}
                                        >
                                            <LuMinus className="h-4 w-4 stroke-[3]" />
                                        </Button>

                                        <p className="flex min-w-7 select-none items-center justify-center text-lg font-semibold tabular-nums tracking-wide">
                                            {field.value}
                                        </p>

                                        <Button
                                            variant="outline"
                                            size="icon"
                                            type="button"
                                            disabled={
                                                field.value >= 20 || editCharacter.isPending || editCharacter.isSuccess
                                            }
                                            onClick={() => field.onChange(field.value + 1)}
                                        >
                                            <LuPlus className="h-4 w-4 stroke-[3]" />
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="ability"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel>
                                    {t.enum.ability[getAbility(character.class)]} {t.dnd.character.ability}
                                </FormLabel>

                                <FormControl>
                                    <div className="flex items-center gap-4">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            type="button"
                                            disabled={editCharacter.isPending || editCharacter.isSuccess}
                                            onClick={() => field.onChange(field.value - 1)}
                                        >
                                            <LuMinus className="h-4 w-4 stroke-[3]" />
                                        </Button>

                                        <p className="flex min-w-7 select-none items-center justify-center text-lg font-semibold tabular-nums tracking-wide">
                                            {field.value}
                                        </p>

                                        <Button
                                            variant="outline"
                                            size="icon"
                                            type="button"
                                            disabled={editCharacter.isPending || editCharacter.isSuccess}
                                            onClick={() => field.onChange(field.value + 1)}
                                        >
                                            <LuPlus className="h-4 w-4 stroke-[3]" />
                                        </Button>
                                    </div>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <DialogFooter className="flex w-full flex-row justify-end gap-2 pt-4">
                    <DialogClose asChild>
                        <Button disabled={editCharacter.isPending || editCharacter.isSuccess} variant="outline">
                            {t.form.cancel}
                        </Button>
                    </DialogClose>

                    <Button type="submit" disabled={editCharacter.isPending || editCharacter.isSuccess}>
                        {editCharacter.isPending || editCharacter.isSuccess ? (
                            <LuLoader2 className="h-4 w-4 animate-spin stroke-[3]" />
                        ) : (
                            <>
                                <LuPencil className="mr-3 h-4 w-4 stroke-[3]" />
                                {t.form.confirm}
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
};

export default EditCharacterForm;
