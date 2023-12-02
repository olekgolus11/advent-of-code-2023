"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileService_1 = __importDefault(require("./utils/FileService"));
const fileService = new FileService_1.default();
const fileContent = fileService.getFileContentRows("day2_input1.txt");
let answer = 0;
fileContent.forEach((row) => {
    const [gameIndexString, allSets] = row.split("Game")[1].split(":");
    const gameIndex = Number(gameIndexString);
    const allSetsAsArray = allSets.split(";").map((set) => set.split(",").map((oneThrow) => oneThrow.trim())); //Array of arrays of strings
    const allSetsCheckedIsValid = allSetsAsArray.map((set) => {
        const gameSet = {
            blue: 0,
            red: 0,
            green: 0,
        };
        set.forEach((oneThrow) => {
            const [numerOfCubes, color] = oneThrow.split(" ");
            gameSet[color] += Number(numerOfCubes);
        });
        if (gameSet.blue <= 14 && gameSet.green <= 13 && gameSet.red <= 12)
            return true;
        else
            return false;
    });
    if (!allSetsCheckedIsValid.includes(false)) {
        answer += gameIndex;
    }
});
console.log(answer);
