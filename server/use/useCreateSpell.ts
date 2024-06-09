import { createSpell } from "@/server/repo/spell";
import { createTranslation } from "@/server/repo/translation";
import { DbSpell, Spell } from "@/type/Spell";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Mutation {
    spell: Spell;
    userId: number;
}

const createSpellWithTranslations = async ({ spell, userId }: Mutation) => {
    const nameId = (await createTranslation({
        en: spell.name.en,
        es: spell.name.es,
    }))!;
    const descriptionId = (await createTranslation({
        en: spell.description.en,
        es: spell.description.es,
    }))!;

    const highLevelDescriptionId = spell.highLevelDescription
        ? await createTranslation({
              en: spell.highLevelDescription.en,
              es: spell.highLevelDescription.es,
          })
        : null;

    const materialId = spell.material
        ? await createTranslation({
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

    await createSpell(dbSpell);
};

export const useCreateSpell = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createSpellWithTranslations,
        onMutate: async ({ spell, userId }) => {
            await queryClient.cancelQueries({ queryKey: ["spells", userId] });
            await queryClient.cancelQueries({ queryKey: ["userSpells", userId] });
            const previousSpellsData: Spell[] | undefined = queryClient.getQueryData(["spells", userId]);
            const previousMySpellsData: Spell[] | undefined = queryClient.getQueryData(["userSpells", userId]);

            const newSpellsData: Spell[] | undefined = previousSpellsData ? [spell, ...previousSpellsData] : undefined;
            const newMySpellsData: Spell[] | undefined = previousMySpellsData
                ? [spell, ...previousMySpellsData]
                : undefined;

            queryClient.setQueryData(["spells", userId], newSpellsData);
            queryClient.setQueryData(["userSpells", userId], newMySpellsData);

            return { previousSpellsData, previousMySpellsData };
        },
        onError: (err, { userId }, context) => {
            context && queryClient.setQueryData(["spells", userId], context.previousSpellsData);
            context && queryClient.setQueryData(["userSpells", userId], context.previousMySpellsData);
        },
        onSettled: (returnedData, error, { userId }) => {
            queryClient.invalidateQueries({ queryKey: ["spells", userId] });
            queryClient.invalidateQueries({ queryKey: ["userSpells", userId] });
        },
    });
};
