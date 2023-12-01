import * as fs from "node:fs";

let fileContent: string;
let fileContentArray: string[] = [];
try {
    fileContent = fs.readFileSync("input-files/day1_input1.txt", "utf-8");
    fileContentArray = fileContent.split("\n");
} catch (error) {
    console.error(error);
}

const textNumbersDictionary = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};

const allMergedNumbers = fileContentArray.map((row) => {
    const leftDigitAsText = String(row).match(/(?:\d|one|two|three|four|five|six|seven|eight|nine)/)![0];
    const rightDigitAsText = String(row.split("").reverse().join("")).match(/(?:\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/)![0];
    console.log("\n");
    console.log(leftDigitAsText, rightDigitAsText);
    const leftDigitAsNumber = isNaN(leftDigitAsText as any)
        ? textNumbersDictionary[leftDigitAsText as keyof typeof textNumbersDictionary]
        : Number(leftDigitAsText);
    const rightDigitAsNumber = isNaN(rightDigitAsText as any)
        ? textNumbersDictionary[rightDigitAsText.split("").reverse().join("") as keyof typeof textNumbersDictionary]
        : Number(rightDigitAsText);
    console.log(leftDigitAsNumber, rightDigitAsNumber);

    const mergedNumber = Number(String(leftDigitAsNumber) + String(rightDigitAsNumber));
    console.log(mergedNumber);
    return mergedNumber;
});

const answer = allMergedNumbers.reduce((accumulator: number, currentValue: number) => {
    return accumulator + currentValue;
}, 0);

console.log(answer);
