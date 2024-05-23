import { DICE_REGEX, Dice, diceBackgroundColor, diceColor } from "@/type/Dice";
import { convertHtmlToReact } from "@hedgedoc/html-to-react";
import reactElementToJSXString from "react-element-to-jsx-string";
import uuid from "react-uuid";
import { cn } from "./util";

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

            newParagraph += `${textBeforeMatch}${diceTextToWidget(match)}${textAfterMatch ? textAfterMatch : " "}`;
        }
    }

    if (paragraphPart) pushToParagraph(paragraphPart);

    return convertHtmlToReact(newParagraph);
};
