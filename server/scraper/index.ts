import { Spell, SpellSchema } from "@/type/Spell";
import fs from "fs";

const IN_FILE = "server/scraper/spells.json";
const OUT_FILE = "server/scraper/resultSpells.json";

const getSpellInformation = async (spellId: string) => {
    const res = await fetch(`https://www.dnd5eapi.co/api/spells/${spellId}`);
    const data = await res.json();

    try {
        const damage = data.damage
            ? {
                  type: data.damage?.damage_type,
                  slotLevel: data.damage?.damage_at_slot_level,
                  characterLevel: data.damage?.damage_at_character_level,
              }
            : undefined;

        const difficultyClass = data.dc
            ? {
                  type: data.dc?.dc_type,
                  success: data.dc?.dc_success,
                  description: data.dc?.desc,
              }
            : undefined;

        const spell = SpellSchema.parse({
            ...data,
            description: data.desc,
            highLevelDescription: data.higher_level,
            areaOfEffect: data.area_of_effect,
            castingTime: data.casting_time,
            attackType: data.attack_type,
            damage,
            difficultyClass,
        }) as Spell;

        return spell;
    } catch (e) {
        console.log(data);
        console.log(e);
        console.error(JSON.stringify(e));
        throw new Error("Failed to parse spell");
    }
};

const getAllSpells = async () => {
    const data = fs.readFileSync(IN_FILE, "utf8");
    const spells = JSON.parse(data);
    const parsedSpells: Spell[] = [];
    let index = 0;

    for (const spell of spells.items) {
        index++;
        console.log(`Parsing spell ${index}/${spells.items.length}: ${spell.name}`);
        await new Promise((resolve) => setTimeout(resolve, Math.random() * 200));

        const parsedSpell = await getSpellInformation(spell.index);
        parsedSpell && parsedSpells.push(parsedSpell);
    }

    fs.writeFileSync(OUT_FILE, JSON.stringify(parsedSpells, null, 2));
};

const getEnumValues = async () => {
    const data = fs.readFileSync(OUT_FILE, "utf8");
    const spells = JSON.parse(data);

    const Component = new Set();
    const AreaOfEffectType = new Set();
    const Class = new Set();
    const Subclass = new Set();
    const School = new Set();
    const DamageType = new Set();
    const DifficultyClassType = new Set();

    for (const spell of spells) {
        const parsedSpell = SpellSchema.parse(spell);

        for (const component of parsedSpell.components) Component.add(component);
        if (parsedSpell.areaOfEffect) AreaOfEffectType.add(parsedSpell.areaOfEffect.type);
        for (const cls of parsedSpell.classes) Class.add(cls.index);
        for (const subclass of parsedSpell.subclasses) Subclass.add(subclass.index);
        School.add(parsedSpell.school.index);
        if (parsedSpell.damage && parsedSpell.damage.type) DamageType.add(parsedSpell.damage.type.index);
        if (parsedSpell.difficultyClass) DifficultyClassType.add(parsedSpell.difficultyClass.type.index);
    }

    console.log("Component", Array.from(Component));
    console.log("AreaOfEffectType", Array.from(AreaOfEffectType));
    console.log("Class", Array.from(Class));
    console.log("Subclass", Array.from(Subclass));
    console.log("School", Array.from(School));
    console.log("DamageType", Array.from(DamageType));
    console.log("DifficultyClassType", Array.from(DifficultyClassType));
};

const execute = async () => {
    await getAllSpells();
    await getEnumValues();
};

execute();
