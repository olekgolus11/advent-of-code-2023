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
const allMergedNumbers = fileContentArray.map((row) => {
    const digitsInARow = String(row).match(/\d/g);
    const firstNumber = String(digitsInARow[0]);
    const lastNumber = String(digitsInARow[digitsInARow.length - 1]);
    const mergedNumber = Number(firstNumber + lastNumber);
    return mergedNumber;
});
const answer = allMergedNumbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
}, 0);
console.log(answer);
