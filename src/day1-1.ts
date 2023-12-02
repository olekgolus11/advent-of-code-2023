import FileService from "./utils/FileService";

const fileService = new FileService();

const fileContent = fileService.getFileContentRows("day1_input1.txt");

const allMergedNumbers = fileContent.map((row) => {
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
