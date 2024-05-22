import { ReactElement } from "react";
import uuid from "react-uuid";
import { cn } from "./util";

export const DICE_REGEX = /\(?\d+\s*[dD](?:4|6|8|10|12|20)\)?/g;
const ALPHANUMERIC_REGEX = /[^a-zA-Z0-9]/g;

// TODO update toparse the html of the text

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

const diceImage: Record<Dice, ReactElement> = {
    [Dice.D4]: (
        <span
            className={cn(
                "absolute top-1/2 inline-block h-7 max-h-7 min-h-7 w-7 min-w-7 max-w-7 -translate-y-1/2 bg-cover",
                diceBackgroundColor[Dice.D4],
            )}
            style={{ maskImage: "url(/dice/D4.png)", maskMode: "alpha", maskSize: "cover" }}
        />
    ),
    [Dice.D6]: (
        <span
            className={cn(
                "absolute top-1/2 inline-block h-7 max-h-7 min-h-7 w-7 min-w-7 max-w-7 -translate-y-1/2 bg-cover",
                diceBackgroundColor[Dice.D6],
            )}
            style={{ maskImage: "url(/dice/D6.png)", maskMode: "alpha", maskSize: "cover" }}
        />
    ),
    [Dice.D8]: (
        <span
            className={cn(
                "absolute top-1/2 inline-block h-7 max-h-7 min-h-7 w-7 min-w-7 max-w-7 -translate-y-1/2 bg-cover",
                diceBackgroundColor[Dice.D8],
            )}
            style={{ maskImage: "url(/dice/D8.png)", maskMode: "alpha", maskSize: "cover" }}
        />
    ),
    [Dice.D10]: (
        <span
            className={cn(
                "absolute top-1/2 inline-block h-7 max-h-7 min-h-7 w-7 min-w-7 max-w-7 -translate-y-1/2 bg-cover",
                diceBackgroundColor[Dice.D10],
            )}
            style={{ maskImage: "url(/dice/D10.png)", maskMode: "alpha", maskSize: "cover" }}
        />
    ),
    [Dice.D12]: (
        <span
            className={cn(
                "absolute top-1/2 inline-block h-7 max-h-7 min-h-7 w-7 min-w-7 max-w-7 -translate-y-1/2 bg-cover",
                diceBackgroundColor[Dice.D12],
            )}
            style={{ maskImage: "url(/dice/D12.png)", maskMode: "alpha", maskSize: "cover" }}
        />
    ),
    [Dice.D20]: (
        <span
            className={cn(
                "absolute top-1/2 inline-block h-7 max-h-7 min-h-7 w-7 min-w-7 max-w-7 -translate-y-1/2 bg-cover",
                diceBackgroundColor[Dice.D20],
            )}
            style={{ maskImage: "url(/dice/D20.png)", maskMode: "alpha", maskSize: "cover" }}
        />
    ),
};

export const diceTextToWidget = (diceText: string) => {
    let startRemovedChars = "";
    let endRemovedChars = "";

    const cleanedText = diceText.replace(ALPHANUMERIC_REGEX, (match) => {
        if (startRemovedChars.length < diceText.length && diceText.indexOf(match) === 0) startRemovedChars += match;
        else endRemovedChars += match;
        return "";
    });

    const [number, sides] = cleanedText.toUpperCase().split("D");
    const dice: Dice = `D${sides}` as Dice;

    return (
        <span className="relative inline-block whitespace-nowrap" key={uuid()}>
            <span className={cn("text-sm opacity-80")}>{startRemovedChars}</span>
            {diceImage[dice]}
            <span className={cn("ml-8 text-sm font-bold tracking-wide", diceColor[dice])}>{number}</span>
            <span className={cn("text-sm opacity-80")}>D</span>
            <span className={cn("text-sm font-bold tracking-wide", diceColor[dice])}>{sides}</span>
            <span className={cn("mr-[5px] text-sm opacity-80")}>{endRemovedChars}</span>
        </span>
    );
};

export const parseParagraphsWithDice = (paragraph: string) => {
    const newParagraph: ReactElement[] = [];
    let paragraphPart = "";

    const pushToParagraph = (text: string) => {
        newParagraph.push(
            <span className="opacity-80" key={uuid()}>
                {text}
            </span>,
        );
        paragraphPart = "";
    };

    for (const word of paragraph.split(" ")) {
        if (!DICE_REGEX.test(word)) paragraphPart += word + " ";
        else {
            if (paragraphPart) pushToParagraph(paragraphPart);
            newParagraph.push(diceTextToWidget(word));
        }
    }

    if (paragraphPart) pushToParagraph(paragraphPart);

    return newParagraph;
};
