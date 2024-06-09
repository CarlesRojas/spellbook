import { getClassIcon } from "@/component/character/CharacterItem";
import { Button } from "@/component/ui/button";
import { ResponsiveCombobox, ResponsiveCustomCombobox } from "@/component/ui/combobox";
import { DialogClose, DialogFooter } from "@/component/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/component/ui/form";
import { Input } from "@/component/ui/input";
import { RadioGroup, RadioGroupItem } from "@/component/ui/radio-group";
import { Switch } from "@/component/ui/switch";
import { Textarea } from "@/component/ui/textarea";
import { useTranslation } from "@/hook/useTranslation";
import { getClassBorderColor, getClassColor } from "@/lib/character";
import {
    getSpellBackground,
    getSpellBackgroundOnHover,
    getSpellBorder,
    getSpellColor,
    getSpellRawColor,
} from "@/lib/spell";
import { cn } from "@/lib/util";
import { useCreateSpell } from "@/server/use/useCreateSpell";
import { Language } from "@/type/Language";
import {
    Ability,
    AreaOfEffectType,
    AttackType,
    CastingTime,
    ClassListSchema,
    ClassType,
    Component,
    ComponentsSchema,
    DamageType,
    DifficultyClassSuccess,
    Duration,
    RangeType,
    School,
    SpellColor,
} from "@/type/Spell";
import { SpellIcon, getRandomSpellIcon } from "@/type/SpellIcon";
import { User } from "@/type/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LuLoader2, LuMinus, LuPlus } from "react-icons/lu";
import { z } from "zod";

interface Props {
    user: User;
    language: Language;
    onClose?: () => void;
}

