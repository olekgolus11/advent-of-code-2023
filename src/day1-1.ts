import * as fs from "node:fs";

let fileContent: string;
let fileContentArray: string[] = [];
try {
    fileContent = fs.readFileSync("input-files/day1_input1.txt", "utf-8");
    fileContentArray = fileContent.split("\n");
} catch (error) {
    console.error(error);
}

const allMergedNumbers = fileContentArray.map((row) => {
    const digitsInARow = String(row).match(/\d/g);
    const firstNumber: string = String(digitsInARow![0]);
    const lastNumber: string = String(digitsInARow![digitsInARow!.length - 1]);
    const mergedNumber = Number(firstNumber + lastNumber);
    return mergedNumber;
});

const answer = allMergedNumbers.reduce((accumulator: number, currentValue: number) => {
    return accumulator + currentValue;
}, 0);

console.log(answer);
