"use client";

import { getClassIcon } from "@/component/character/CharacterItem";
import DeleteCharacterForm from "@/component/character/DeleteCharacterForm";
import EditCharacterForm from "@/component/character/EditCharacterForm";
import { Button } from "@/component/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/component/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/component/ui/popover";
import { useTranslation } from "@/hook/useTranslation";
import { Character } from "@/type/Character";
import { Language } from "@/type/Language";
import { User } from "@/type/User";
import { useState } from "react";
import { LuMoreHorizontal, LuPencil, LuTrash2 } from "react-icons/lu";

export interface Props {
    character: Character;
    language: Language;
    user: User;
}

const CharacterDropdownMenu = ({ character, language, user }: Props) => {
    const { t } = useTranslation(language);

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    return (
        <>
            <Popover modal={true}>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                        <LuMoreHorizontal className="h-4 w-4 stroke-[3]" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="mx-2 my-3">
                    <Button variant="menu" size="menu" onClick={() => setEditDialogOpen(true)}>
                        <LuPencil className="mr-2 h-5 w-5" />
                        <p className="font-medium tracking-wide">{t.form.edit}</p>
                    </Button>

                    <Button variant="menu" size="menu" onClick={() => setDeleteDialogOpen(true)}>
                        <LuTrash2 className="mr-2 h-5 w-5 text-red-500" />
                        <p className="font-medium tracking-wide text-red-500">{t.form.delete}</p>
                    </Button>
                </PopoverContent>
            </Popover>

            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent>
                    <DialogHeader className="flex flex-row items-center gap-2">
                        {getClassIcon(character.class, "h-8 min-h-8 w-8")}

                        <DialogTitle>
                            {t.form.edit} {character.name}
                        </DialogTitle>
                    </DialogHeader>

                    <EditCharacterForm
                        character={character}
                        user={user}
                        editName
                        onClose={() => setEditDialogOpen(false)}
                        language={language}
                    />
                </DialogContent>
            </Dialog>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader className="flex flex-row items-center gap-2">
                        {getClassIcon(character.class, "h-8 min-h-8 w-8")}

                        <DialogTitle>
                            {t.form.delete} {character.name}
                        </DialogTitle>
                    </DialogHeader>

                    <DeleteCharacterForm
                        character={character}
                        user={user}
                        onClose={() => setDeleteDialogOpen(false)}
                        language={language}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CharacterDropdownMenu;
