import FileService from "./utils/FileService";

interface Cell {
    row: number;
    col: number;
}

interface SignCell extends Cell {
    value: string;
}

interface NumberCell extends Cell {
    nLength: number;
    value: number;
}

interface NumberCellWithGear extends NumberCell {
    gear?: SignCell;
}

const fileService = new FileService();

const fileContent = fileService.getFileContentRows("day3_input1.txt");
const fileContentCells = fileService.getFileContentCells("day3_input1.txt");

const MAX_ROW_INDEX = fileContent.length;
const MAX_COL_INDEX = fileContent.length;

const allSignsCells: SignCell[] = [];
const allNumbersCells: NumberCellWithGear[] = [];

fileContentCells.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
        if ("/=+*$%&@#-".includes(cell)) {
            allSignsCells.push({ row: rowIndex, col: colIndex, value: cell });
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

    if (foundSignCell?.value === "*") {
        numberCell.gear = foundSignCell;
    }
});

let answer = 0;

console.log(allNumbersCells.length);

for (let i = 0; i < allNumbersCells.length; i++) {
    for (let j = 1 + i; j < allNumbersCells.length; j++) {
        const thisCell = allNumbersCells[i];
        const nextCell = allNumbersCells[j];
        const thisGear = thisCell.gear;
        const nextGear = nextCell.gear;
        if (!thisGear || !nextGear) continue;
        if (thisGear.col == nextGear.col && thisGear.row == nextGear.row) {
            answer += thisCell.value * nextCell.value;
            break;
        }
    }
}

console.log(answer);
