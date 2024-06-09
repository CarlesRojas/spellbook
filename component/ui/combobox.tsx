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

    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop)
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start">
                        {value ? <> {value.label}</> : <>{placeholder ?? t.form.select}</>}

                        <LuChevronDown className="ml-3 h-4 w-4 stroke-[3]" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[200px] p-0" align="start">
                    <ComboboxList
                        setOpen={setOpen}
                        setSelected={(elem) => setValue(elem)}
                        options={options}
                        language={language}
                    />
                </PopoverContent>
            </Popover>
        );

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="justify-start">
                    {value ? <> {value.label}</> : <>{placeholder ?? t.form.select}</>}

                    <LuChevronDown className="ml-3 h-4 w-4 stroke-[3]" />
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <div className="mt-4">
                    <ComboboxList
                        setOpen={setOpen}
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
    setSelected: (value: ComboboxListItem | null) => void;
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

interface ResponsiveCustomComboboxProps<T> {
    value: T;
    onChange: (value: T) => void;
    options: T[];
    component: (value: T) => JSX.Element;
    triggerComponent: (value: T) => JSX.Element;
}

export const ResponsiveCustomCombobox = <T,>({
    value,
    onChange,
    options,
    component,
    triggerComponent,
}: ResponsiveCustomComboboxProps<T>) => {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop)
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="h-20 min-h-20 w-20 min-w-20 justify-start p-2">
                        {triggerComponent(value)}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="max-h-[600px] w-[400px] overflow-y-auto overflow-x-hidden" align="start">
                    <div className="grid w-full max-w-[95vw] grid-cols-4 gap-3 overflow-y-auto overflow-x-hidden p-3">
                        {options.map((option, i) => (
                            <Button
                                key={i}
                                variant="menu"
                                onClick={() => {
                                    setOpen(false);
                                    onChange(option);
                                }}
                                type="button"
                                className="inline-block aspect-square h-full max-h-full w-full max-w-full bg-cover p-0 brightness-90 dark:brightness-100 mouse:cursor-pointer mouse:transition-transform mouse:hover:scale-110"
                            >
                                {component(option)}
                            </Button>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
        );

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="h-20 min-h-20 w-20 min-w-20 justify-start p-2">
                    {triggerComponent(value)}
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <div className="mt-4 max-h-[600px] w-full overflow-y-auto overflow-x-hidden">
                    <div className="grid w-full grid-cols-4 gap-3 overflow-y-auto overflow-x-hidden p-3">
                        {options.map((option, i) => (
                            <Button
                                key={i}
                                variant="menu"
                                onClick={() => {
                                    setOpen(false);
                                    onChange(option);
                                }}
                                type="button"
                                className="inline-block aspect-square h-full max-h-full w-full max-w-full bg-cover p-0 brightness-90 dark:brightness-100 mouse:cursor-pointer mouse:transition-transform mouse:hover:scale-110"
                            >
                                {component(option)}
                            </Button>
                        ))}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};
