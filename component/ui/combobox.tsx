import { Button } from "@/component/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/component/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/component/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/component/ui/popover";
import { useMediaQuery } from "@/hook/useMediaQuery";
import { useTranslation } from "@/hook/useTranslation";
import { cn } from "@/lib/util";
import { Language } from "@/type/Language";
import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

interface ComboboxListItem {
    value: string;
    label: string;
}

interface ResponsiveComboboxProps {
    value: ComboboxListItem | null;
    setValue: (value: ComboboxListItem | null) => void;
    options: ComboboxListItem[];
    language: Language;
    placeholder?: string;
}

export const ResponsiveCombobox = ({ value, setValue, options, language, placeholder }: ResponsiveComboboxProps) => {
    const { t } = useTranslation(language);

    const [castingTimeOpen, setCastingTimeOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop)
        return (
            <Popover open={castingTimeOpen} onOpenChange={setCastingTimeOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start">
                        {value ? <> {value.label}</> : <>{placeholder ?? t.form.select}</>}

                        <LuChevronDown className="ml-3 h-4 w-4 stroke-[3]" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[200px] p-0" align="start">
                    <ComboboxList
                        setOpen={setCastingTimeOpen}
                        setSelected={(elem) => setValue(elem)}
                        options={options}
                        language={language}
                    />
                </PopoverContent>
            </Popover>
        );

    return (
        <Drawer open={castingTimeOpen} onOpenChange={setCastingTimeOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="justify-start">
                    {value ? <> {value.label}</> : <>{placeholder ?? t.form.select}</>}

                    <LuChevronDown className="ml-3 h-4 w-4 stroke-[3]" />
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <div className="mt-4">
                    <ComboboxList
                        setOpen={setCastingTimeOpen}
                        setSelected={(elem) => setValue(elem)}
                        options={options}
                        language={language}
                        centered
                    />
                </div>
            </DrawerContent>
        </Drawer>
    );
};

interface ComboboxProps {
    setOpen: (open: boolean) => void;
    setSelected: (status: ComboboxListItem | null) => void;
    options: ComboboxListItem[];
    language: Language;
    showInput?: boolean;
    centered?: boolean;
}

export const ComboboxList = ({ setOpen, setSelected, options, language, showInput, centered }: ComboboxProps) => {
    const { t } = useTranslation(language);

    return (
        <Command>
            {showInput && <CommandInput placeholder={t.form.filter} />}

            <CommandList>
                <CommandEmpty>{t.form.noResults}</CommandEmpty>
                <CommandGroup>
                    {options.map((option) => (
                        <CommandItem
                            key={option.value}
                            value={option.value}
                            onSelect={(value) => {
                                setSelected(option || null);
                                setOpen(false);
                            }}
                            className={cn(centered && "justify-center", !centered && "justify-start")}
                        >
                            {option.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
};
