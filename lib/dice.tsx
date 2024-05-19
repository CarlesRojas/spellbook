import { ReactElement } from "react";
import uuid from "react-uuid";
import { cn } from "./util";

export const DICE_REGEX = /\(?\d+\s*[dD](?:4|6|8|10|12|20)\)?/g;
const ONLY_ALPHANUMERIC_REGEX = /[^a-zA-Z0-9]/g;

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

export const diceImage: Record<Dice, ReactElement> = {
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

    const cleanedText = diceText.replace(ONLY_ALPHANUMERIC_REGEX, (match) => {
        if (startRemovedChars.length < diceText.length && diceText.indexOf(match) === 0) startRemovedChars += match;
        else endRemovedChars += match;
        return "";
    });

    const uppercaseDiceText = cleanedText.toUpperCase();
    const diceTextParts = uppercaseDiceText.split("D");
    const [number, sides] = diceTextParts;
    const dice = `D${sides}` as Dice;

    return (
        <span className="relative inline" key={uuid()}>
            <span className={cn("text-sm opacity-75")}>{startRemovedChars}</span>
            {diceImage[dice]}
            <span className={cn("ml-8 text-sm font-bold tracking-wide", diceColor[dice])}>{number}</span>
            <span className={cn("text-sm opacity-75")}>D</span>
            <span className={cn("text-sm font-bold tracking-wide", diceColor[dice])}>{sides}</span>
            <span className={cn("text-sm opacity-75")}>{endRemovedChars}</span>{" "}
        </span>
    );
};

export const parceParagraphsWithDice = (paragraph: string) => {
    const newParagraph: ReactElement[] = [];

    let paragraphPart = "";
    for (const word of paragraph.split(" ")) {
        if (!DICE_REGEX.test(word)) paragraphPart += word + " ";
        else {
            if (paragraphPart) {
                newParagraph.push(
                    <span className="opacity-75" key={uuid()}>
                        {paragraphPart}
                    </span>,
                );
                paragraphPart = "";
            }

            const dice = diceTextToWidget(word);
            newParagraph.push(dice);
        }
    }

    if (paragraphPart)
        newParagraph.push(
            <span className="opacity-75" key={uuid()}>
                {paragraphPart}
            </span>,
        );

    return newParagraph;
};
