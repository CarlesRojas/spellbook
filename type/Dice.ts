export const DICE_REGEX = /\d+\s*[dD](?:4|6|8|10|12|20)/g;

export enum Dice {
    D4 = "D4",
    D6 = "D6",
    D8 = "D8",
    D10 = "D10",
    D12 = "D12",
    D20 = "D20",
}

export const diceBackgroundColor: Record<Dice, string> = {
    [Dice.D4]: "bg-purple-500",
    [Dice.D6]: "bg-sky-500",
    [Dice.D8]: "bg-green-500",
    [Dice.D10]: "bg-yellow-500",
    [Dice.D12]: "bg-orange-500",
    [Dice.D20]: "bg-red-500",
};

export const diceColor: Record<Dice, string> = {
    [Dice.D4]: "text-purple-500",
    [Dice.D6]: "text-sky-500",
    [Dice.D8]: "text-green-500",
    [Dice.D10]: "text-yellow-500",
    [Dice.D12]: "text-orange-500",
    [Dice.D20]: "text-red-500",
};
