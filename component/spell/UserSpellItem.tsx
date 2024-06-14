import UserSpellForm from "@/component/spell/UserSpellForm";
import { Button } from "@/component/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/component/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/component/ui/popover";
import { useTranslation } from "@/hook/useTranslation";
import { getSpellColorOnHover, getSpellRawColor } from "@/lib/spell";
import { cn } from "@/lib/util";
import { Language } from "@/type/Language";
import { Route } from "@/type/Route";
import { Spell } from "@/type/Spell";
import { User } from "@/type/User";
import { default as Link } from "next/link";
import { useState } from "react";
import { LuPencil, LuTrash2, LuView } from "react-icons/lu";

interface Props {
    spell: Spell;
    user: User;
    spells: Spell[] | undefined;
    language: Language;
}

const UserSpellItem = ({ spell, language, user, spells }: Props) => {
    const { t } = useTranslation(language);
    const { index, icon, color, name } = spell;

    const [popoverOpen, setPopoverOpen] = useState(false);

    const smallIcon = (
        <div
            className="inline-block h-8 max-h-8 min-h-8 w-8 min-w-8 max-w-8 bg-cover brightness-90 dark:brightness-100"
            style={{
                backgroundImage: `url(/spell/${icon})`,
                maskImage: `url(/spell/${icon})`,
                maskMode: "alpha",
                maskSize: "cover",
                backgroundBlendMode: "luminosity",
                backgroundColor: getSpellRawColor(color),
            }}
        />
    );

    const spellMini = (className?: string) => (
        <div className={cn("flex w-fit items-center gap-2", className)}>
            {smallIcon}

            <p className="w-full truncate font-medium leading-tight tracking-wide mouse:group-hover:opacity-0">
                {name[language]}
            </p>
        </div>
    );

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    return (
        <div className="spell flex flex-col items-center gap-2">
            <Popover modal={true} open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger className="focus-shadow group relative flex w-full flex-col items-center rounded-md p-2">
                    <div
                        className="inline-block h-20 min-h-20 w-20 min-w-20 bg-cover brightness-90 dark:brightness-100 sm:h-24 sm:min-h-24 sm:w-24 sm:min-w-24 mouse:transition-transform mouse:group-hover:scale-110"
                        style={{
                            backgroundImage: `url(/spell/${icon})`,
                            maskImage: `url(/spell/${icon})`,
                            maskMode: "alpha",
                            maskSize: "cover",
                            backgroundBlendMode: "luminosity",
                            backgroundColor: getSpellRawColor(color),
                        }}
                    />

                    <h3
                        className={cn(
                            "w-full overflow-hidden text-ellipsis text-center text-sm font-semibold leading-tight",
                            getSpellColorOnHover(spell.color),
                        )}
                    >
                        {name[language]}
                    </h3>
                </PopoverTrigger>

                <PopoverContent className="mx-2 my-3">
                    {spellMini("mb-2 w-full border-b border-stone-300 px-2 pb-2 dark:border-stone-700")}

                    <Button
                        variant="menu"
                        size="menu"
                        onClick={() => {
                            setEditDialogOpen(true);
                            setPopoverOpen(false);
                        }}
                    >
                        <LuPencil className="mr-2 h-5 w-5" />
                        <p className="font-medium tracking-wide">{t.form.edit}</p>
                    </Button>

                    <Button
                        variant="menu"
                        size="menu"
                        onClick={() => {
                            setDeleteDialogOpen(true);
                            setPopoverOpen(false);
                        }}
                    >
                        <LuTrash2 className="mr-2 h-5 w-5 text-red-500" />
                        <p className="font-medium tracking-wide text-red-500">{t.form.delete}</p>
                    </Button>

                    <Button asChild variant="menu" size="menu">
                        <Link href={`/${language}${Route.SPELL}/${index}`}>
                            <LuView className="mr-2 h-5 w-5" />
                            <p className="font-medium tracking-wide">{t.dnd.spell.view}</p>
                        </Link>
                    </Button>
                </PopoverContent>
            </Popover>

            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent position="top">
                    <DialogHeader>
                        <DialogTitle className="px-2">{t.dnd.newSpell.editSpell}</DialogTitle>
                    </DialogHeader>

                    {spells && (
                        <UserSpellForm
                            defaultValue={spell}
                            user={user}
                            spells={spells}
                            language={language}
                            onClose={() => setEditDialogOpen(false)}
                        />
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    {/* <DialogHeader className="flex flex-row items-center gap-2">
                        {getClassIcon(character.class, "h-8 min-h-8 w-8")}

                        <DialogTitle className="px-2">
                            {t.form.delete} {character.name}
                        </DialogTitle>
                    </DialogHeader>

                    <DeleteSpellForm
                        character={character}
                        user={user}
                        onClose={() => setDeleteDialogOpen(false)}
                        language={language}
                    /> */}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UserSpellItem;
