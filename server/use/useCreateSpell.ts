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
        index: `user-${userId}-spell-${spell.name.en
            .replace(" ", "-")
            .replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase()}`,
        nameId,
        descriptionId,
        highLevelDescriptionId,
        materialId,
        userId,
    };

    await createSpell(dbSpell);
};

export const FAKE_ID = "10c9d5ee-396a-4094-8f13-7e5628ebd4ba";

export const useCreateSpell = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createSpellWithTranslations,
        onMutate: async ({ spell, userId }) => {
            await queryClient.cancelQueries({ queryKey: ["userSpells", userId] });
            const previousData: Spell[] | undefined = queryClient.getQueryData(["userSpells", userId]);

            const newData: Spell[] | undefined = previousData
                ? [{ ...spell, index: FAKE_ID }, ...previousData]
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