const CreateSpellForm = ({ user, language, onClose }: Props) => {
    const { t } = useTranslation(language);
    const createSpell = useCreateSpell();

    const formSchema = z.object({
        name: z
            .string()
            .min(2, { message: t.dnd.newSpell.error.nameTooShort })
            .max(32, { message: t.dnd.newSpell.error.nameTooLong }),
        description: z
            .string()
            .min(2, { message: t.dnd.newSpell.error.descriptionTooShort })
            .max(1024, { message: t.dnd.newSpell.error.descriptionTooLong }),
        highLevelDescription: z.string().max(1024, { message: t.dnd.newSpell.error.highLevelDescriptionTooLong }),
        range: z.nativeEnum(RangeType),
        components: ComponentsSchema,
        material: z.union([
            z
                .string()
                .min(2, { message: t.dnd.newSpell.error.materialTooShort })
                .max(64, { message: t.dnd.newSpell.error.materialTooLong }),
            z.null(),
        ]),
        hasAreaOfEffect: z.boolean(),
        areaOfEffectSize: z.number().optional().nullable(),
        areaOfEffectType: z.nativeEnum(AreaOfEffectType).optional().nullable(),
        ritual: z.boolean(),
        duration: z.nativeEnum(Duration),
        concentration: z.boolean(),
        castingTime: z.nativeEnum(CastingTime),
        attackType: z.nativeEnum(AttackType).optional().nullable(),
        school: z.nativeEnum(School),
        classes: ClassListSchema,
        damageType: z.nativeEnum(DamageType).optional().nullable(),
        difficultyClassType: z.nativeEnum(Ability).optional().nullable(),
        level: z.number().min(1).max(20),
        icon: z.nativeEnum(SpellIcon),
        color: z.nativeEnum(SpellColor),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            highLevelDescription: "",
            range: RangeType.FIVE_FEET,
            components: [],
            material: null,
            hasAreaOfEffect: false,
            areaOfEffectSize: null,
            areaOfEffectType: null,
            ritual: false,
            duration: Duration.INSTANTANEOUS,
            concentration: false,
            castingTime: CastingTime.ONE_ACTION,
            attackType: undefined,
            school: School.EVOCATION,
            classes: [],
            damageType: undefined,
            difficultyClassType: Ability.STR,
            level: 1,
            icon: getRandomSpellIcon(),
            color: SpellColor.SHOCK,
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        createSpell.mutate({
            spell: {
                index: "",
                name: { id: 0, en: values.name, es: values.name },
                description: { id: 0, en: values.description, es: values.description },
                highLevelDescription: values.highLevelDescription
                    ? { id: 0, en: values.highLevelDescription, es: values.highLevelDescription }
                    : undefined,
                range: values.range,
                components: values.components,
                material: values.material ? { id: 0, en: values.material, es: values.material } : undefined,
                areaOfEffect:
                    values.hasAreaOfEffect && values.areaOfEffectSize && values.areaOfEffectType
                        ? {
                              size: values.areaOfEffectSize,
                              type: values.areaOfEffectType,
                          }
                        : undefined,

                ritual: values.ritual,
                duration: values.duration,
                concentration: values.concentration,
                castingTime: values.castingTime,
                attackType: values.attackType ?? undefined,
                school: values.school,
                classes: values.classes,
                damage: values.damageType ? { type: values.damageType } : undefined,
                subclasses: [],
                difficultyClass: values.difficultyClassType
                    ? {
                          type: values.difficultyClassType,
                          success: DifficultyClassSuccess.OTHER,
                      }
                    : undefined,
                level: values.level,
                icon: values.icon,
                color: values.color,
            },
            userId: user.id,
        });
        onClose?.();
    };

    const currentSpellColor = form.watch("color");

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="h-fit max-h-[75vh] space-y-6 overflow-auto px-3 pb-1">
                    <FormField
                        control={form.control}
                        name="icon"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2">
                                <FormLabel>{t.dnd.newSpell.icon}</FormLabel>

                                <ResponsiveCustomCombobox
                                    value={field.value}
                                    onChange={(value) => field.onChange(value)}
                                    options={Object.values(SpellIcon)}
                                    component={(value) => (
                                        <div
                                            className="h-full w-full"
                                            style={{
                                                backgroundImage: `url(/spell/${value})`,
                                                maskImage: `url(/spell/${value})`,
                                                maskMode: "alpha",
                                                maskSize: "cover",
                                                backgroundBlendMode: "luminosity",
                                                backgroundColor: getSpellRawColor(form.watch("color")),
                                            }}
                                        />
                                    )}
                                    triggerComponent={(value) => (
                                        <div
                                            className="inline-block aspect-square max-h-full w-full max-w-full bg-cover brightness-90 dark:brightness-100 mouse:cursor-pointer mouse:transition-transform mouse:hover:scale-110"
                                            style={{
                                                backgroundImage: `url(/spell/${value})`,
                                                maskImage: `url(/spell/${value})`,
                                                maskMode: "alpha",
                                                maskSize: "cover",
                                                backgroundBlendMode: "luminosity",
                                                backgroundColor: getSpellRawColor(form.watch("color")),
                                            }}
                                        />
                                    )}
                                />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="color"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel>{t.dnd.newSpell.iconColor}</FormLabel>
                                <FormControl>
                                    <div className="flex flex-wrap gap-3">
                                        {Object.values(SpellColor)
                                            .reverse()
                                            .map((color) => (
                                                <FormItem key={color} className="group flex min-w-fit items-center">
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            type="button"
                                                            disabled={createSpell.isPending || createSpell.isSuccess}
                                                            onClick={() => field.onChange(color)}
                                                            className={cn(
                                                                "h-8 max-h-8 min-h-8 w-8 min-w-8 max-w-8 rounded-full mouse:transition-all mouse:hover:scale-110",
                                                                field.value === color &&
                                                                    "ring-2 ring-stone-950 ring-offset-2 ring-offset-stone-100 dark:ring-stone-400 dark:ring-offset-stone-950",
                                                            )}
                                                            style={{
                                                                backgroundColor: getSpellRawColor(color),
                                                            }}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            ))}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-col flex-wrap gap-x-8 gap-y-6 sm:flex-row">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="grow space-y-1">
                                    <FormLabel>{t.dnd.newSpell.name}</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={createSpell.isPending || createSpell.isSuccess}
                                            {...field}
                                            className="font-semibold tracking-wide"
                                        />
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
                                        <div className="flex items-center gap-4">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                type="button"
                                                disabled={
                                                    field.value <= 1 || createSpell.isPending || createSpell.isSuccess
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
                                                    field.value >= 20 || createSpell.isPending || createSpell.isSuccess
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
                    </div>

                    <FormField
                        control={form.control}
                        name="classes"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel>{t.dnd.newSpell.classes}</FormLabel>
                                <FormControl>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.values(ClassType).map((classType) => (
                                            <FormItem key={classType} className="group flex min-w-fit items-center">
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        type="button"
                                                        disabled={createSpell.isPending || createSpell.isSuccess}
                                                        onClick={() =>
                                                            field.onChange(
                                                                field.value.includes(classType)
                                                                    ? field.value.filter((elem) => elem !== classType)
                                                                    : [...field.value, classType],
                                                            )
                                                        }
                                                        className={cn(
                                                            field.value.includes(classType) &&
                                                                getClassBorderColor(classType),
                                                        )}
                                                    >
                                                        {getClassIcon(
                                                            classType,
                                                            cn(
                                                                "h-7 min-h-7 w-7 min-w-7 text-stone-600 dark:text-stone-400 mouse:transition-colors",
                                                                field.value.includes(classType) &&
                                                                    getClassColor(classType),
                                                            ),
                                                        )}

                                                        <p
                                                            className={cn(
                                                                "ml-2",
                                                                field.value.includes(classType) &&
                                                                    getClassColor(classType),
                                                            )}
                                                        >
                                                            {t.enum.class[classType]}
                                                        </p>
                                                    </Button>
                                                </FormControl>
                                            </FormItem>
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel>{t.dnd.newSpell.description}</FormLabel>
                                <FormControl>
                                    <Textarea disabled={createSpell.isPending || createSpell.isSuccess} {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="highLevelDescription"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel>
                                    {t.dnd.newSpell.highLevelDescription} ({t.form.optional})
                                </FormLabel>
                                <FormControl>
                                    <Textarea disabled={createSpell.isPending || createSpell.isSuccess} {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="components"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel>{t.dnd.newSpell.components}</FormLabel>
                                <FormControl>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.values(Component).map((component) => (
                                            <FormItem key={component} className="group flex min-w-fit items-center">
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        type="button"
                                                        disabled={createSpell.isPending || createSpell.isSuccess}
                                                        onClick={() => {
                                                            if (
                                                                component === Component.M &&
                                                                field.value.includes(component)
                                                            )
                                                                form.setValue("material", null);
                                                            else if (
                                                                component === Component.M &&
                                                                !field.value.includes(component)
                                                            )
                                                                form.setValue("material", "");

                                                            field.onChange(
                                                                field.value.includes(component)
                                                                    ? field.value.filter((elem) => elem !== component)
                                                                    : [...field.value, component],
                                                            );
                                                        }}
                                                        className={cn(
                                                            field.value.includes(component) &&
                                                                getSpellColor(currentSpellColor),
                                                            field.value.includes(component) &&
                                                                getSpellBorder(currentSpellColor),
                                                            field.value.includes(component) &&
                                                                getSpellBackground(currentSpellColor),
                                                            getSpellBackgroundOnHover(currentSpellColor),
                                                        )}
                                                    >
                                                        {t.enum.component[component]}
                                                    </Button>
                                                </FormControl>
                                            </FormItem>
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {form.watch("components").includes(Component.M) && (
                        <FormField
                            control={form.control}
                            name="material"
                            render={({ field: { value, ...rest } }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>{t.dnd.newSpell.material}</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={createSpell.isPending || createSpell.isSuccess}
                                            {...rest}
                                            value={value ?? ""}
                                            className="font-medium tracking-wide"
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    <div className="flex flex-wrap gap-x-8 gap-y-6">
                        <FormField
                            control={form.control}
                            name="school"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>{t.dnd.newSpell.school}</FormLabel>
                                    <ResponsiveCombobox
                                        value={{
                                            value: field.value,
                                            label: t.enum.school[field.value],
                                        }}
                                        setValue={(value) => {
                                            field.onChange(value?.value);
                                        }}
                                        options={Object.values(School).map((school) => ({
                                            value: school,
                                            label: t.enum.school[school],
                                        }))}
                                        language={language}
                                    />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="castingTime"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>{t.dnd.newSpell.castingTime}</FormLabel>
                                    <ResponsiveCombobox
                                        value={{
                                            value: field.value,
                                            label: t.enum.castingTime[field.value],
                                        }}
                                        setValue={(value) => {
                                            field.onChange(value?.value);
                                        }}
                                        options={Object.values(CastingTime).map((castingTimeType) => ({
                                            value: castingTimeType,
                                            label: t.enum.castingTime[castingTimeType],
                                        }))}
                                        language={language}
                                    />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="range"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>{t.dnd.newSpell.range}</FormLabel>
                                    <ResponsiveCombobox
                                        value={{
                                            value: field.value,
                                            label: t.enum.range[field.value],
                                        }}
                                        setValue={(value) => {
                                            field.onChange(value?.value);
                                        }}
                                        options={Object.values(RangeType).map((rangeType) => ({
                                            value: rangeType,
                                            label: t.enum.range[rangeType],
                                        }))}
                                        language={language}
                                    />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>{t.dnd.newSpell.duration}</FormLabel>
                                    <ResponsiveCombobox
                                        value={{
                                            value: field.value,
                                            label: t.enum.duration[field.value],
                                        }}
                                        setValue={(value) => {
                                            field.onChange(value?.value);
                                        }}
                                        options={Object.values(Duration).map((duration) => ({
                                            value: duration,
                                            label: t.enum.duration[duration],
                                        }))}
                                        language={language}
                                    />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="attackType"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>{t.dnd.newSpell.attackType}</FormLabel>
                                    <ResponsiveCombobox
                                        value={
                                            field.value
                                                ? {
                                                      value: field.value,
                                                      label: t.enum.attackType[field.value],
                                                  }
                                                : null
                                        }
                                        setValue={(value) => {
                                            field.onChange(value?.value ?? null);
                                        }}
                                        options={Object.values(AttackType).map((attackTypeType) => ({
                                            value: attackTypeType,
                                            label: t.enum.attackType[attackTypeType],
                                        }))}
                                        language={language}
                                        placeholder={t.dnd.newSpell.noAttackType}
                                    />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="damageType"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>{t.dnd.newSpell.damageType}</FormLabel>
                                    <ResponsiveCombobox
                                        value={
                                            field.value
                                                ? {
                                                      value: field.value,
                                                      label: t.enum.damageType[field.value],
                                                  }
                                                : null
                                        }
                                        setValue={(value) => {
                                            field.onChange(value?.value ?? null);
                                        }}
                                        options={Object.values(DamageType).map((damageTypeType) => ({
                                            value: damageTypeType,
                                            label: t.enum.damageType[damageTypeType],
                                        }))}
                                        language={language}
                                        placeholder={t.dnd.newSpell.noDamageType}
                                    />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="difficultyClassType"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>{t.dnd.newSpell.difficultyClassType}</FormLabel>
                                    <ResponsiveCombobox
                                        value={
                                            field.value
                                                ? {
                                                      value: field.value,
                                                      label: t.enum.ability[field.value],
                                                  }
                                                : null
                                        }
                                        setValue={(value) => {
                                            field.onChange(value?.value ?? null);
                                        }}
                                        options={Object.values(Ability).map((ability) => ({
                                            value: ability,
                                            label: t.enum.ability[ability],
                                        }))}
                                        language={language}
                                        placeholder={t.dnd.newSpell.noDifficultyClassType}
                                    />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="hasAreaOfEffect"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2">
                                <FormLabel>{t.dnd.newSpell.hasAreaOfEffect}</FormLabel>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={(checked) => {
                                            field.onChange(checked);

                                            if (!checked) {
                                                form.setValue("areaOfEffectSize", null);
                                                form.setValue("areaOfEffectType", null);
                                            }
                                        }}
                                        disabled={createSpell.isPending || createSpell.isSuccess}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {form.watch("hasAreaOfEffect") && (
                        <>
                            <FormField
                                control={form.control}
                                name="areaOfEffectSize"
                                render={({ field: { value, onChange, ...rest } }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>{t.dnd.newSpell.areaOfEffectSize}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                disabled={createSpell.isPending || createSpell.isSuccess}
                                                {...rest}
                                                value={value ?? ""}
                                                onChange={(event) =>
                                                    onChange(
                                                        isNaN(parseInt(event.target.value))
                                                            ? null
                                                            : parseInt(event.target.value),
                                                    )
                                                }
                                                className="font-medium tracking-wide"
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="areaOfEffectType"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>{t.dnd.newSpell.areaOfEffectType}</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value ?? undefined}
                                                disabled={createSpell.isPending || createSpell.isSuccess}
                                                className="flex flex-wrap gap-2"
                                            >
                                                {Object.values(AreaOfEffectType).map((areaOfEffectType) => (
                                                    <FormItem
                                                        key={areaOfEffectType}
                                                        className="group flex min-w-fit items-center"
                                                    >
                                                        <FormControl>
                                                            <Button
                                                                asChild
                                                                variant="outline"
                                                                className={cn(
                                                                    field.value === areaOfEffectType &&
                                                                        getSpellColor(currentSpellColor),
                                                                    field.value === areaOfEffectType &&
                                                                        getSpellBorder(currentSpellColor),
                                                                    field.value === areaOfEffectType &&
                                                                        getSpellBackground(currentSpellColor),
                                                                    getSpellBackgroundOnHover(currentSpellColor),
                                                                )}
                                                            >
                                                                <RadioGroupItem value={areaOfEffectType}>
                                                                    {t.enum.areaOfEffect[areaOfEffectType]}
                                                                </RadioGroupItem>
                                                            </Button>
                                                        </FormControl>
                                                    </FormItem>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    <FormField
                        control={form.control}
                        name="ritual"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2">
                                <FormLabel>{t.dnd.newSpell.ritual}</FormLabel>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        disabled={createSpell.isPending || createSpell.isSuccess}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="concentration"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2">
                                <FormLabel>{t.dnd.newSpell.concentration}</FormLabel>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        disabled={createSpell.isPending || createSpell.isSuccess}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <DialogFooter className="flex w-full flex-row justify-end gap-2 pt-4">
                    <DialogClose asChild>
                        <Button disabled={createSpell.isPending || createSpell.isSuccess} variant="outline">
                            {t.form.cancel}
                        </Button>
                    </DialogClose>

                    <Button type="submit" disabled={createSpell.isPending || createSpell.isSuccess}>
                        {createSpell.isPending || createSpell.isSuccess ? (
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

export default CreateSpellForm;
