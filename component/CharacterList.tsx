"use client";

import CharacterItem from "@/component/CharacterItem";
import CreateCharacterForm from "@/component/CreateCharacterForm";
import { Button } from "@/component/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/component/ui/dialog";
import { useTranslation } from "@/hook/useTranslation";
import { GetUserCharactersReturnType, useCharacters } from "@/server/use/useCharacters";
import { Language } from "@/type/Language";
import { User } from "@/type/User";
import { LuPlus } from "react-icons/lu";

interface Props {
    language: Language;
    initialCharacterData: GetUserCharactersReturnType;
    user: User;
}

const CharacterList = ({ language, initialCharacterData, user }: Props) => {
    const { t } = useTranslation(language);

    const characters = useCharacters(user.email, initialCharacterData);

    return (
        <section className="relative flex h-fit min-h-full w-full max-w-screen-lg flex-col gap-4 p-4">
            <Dialog>
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

                    <div className="grid w-full gap-4 py-4">
                        <CreateCharacterForm user={user} language={language} />
                    </div>
                </DialogContent>
            </Dialog>

            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                {characters.data.map((character) => (
                    <CharacterItem key={character.id} character={character} language={language} />
                ))}
            </div>
        </section>
    );
};

export default CharacterList;
