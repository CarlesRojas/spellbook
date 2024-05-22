import { convertHtmlToReact } from "@hedgedoc/html-to-react";
import reactElementToJSXString from "react-element-to-jsx-string";
import uuid from "react-uuid";
import { cn } from "./util";

export const DICE_REGEX = /\d+\s*[dD](?:4|6|8|10|12|20)/g;

export enum Dice {
    D4 = "D4",
    D6 = "D6",
    D8 = "D8",
    D10 = "D10",
    D12 = "D12",
    D20 = "D20",
}

const diceBackgroundColor: Record<Dice, string> = {
    [Dice.D4]: "bg-purple-500",
    [Dice.D6]: "bg-sky-500",
    [Dice.D8]: "bg-green-500",
    [Dice.D10]: "bg-yellow-500",
    [Dice.D12]: "bg-orange-500",
    [Dice.D20]: "bg-red-500",
};

const diceColor: Record<Dice, string> = {
    [Dice.D4]: "text-purple-500",
    [Dice.D6]: "text-sky-500",
    [Dice.D8]: "text-green-500",
    [Dice.D10]: "text-yellow-500",
    [Dice.D12]: "text-orange-500",
    [Dice.D20]: "text-red-500",
};

export const diceTextToWidget = (diceText: string) => {
    const [number, sides] = diceText.toUpperCase().split("D");
    const dice: Dice = `D${sides}` as Dice;

    return reactElementToJSXString(
        <span className="relative mr-[2px] inline-block whitespace-nowrap" key={uuid()}>
            <span
                className={cn(
                    `dice_${dice} absolute top-1/2 inline-block h-7 max-h-7 min-h-7 w-7 min-w-7 max-w-7 -translate-y-1/2 select-none bg-cover text-transparent`,
                    diceBackgroundColor[dice],
                )}
            >
                .
            </span>
            <span className={cn("ml-[30px] text-sm font-bold tracking-wide", diceColor[dice])}>{number}</span>
            <span className={cn("-ml-[3px] -mr-[2px] text-sm opacity-80")}>D</span>
            <span className={cn("text-sm font-bold tracking-wide", diceColor[dice])}>{sides}</span>
        </span>,
    );
};

export const parseParagraphsWithDice = (text: string) => {
    let newParagraph = "";
    let paragraphPart = "";

    const pushToParagraph = (text: string) => {
        newParagraph += text;
        paragraphPart = "";
    };

    for (const word of text.split(" ")) {
        const match = word.match(DICE_REGEX)?.[0];

        if (!match) paragraphPart += word + " ";
        else {
            if (paragraphPart) pushToParagraph(paragraphPart);

            const textBeforeMatch = word.slice(0, word.indexOf(match));
            const textAfterMatch = word.slice(word.indexOf(match) + match.length);
            console.log(textBeforeMatch, match, textAfterMatch);

            newParagraph += `${textBeforeMatch}${diceTextToWidget(match)}${textAfterMatch ? textAfterMatch : " "}`;
        }
    }

    if (paragraphPart) pushToParagraph(paragraphPart);

    return convertHtmlToReact(newParagraph);
};
