// import FileService from "./utils/FileService";

// enum Tile {
//     ROUNDED_ROCK = "O",
//     CUBE_ROCK = "#",
//     EMPTY_SPACE = ".",
// }

// const fileService = new FileService();

// const field = fileService.getFileContentCells("input14.txt");

// const isEmptySpaceAbove = (rowIndex: number, colIndex: number) => {
//     if (rowIndex === 0) return false;
//     return field[rowIndex - 1][colIndex] === Tile.EMPTY_SPACE;
// };

// const isEmptySpaceLeft = (rowIndex: number, colIndex: number) => {
//     if (colIndex === 0) return false;
//     return field[rowIndex][colIndex - 1] === Tile.EMPTY_SPACE;
// };

// const isEmptySpaceRight = (rowIndex: number, colIndex: number) => {
//     if (colIndex === field[0].length - 1) return false;
//     return field[rowIndex][colIndex + 1] === Tile.EMPTY_SPACE;
// };

// const isEmptySpaceBelow = (rowIndex: number, colIndex: number) => {
//     if (rowIndex === field.length - 1) return false;
//     return field[rowIndex + 1][colIndex] === Tile.EMPTY_SPACE;
// };

// const slideRockUp = (rowIndex: number, colIndex: number) => {
//     if (rowIndex === 0) return;
//     field[rowIndex - 1][colIndex] = Tile.ROUNDED_ROCK;
//     field[rowIndex][colIndex] = Tile.EMPTY_SPACE;
// };

// const slideRockLeft = (rowIndex: number, colIndex: number) => {
//     if (colIndex === 0) return;
//     field[rowIndex][colIndex - 1] = Tile.ROUNDED_ROCK;
//     field[rowIndex][colIndex] = Tile.EMPTY_SPACE;
// };

// const slideRockRight = (rowIndex: number, colIndex: number) => {
//     if (colIndex === field[0].length - 1) return;
//     field[rowIndex][colIndex + 1] = Tile.ROUNDED_ROCK;
//     field[rowIndex][colIndex] = Tile.EMPTY_SPACE;
// };

// const slideRockDown = (rowIndex: number, colIndex: number) => {
//     if (rowIndex === field.length - 1) return;
//     field[rowIndex + 1][colIndex] = Tile.ROUNDED_ROCK;
//     field[rowIndex][colIndex] = Tile.EMPTY_SPACE;
// };

// const didFieldChange = (fieldBefore: string[][]) => {
//     const fieldAfter = field.map((row) => [...row]);
//     for (let i = 0; i < field.length; i++) {
//         if (fieldBefore[i].join("") !== fieldAfter[i].join("")) return true;
//     }
//     return false;
// };

// const spinAllRocksOnce = () => {
//     let isFieldChanged = true;

//     while (isFieldChanged) {
//         const fieldBefore = field.map((row) => [...row]);

//         field.forEach((row, rowIndex) => {
//             row.forEach((tile, colIndex) => {
//                 const thisTile = tile as Tile;

//                 if (thisTile !== Tile.ROUNDED_ROCK) return;

//                 if (isEmptySpaceAbove(rowIndex, colIndex)) {
//                     slideRockUp(rowIndex, colIndex);
//                 }
//             });
//         });
//         isFieldChanged = didFieldChange(fieldBefore);
//     }

//     isFieldChanged = true;

//     while (isFieldChanged) {
//         const fieldBefore = field.map((row) => [...row]);
//         field.forEach((row, rowIndex) => {
//             row.forEach((tile, colIndex) => {
//                 const thisTile = tile as Tile;

//                 if (thisTile !== Tile.ROUNDED_ROCK) return;

//                 if (isEmptySpaceLeft(rowIndex, colIndex)) {
//                     slideRockLeft(rowIndex, colIndex);
//                 }
//             });
//         });
//         isFieldChanged = didFieldChange(fieldBefore);
//     }

//     isFieldChanged = true;

//     while (isFieldChanged) {
//         const fieldBefore = field.map((row) => [...row]);
//         field.forEach((row, rowIndex) => {
//             row.forEach((tile, colIndex) => {
//                 const thisTile = tile as Tile;

//                 if (thisTile !== Tile.ROUNDED_ROCK) return;

//                 if (isEmptySpaceBelow(rowIndex, colIndex)) {
//                     slideRockDown(rowIndex, colIndex);
//                 }
//             });
//         });
//         isFieldChanged = didFieldChange(fieldBefore);
//     }

//     isFieldChanged = true;

//     while (isFieldChanged) {
//         const fieldBefore = field.map((row) => [...row]);
//         field.forEach((row, rowIndex) => {
//             row.forEach((tile, colIndex) => {
//                 const thisTile = tile as Tile;

//                 if (thisTile !== Tile.ROUNDED_ROCK) return;

//                 if (isEmptySpaceRight(rowIndex, colIndex)) {
//                     slideRockRight(rowIndex, colIndex);
//                 }
//             });
//         });
//         isFieldChanged = didFieldChange(fieldBefore);
//     }
// };
// const numberOfRows = field.length;

// const allRecords: number[] = [];

// // loop till pattern
// let loopLength = 908;
// for (let i = 0; i < loopLength; i++) {
//     spinAllRocksOnce();
//     let record = 0;
//     field.forEach((row, index) => {
//         const rowValue = numberOfRows - index;
//         const numberOfRoundedRocks = row.filter((tile) => tile === Tile.ROUNDED_ROCK).length;
//         record += rowValue * numberOfRoundedRocks;
//     });
//     allRecords.push(record);
// }

// while (true) {
//     //finding pattern
//     const lastRecord = allRecords.pop();
//     const beforeLastRecord = allRecords.pop();
//     if (!lastRecord || !beforeLastRecord) throw new Error("No last record");

//     const lastRecordFound = allRecords.lastIndexOf(lastRecord);
//     const beforeLastRecordFound = allRecords.lastIndexOf(beforeLastRecord);

//     console.log("lastRecord", lastRecord);
//     console.log("beforeLastRecord", beforeLastRecord);

//     console.log("lastRecordFound", lastRecordFound);
//     console.log("beforeLastRecordFound", beforeLastRecordFound);

//     const patternLength = loopLength - allRecords.lastIndexOf(lastRecord);

//     const patternValues = allRecords.slice(allRecords.length - patternLength);
//     patternValues.push(beforeLastRecord);
//     patternValues.push(lastRecord);

//     if (lastRecordFound - beforeLastRecordFound !== 1) {
//         console.error("No pattern found");
//         loopLength += 1;
//         continue;
//     }

//     // at 1000000000 iteration
//     const iteration = 1000000000;

//     const patternIndex = (iteration - loopLength) % patternLength;
//     const patternValue = patternValues[patternIndex];
//     console.log("patternLength", patternLength);
//     console.log(patternValue);
//     break;
// }
