"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("node:fs"));
let fileContent;
let fileContentArray = [];
try {
    fileContent = fs.readFileSync("input-files/day1_input1.txt", "utf-8");
    fileContentArray = fileContent.split("\n");
}
catch (error) {
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
