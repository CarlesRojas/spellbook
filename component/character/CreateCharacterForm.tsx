import { getClassIcon } from "@/component/character/CharacterItem";
import { Button } from "@/component/ui/button";
import { DialogFooter } from "@/component/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/component/ui/form";
import { Input } from "@/component/ui/input";
import { RadioGroup, RadioGroupItem } from "@/component/ui/radio-group";
import { useTranslation } from "@/hook/useTranslation";
import {
    getAbility,
    getClassBackgroundColor,
    getClassBackgroundColorOnHover,
    getClassColor,
    getClassColorOnHover,
} from "@/lib/character";
import { cn } from "@/lib/util";
import { useCreateCharacter } from "@/server/use/useCreateCharacter";
import { Language } from "@/type/Language";
import { ClassType } from "@/type/Spell";
import { User } from "@/type/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { LuLoader2, LuMinus, LuPlus } from "react-icons/lu";
import { z } from "zod";

interface Props {
    user: User;
    language: Language;
    onClose?: () => void;
}

const CreateCharacterForm = ({ user, language, onClose }: Props) => {
    const { t } = useTranslation(language);
    const createCharacter = useCreateCharacter(user.email);

    const formSchema = z.object({
        name: z
            .string()
            .min(2, { message: t.dnd.character.error.nameTooShort })
            .max(14, { message: t.dnd.character.error.nameTooLong }),
        level: z.number().min(1).max(20),
        class: z.nativeEnum(ClassType),
        ability: z.coerce.number(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ability: 10,
            class: ClassType.WIZARD,
            level: 1,
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        createCharacter.mutate({
            userEmail: user.email,
            userName: user.name,
            ...values,
        });
        onClose?.();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="h-fit max-h-[75vh] space-y-6 overflow-auto px-1 pb-1">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel>{t.dnd.character.name}</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={createCharacter.isPending || createCharacter.isSuccess}
                                        {...field}
                                        className="w-full font-semibold tracking-wide sm:max-w-96"
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="class"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel>{t.dnd.character.class}</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        disabled={createCharacter.isPending || createCharacter.isSuccess}
                                        className="grid min-w-fit grid-cols-[repeat(4,_minmax(min-content,_1fr))] gap-2 sm:grid-cols-[repeat(6,_minmax(min-content,_1fr))] md:grid-cols-[repeat(8,_minmax(min-content,_1fr))]"
                                    >
                                        {Object.values(ClassType).map((classType) => (
                                            <FormItem key={classType} className="group flex min-w-fit items-center">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        value={classType}
                                                        disabled={
                                                            createCharacter.isPending || createCharacter.isSuccess
                                                        }
                                                        className="flex h-fit w-full min-w-fit flex-col items-center gap-1 rounded-md p-2 mouse:cursor-pointer mouse:disabled:cursor-not-allowed"
                                                    >
                                                        {getClassIcon(
                                                            classType,
                                                            cn(
                                                                "h-14 min-h-14 w-14 min-w-14 text-stone-600 dark:text-stone-400 mouse:transition-colors",
                                                                !createCharacter.isPending ||
                                                                    (createCharacter.isSuccess &&
                                                                        getClassColorOnHover(classType)),
                                                                field.value === classType && getClassColor(classType),
                                                            ),
                                                        )}

                                                        <h3
                                                            className={cn(
                                                                "text-sm font-medium tracking-wide opacity-90",
                                                                !createCharacter.isPending ||
                                                                    (createCharacter.isSuccess &&
                                                                        getClassColorOnHover(classType)),
                                                                field.value === classType && getClassColor(classType),
                                                            )}
                                                        >
                                                            {t.enum.class[classType]}
                                                        </h3>
                                                    </RadioGroupItem>
                                                </FormControl>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex h-fit flex-wrap gap-x-8 gap-y-4 sm:gap-x-10">
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
                                                    field.value <= 1 ||
                                                    createCharacter.isPending ||
                                                    createCharacter.isSuccess
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
                                                    field.value >= 20 ||
                                                    createCharacter.isPending ||
                                                    createCharacter.isSuccess
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
                                    <FormLabel>{t.enum.ability[getAbility(form.watch("class"))]}</FormLabel>

                                    <FormControl>
                                        <div className="flex items-center gap-4">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                type="button"
                                                disabled={createCharacter.isPending || createCharacter.isSuccess}
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
                                                disabled={createCharacter.isPending || createCharacter.isSuccess}
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
                </div>

                <DialogFooter className="flex w-full flex-row justify-end gap-2 pt-4">
                    <DialogClose asChild>
                        <Button disabled={createCharacter.isPending || createCharacter.isSuccess} variant="outline">
                            {t.form.cancel}
                        </Button>
                    </DialogClose>

                    <Button
                        type="submit"
                        disabled={createCharacter.isPending || createCharacter.isSuccess}
                        className={cn(
                            getClassBackgroundColorOnHover(form.watch("class")),
                            getClassBackgroundColor(form.watch("class")),
                        )}
                    >
                        {createCharacter.isPending || createCharacter.isSuccess ? (
                            <LuLoader2 className="h-4 w-4 animate-spin stroke-[3]" />
                        ) : (
                            <>
                                <LuPlus className="mr-3 h-4 w-4 stroke-[3]" />
                                {t.form.create}
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
};

export default CreateCharacterForm;
