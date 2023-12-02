"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileService_1 = __importDefault(require("./utils/FileService"));
const fileService = new FileService_1.default();
let fileContent = fileService.getFileContentRows("day1_input1.txt");
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
const allMergedNumbers = fileContent.map((row) => {
    const leftDigitAsText = String(row).match(/(?:\d|one|two|three|four|five|six|seven|eight|nine)/)[0];
    const rightDigitAsText = String(row.split("").reverse().join("")).match(/(?:\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/)[0];
    console.log("\n");
    console.log(leftDigitAsText, rightDigitAsText);
    const leftDigitAsNumber = isNaN(leftDigitAsText)
        ? textNumbersDictionary[leftDigitAsText]
        : Number(leftDigitAsText);
    const rightDigitAsNumber = isNaN(rightDigitAsText)
        ? textNumbersDictionary[rightDigitAsText.split("").reverse().join("")]
        : Number(rightDigitAsText);
    console.log(leftDigitAsNumber, rightDigitAsNumber);
    const mergedNumber = Number(String(leftDigitAsNumber) + String(rightDigitAsNumber));
    console.log(mergedNumber);
    return mergedNumber;
});
const answer = allMergedNumbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
}, 0);
console.log(answer);
