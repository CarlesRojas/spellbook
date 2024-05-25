"use client";

import CharacterItem from "@/component/character/CharacterItem";
import CreateCharacterForm from "@/component/character/CreateCharacterForm";
import { Button } from "@/component/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/component/ui/dialog";
import { useTranslation } from "@/hook/useTranslation";
import { useUserCharacters } from "@/server/use/useUserCharacters";
import { Language } from "@/type/Language";
import { User } from "@/type/User";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";

interface Props {
    language: Language;
    user: User;
}

const CharacterList = ({ language, user }: Props) => {
    const { t } = useTranslation(language);

    const characters = useUserCharacters(user.email);

    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    return (
        <section className="relative flex h-fit min-h-full w-full max-w-screen-lg flex-col gap-4 p-4">
            <div className="sticky top-4 z-10 mouse:top-20">
                <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <LuPlus className="mr-3 h-4 w-4 stroke-[3]" />
                            {t.dnd.character.createCharacter}
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{t.dnd.character.createCharacter}</DialogTitle>
                        </DialogHeader>

                        <CreateCharacterForm
                            user={user}
                            language={language}
                            onClose={() => setCreateDialogOpen(false)}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                {characters.isLoading &&
                    Array.from({ length: 5 }).map((_, index) => (
                        <CharacterItem isLoading key={index} user={user} language={language} />
                    ))}

                {characters.data &&
                    characters.data.map((character) => (
                        <CharacterItem
                            disabled={character.id === -1}
                            key={character.id}
                            character={character}
                            user={user}
                            language={language}
                        />
                    ))}
            </div>
        </section>
    );
};

export default CharacterList;
