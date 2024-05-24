import { getClassIcon } from "@/component/CharacterItem";
import { Button } from "@/component/ui/button";
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
import { useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import { z } from "zod";

interface Props {
    user: User;
    language: Language;
}

const CreateCharacterForm = ({ user, language }: Props) => {
    const { t } = useTranslation(language);
    const createCharacter = useCreateCharacter();

    const formSchema = z.object({
        name: z
            .string()
            .min(2, { message: t.dnd.character.error.nameTooShort })
            .max(16, { message: t.dnd.character.error.nameTooLong }),
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
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>{t.dnd.character.name}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={`${t.dnd.character.name}...`}
                                    {...field}
                                    className="w-fit min-w-80 text-lg font-semibold tracking-wide placeholder:text-lg placeholder:font-normal"
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
                                    className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8"
                                >
                                    {Object.values(ClassType).map((classType) => (
                                        <FormItem key={classType} className="group flex items-center">
                                            <FormControl>
                                                <RadioGroupItem
                                                    value={classType}
                                                    className="flex h-fit w-full flex-col items-center gap-1 rounded-md p-2 mouse:cursor-pointer"
                                                >
                                                    {getClassIcon(
                                                        classType,
                                                        cn(
                                                            `h-14 min-h-14 w-14 text-stone-600 dark:text-stone-400 mouse:transition-colors ${getClassColorOnHover(classType)}`,
                                                            field.value === classType && getClassColor(classType),
                                                        ),
                                                    )}

                                                    <h3
                                                        className={cn(
                                                            `text-sm font-medium tracking-wide opacity-90 ${getClassColorOnHover(classType)}`,
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

                <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>{t.dnd.character.level}</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(value) => field.onChange(parseInt(value))}
                                    defaultValue={field.value.toString()}
                                    className="flex w-full flex-wrap gap-2"
                                >
                                    {Array.from({ length: 20 }, (_, index) => index + 1).map((level) => (
                                        <FormItem key={level} className="group flex items-center">
                                            <FormControl>
                                                <RadioGroupItem
                                                    value={level.toString()}
                                                    className="flex h-fit w-full flex-col items-center gap-1 mouse:cursor-pointer"
                                                    asChild
                                                >
                                                    <Button
                                                        variant={field.value === level ? "default" : "outline"}
                                                        className={cn(
                                                            getClassBackgroundColorOnHover(form.watch("class")),
                                                            field.value === level &&
                                                                getClassBackgroundColor(form.watch("class")),
                                                        )}
                                                        size="icon"
                                                    >
                                                        {level}
                                                    </Button>
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

                <FormField
                    control={form.control}
                    name="ability"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>
                                {t.enum.ability[getAbility(form.watch("class"))]} {t.dnd.character.ability}
                            </FormLabel>

                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder={`${t.dnd.character.name}...`}
                                    {...field}
                                    className="w-fit min-w-80 text-lg font-semibold tracking-wide placeholder:text-lg placeholder:font-normal"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className={cn(
                        getClassBackgroundColorOnHover(form.watch("class")),
                        getClassBackgroundColor(form.watch("class")),
                    )}
                >
                    <LuPlus className="mr-3 h-4 w-4 stroke-[3]" />
                    {t.dnd.character.submit}
                </Button>
            </form>
        </Form>
    );
};

export default CreateCharacterForm;
