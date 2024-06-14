import { updateSpell } from "@/server/repo/spell";
import { deleteTranslation, updateTranslation } from "@/server/repo/translation";
import { DbSpell, Spell } from "@/type/Spell";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Mutation {
    originalSpell: Spell;
    spell: Spell;
    userId: number;
}

const updateSpellWithTranslations = async ({ originalSpell, spell, userId }: Mutation) => {
    const nameId = (await updateTranslation({
        id: spell.name.id,
        en: spell.name.en,
        es: spell.name.es,
    }))!;
    const descriptionId = (await updateTranslation({
        id: spell.description.id,
        en: spell.description.en,
        es: spell.description.es,
    }))!;

    const highLevelDescriptionId = spell.highLevelDescription
        ? await updateTranslation({
              id: spell.highLevelDescription.id,
              en: spell.highLevelDescription.en,
              es: spell.highLevelDescription.es,
          })
        : null;

    const materialId = spell.material
        ? await updateTranslation({
              id: spell.material.id,
              en: spell.material.en,
              es: spell.material.es,
          })
        : null;

    const dbSpell: DbSpell = {
        ...spell,
        nameId,
        descriptionId,
        highLevelDescriptionId,
        materialId,
        userId,
    };

    await updateSpell(dbSpell);

    if (!spell.highLevelDescription && originalSpell.highLevelDescription)
        await deleteTranslation(originalSpell.highLevelDescription.id);

    if (!spell.material && originalSpell.material) await deleteTranslation(originalSpell.material.id);
};

export const useUpdateSpell = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateSpellWithTranslations,
        onMutate: async ({ spell, userId }) => {
            await queryClient.cancelQueries({ queryKey: ["userSpells", userId] });
            const previousData: Spell[] | undefined = queryClient.getQueryData(["userSpells", userId]);

            const newData: Spell[] | undefined = previousData
                ? [...previousData].map((currentSpell) => (currentSpell.index === spell.index ? spell : currentSpell))
                : undefined;

            queryClient.setQueryData(["userSpells", userId], newData);

            return { previousData };
        },
        onError: (err, { userId }, context) => {
            context && queryClient.setQueryData(["userSpells", userId], context.previousData);
        },
        onSettled: (returnedData, error, { userId }) => {
            queryClient.invalidateQueries({ queryKey: ["userSpells", userId] });
        },
    });
};
