import FileService from "./utils/FileService";

interface Cell {
    row: number;
    col: number;
}

interface NumberCell extends Cell {
    nLength: number;
    value: number;
}

const fileService = new FileService();

const fileContent = fileService.getFileContentRows("day3_input1.txt");
const fileContentCells = fileService.getFileContentCells("day3_input1.txt");

const MAX_ROW_INDEX = fileContent.length;
const MAX_COL_INDEX = fileContent.length;

const allSignsCells: Cell[] = [];
const allNumbersCells: NumberCell[] = [];

fileContentCells.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
        if ("/=+*$%&@#-".includes(cell)) {
            allSignsCells.push({ row: rowIndex, col: colIndex });
        }
    });
});

fileContent.forEach((row, rowIndex) => {
    const reg = RegExp(/\d+/, "g");
    let rowCopy = row.slice();
    let foundNumberInfo: any;

    while ((foundNumberInfo = reg.exec(rowCopy)) != null) {
        const currentNumberCell: NumberCell = {
            row: rowIndex,
            col: Number(foundNumberInfo.index),
            value: Number(foundNumberInfo[0]),
            nLength: String(foundNumberInfo).split("").length,
        };
        allNumbersCells.push(currentNumberCell);
    }
});

let answer = 0;

allNumbersCells.forEach((numberCell) => {
    const topLeftCell: Cell = {
        row: numberCell.row > 0 ? numberCell.row - 1 : 0,
        col: numberCell.col > 0 ? numberCell.col - 1 : 0,
    };
    const bottomRightCell: Cell = {
        row: numberCell.row < MAX_ROW_INDEX ? numberCell.row + 1 : numberCell.row,
        col: numberCell.col + numberCell.nLength < MAX_COL_INDEX ? numberCell.col + numberCell.nLength : numberCell.col + numberCell.nLength - 1,
    };

    const foundSignCell = allSignsCells.find((signCell) => {
        const isWithinRowRange = signCell.row >= topLeftCell.row && signCell.row <= bottomRightCell.row;
        const isWithinColRange = signCell.col >= topLeftCell.col && signCell.col <= bottomRightCell.col;
        return isWithinRowRange && isWithinColRange;
    });

    // console.log("\n\n");
    // console.log("numberCell: ", numberCell);
    // console.log("topLeftCell: ", topLeftCell);
    // console.log("bottomRightCell: ", bottomRightCell);
    // console.log("foundSignCell: ", foundSignCell);

    if (foundSignCell != undefined) {
        answer += numberCell.value;
    }
});

console.log(answer);
