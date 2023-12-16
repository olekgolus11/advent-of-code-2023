import FileService from "./utils/FileService";

enum Tile {
    ROUNDED_ROCK = "O",
    CUBE_ROCK = "#",
    EMPTY_SPACE = ".",
}

const fileService = new FileService();

const field = fileService.getFileContentCells("input14.txt");

const isEmptySpaceAbove = (rowIndex: number, colIndex: number) => {
    if (rowIndex === 0) return false;
    return field[rowIndex - 1][colIndex] === Tile.EMPTY_SPACE;
};

const slideRockUp = (rowIndex: number, colIndex: number) => {
    if (rowIndex === 0) return;
    field[rowIndex - 1][colIndex] = Tile.ROUNDED_ROCK;
    field[rowIndex][colIndex] = Tile.EMPTY_SPACE;
};

const slideAllRocksOnce = () => {
    field.forEach((row, rowIndex) => {
        row.forEach((tile, colIndex) => {
            const thisTile = tile as Tile;

            if (thisTile !== Tile.ROUNDED_ROCK) return;

            if (isEmptySpaceAbove(rowIndex, colIndex)) {
                slideRockUp(rowIndex, colIndex);
            }
        });
    });
};

while (true) {
    const fieldBefore = field.map((row) => [...row]);
    slideAllRocksOnce();
    if (fieldBefore.join("") === field.join("")) break;
}

let answer = 0;
const numberOfRows = field.length;

field.forEach((row, index) => {
    const rowValue = numberOfRows - index;
    const numberOfRoundedRocks = row.filter((tile) => tile === Tile.ROUNDED_ROCK).length;
    answer += rowValue * numberOfRoundedRocks;
});

console.log(answer);
