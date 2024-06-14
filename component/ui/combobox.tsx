import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/component/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/component/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/component/ui/popover";
import { useMediaQuery } from "@/hook/useMediaQuery";
import { cn } from "@/lib/util";
import { ReactNode, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import { Button } from "./button";

export interface ComboboxItem {
    id: string;
    search?: string;
    trigger?: ReactNode;
    label: string | React.ReactElement;
}

interface Props {
    value: ComboboxItem | null;
    setValue: (value: ComboboxItem | null) => void;
    options: ComboboxItem[];
    text: {
        filter: string;
        select: string;
        noResults: string;
    };
    placeholder?: string;
    showInput?: boolean;
    showDropdownIcon?: boolean;
    customTrigger?: ReactNode;
    triggerClassName?: string;
}

export const Combobox = ({
    value,
    setValue,
    options,
    text,
    placeholder,
    showInput,
    showDropdownIcon,
    triggerClassName,
}: Props) => {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant={"outline"} className={cn("justify-start", triggerClassName)}>
                        {value ? value.trigger ?? value.label : placeholder ?? text.select}

                        {showDropdownIcon && <LuChevronDown className="ml-3 h-4 w-4 stroke-[3]" />}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[200px] p-0" align="start">
                    <List
                        setOpen={setOpen}
                        setSelected={(elem) => setValue(elem)}
                        options={options}
                        text={text}
                        showInput={showInput}
                    />
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant={"outline"} className={cn("justify-start", triggerClassName)}>
                    {value ? value.trigger ?? value.label : placeholder ?? text.select}

                    {showDropdownIcon && <LuChevronDown className="ml-3 h-4 w-4 stroke-[3]" />}
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <div className="mt-4">
                    <List
                        setOpen={setOpen}
                        setSelected={(elem) => setValue(elem)}
                        options={options}
                        text={text}
                        showInput={showInput}
                        centered
                    />
                </div>
            </DrawerContent>
        </Drawer>
    );
};

interface ListProps {
    setOpen: (open: boolean) => void;
    setSelected: (value: ComboboxItem | null) => void;
    options: ComboboxItem[];
    text: {
        filter: string;
        select: string;
        noResults: string;
    };
    showInput?: boolean;
    centered?: boolean;
}

const getKey = (option: ComboboxItem) => option.id + (option.search ? option.search : "");

export const List = ({ setOpen, setSelected, options, text, showInput, centered }: ListProps) => {
    return (
        <Command>
            {showInput && <CommandInput placeholder={text.filter} />}

            <CommandList>
                <CommandEmpty>{text.noResults}</CommandEmpty>

                <CommandGroup>
                    {options.map((option) => {
                        const key = getKey(option);

                        return (
                            <CommandItem
                                key={key}
                                value={key}
                                onSelect={(selectedKey) => {
                                    setSelected(options.find((curr) => getKey(curr) === selectedKey) || null);
                                    setOpen(false);
                                }}
                                className={cn(centered && "justify-center", !centered && "justify-start")}
                            >
                                {option.label}
                            </CommandItem>
                        );
                    })}
                </CommandGroup>
            </CommandList>
        </Command>
    );
};
