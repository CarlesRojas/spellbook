import { Button } from "@/component/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/component/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/component/ui/form";
import { RadioGroup, RadioGroupItem } from "@/component/ui/radio-group";
import { useTranslation } from "@/hook/useTranslation";
import { parseParagraphsWithDice } from "@/lib/dice";
import {
    getSpellBackground,
    getSpellBackgroundOnHover,
    getSpellBorder,
    getSpellBorderOnHover,
    getSpellColor,
    getSpellColorOnHover,
} from "@/lib/spell";
import { cn } from "@/lib/util";
import { Language } from "@/type/Language";
import { Spell } from "@/type/Spell";
import { SpellSlots, getLevelKey, getSpellSlotKey } from "@/type/SpellSlots";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useMemo } from "react";
import { useForm } from "react-hook-form";
import { LuLoader } from "react-icons/lu";
import { z } from "zod";

interface Props {
    spell: Spell;
    language: Language;
    spellMini: (className?: string) => ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    cast: (level: number) => void;
    availableSpellSlots: SpellSlots;
}

const HigherLevelDialog = ({ spell, spellMini, language, open, onOpenChange, cast, availableSpellSlots }: Props) => {
    const { t } = useTranslation(language);

    const { color, level, ritual: isRitual, highLevelDescription } = spell;

    const availableLevels: number[] = useMemo(() => {
        const result: number[] = [];
        if (isRitual) result.push(-1);

        for (const [slot, amount] of Object.entries(availableSpellSlots)) {
            const slotLevel = getLevelKey(slot as keyof SpellSlots);
            if (slotLevel >= level && amount > 0) result.push(slotLevel);
        }

        return result;
    }, [availableSpellSlots, isRitual, level]);

    const formSchema = z.object({
        level: z.number().min(-1).max(9),
    });

    console.log(availableLevels[0] === -1 && availableLevels.length > 1 ? availableLevels[1] : availableLevels[0]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            level: availableLevels[0] === -1 && availableLevels.length > 1 ? availableLevels[1] : availableLevels[0],
        },
    });

    const onSubmit = ({ level }: z.infer<typeof formSchema>) => {
        form.reset();
        cast(level);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(newOpen) => {
                form.reset();
                onOpenChange(newOpen);
            }}
        >
            <DialogContent>
                <DialogHeader className="flex flex-row items-center gap-2">
                    <DialogTitle>{spellMini()}</DialogTitle>
                </DialogHeader>

                {availableSpellSlots[getSpellSlotKey(level)] <= 0 && (
                    <p className="font-semibold tracking-wide text-red-500">
                        {t.dnd.cast.outOfSpellSlots.replace("{{PARAM}}", level.toString())}
                    </p>
                )}

                {highLevelDescription && <p>{parseParagraphsWithDice(highLevelDescription[language])}</p>}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="level"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>{t.dnd.cast.castWithHigherLevelSlot}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={(value) => field.onChange(parseInt(value))}
                                            className="flex flex-wrap gap-2 py-2"
                                        >
                                            {availableLevels.map((level) => (
                                                <FormItem key={level} className="group flex min-w-fit items-center">
                                                    <FormControl>
                                                        <Button
                                                            asChild
                                                            variant="outline"
                                                            className={cn(
                                                                field.value === level && getSpellColor(color),
                                                                field.value === level && getSpellBorder(color),
                                                                field.value === level && getSpellBackground(color),
                                                                getSpellBackgroundOnHover(color),
                                                            )}
                                                        >
                                                            <RadioGroupItem value={level.toString()}>
                                                                {level < 0 ? t.dnd.cast.ritual : level}
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

                        <DialogFooter className="flex w-full flex-row justify-end gap-2 pt-4">
                            <DialogClose asChild>
                                <Button variant="outline">{t.form.cancel}</Button>
                            </DialogClose>

                            <Button
                                type="submit"
                                variant="outline"
                                className={cn(
                                    getSpellColor(color),
                                    getSpellColorOnHover(color),
                                    getSpellBorder(color),
                                    getSpellBorderOnHover(color),
                                    getSpellBackground(color),
                                    getSpellBackgroundOnHover(color),
                                )}
                            >
                                <LuLoader className="mr-3 h-4 w-4 stroke-[3]" />
                                {t.dnd.spell.cast}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default HigherLevelDialog;
