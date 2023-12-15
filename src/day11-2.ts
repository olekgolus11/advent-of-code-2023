import FileService from "./utils/FileService";
import fs from "fs";

interface GalaxyCoordinates {
    row: number;
    column: number;
}

const findAllShortestPaths = (galaxyCoordinates: GalaxyCoordinates[]) => {
    let sumOfShortestPaths = 0;
    for (let i = 0; i < galaxyCoordinates.length; i++) {
        for (let j = 1 + i; j < galaxyCoordinates.length; j++) {
            const galaxy1 = galaxyCoordinates[i];
            const galaxy2 = galaxyCoordinates[j];
            const shortestPath = Math.abs(galaxy1.row - galaxy2.row) + Math.abs(galaxy1.column - galaxy2.column);
            sumOfShortestPaths += shortestPath;
        }
    }
    return sumOfShortestPaths;
};

const fileService = new FileService();

const fileContent = fileService.getFileContentCells("input11.txt", "");

let cosmicSpace = fileContent;

const rowIndexesToInputRowInto: number[] = [];
const columnIndexesToInputRowInto: number[] = [];

//finding empty rows
cosmicSpace.forEach((row, rowIndex) => {
    const foundGalaxy = row.find((cell) => cell === "#");
    if (!foundGalaxy) {
        rowIndexesToInputRowInto.push(rowIndex);
    }
});

//finding empty columns
for (let col = 0; col < cosmicSpace[0].length; col++) {
    let isAnyGalaxy = false;
    for (let row = 0; row < cosmicSpace.length; row++) {
        if (cosmicSpace[row][col] === "#") {
            isAnyGalaxy = true;
        }
    }
    if (!isAnyGalaxy) {
        columnIndexesToInputRowInto.push(col);
    }
}

console.log(rowIndexesToInputRowInto);
console.log(columnIndexesToInputRowInto);

//find all galaxy coordinates
const galaxyCoordinates: GalaxyCoordinates[] = [];
cosmicSpace.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
        if (cell === "#") {
            const amountOfRowsToInsert =
                rowIndexesToInputRowInto.filter((rowIndexToInputRowInto) => rowIndexToInputRowInto < rowIndex).length * (1000000 - 1);
            const amountOfColumnsToInsert =
                columnIndexesToInputRowInto.filter((columnIndexToInputRowInto) => columnIndexToInputRowInto < columnIndex).length * (1000000 - 1);

            galaxyCoordinates.push({ row: rowIndex + amountOfRowsToInsert, column: columnIndex + amountOfColumnsToInsert });
        }
    });
});

const sumOfShortestPaths = findAllShortestPaths(galaxyCoordinates);

console.log(galaxyCoordinates);

console.log(sumOfShortestPaths);
