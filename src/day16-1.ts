import FileService from "./utils/FileService";

interface Position {
    x: number;
    y: number;
}

enum Direction {
    UP = "UP",
    DOWN = "DOWN",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
}

enum RegistryCellType {
    EMPTY = ".",
    BEAM = "#",
}

enum CellType {
    EMPTY = ".",
    LEFT_MIRROR = "/",
    RIGHT_MIRROR = "\\",
    VERTICAL_SPLITTER = "|",
    HORIZONTAL_SPLITTER = "-",
}

const fileService = new FileService();
const board = fileService.getFileContentCells("input16.txt", "");

const emptyBoard = board.map((row) => row.map((cell) => "."));

const runBeam = (currentPosition: Position, currentDirection: Direction, occupiedCount: number) => {
    if (occupiedCount > 10) {
        return;
    }
    const currentX = currentPosition.x;
    const currentY = currentPosition.y;

    emptyBoard[currentY][currentX] = RegistryCellType.BEAM;

    let nextPosition;
    switch (currentDirection) {
        case Direction.UP:
            nextPosition = { x: currentX, y: currentY - 1 };
            break;
        case Direction.DOWN:
            nextPosition = { x: currentX, y: currentY + 1 };
            break;
        case Direction.LEFT:
            nextPosition = { x: currentX - 1, y: currentY };
            break;
        case Direction.RIGHT:
            nextPosition = { x: currentX + 1, y: currentY };
            break;
        default:
            return;
    }

    if (nextPosition.x < 0 || nextPosition.x >= board[0].length || nextPosition.y < 0 || nextPosition.y >= board.length) {
        return;
    }

    if (emptyBoard[nextPosition.y][nextPosition.x] === RegistryCellType.BEAM) {
        occupiedCount++;
    } else {
        occupiedCount = 0;
    }

    // console.log(nextPosition);
    const nextCell = board[nextPosition.y][nextPosition.x] as CellType;

    switch (nextCell) {
        case CellType.EMPTY:
            runBeam(nextPosition, currentDirection, occupiedCount);
            break;
        case CellType.LEFT_MIRROR:
            switch (currentDirection) {
                case Direction.UP:
                    runBeam(nextPosition, Direction.RIGHT, occupiedCount);
                    break;
                case Direction.DOWN:
                    runBeam(nextPosition, Direction.LEFT, occupiedCount);
                    break;
                case Direction.LEFT:
                    runBeam(nextPosition, Direction.DOWN, occupiedCount);
                    break;
                case Direction.RIGHT:
                    runBeam(nextPosition, Direction.UP, occupiedCount);
                    break;
            }
            break;
        case CellType.RIGHT_MIRROR:
            switch (currentDirection) {
                case Direction.UP:
                    runBeam(nextPosition, Direction.LEFT, occupiedCount);
                    break;
                case Direction.DOWN:
                    runBeam(nextPosition, Direction.RIGHT, occupiedCount);
                    break;
                case Direction.LEFT:
                    runBeam(nextPosition, Direction.UP, occupiedCount);
                    break;
                case Direction.RIGHT:
                    runBeam(nextPosition, Direction.DOWN, occupiedCount);
                    break;
            }
            break;
        case CellType.VERTICAL_SPLITTER:
            switch (currentDirection) {
                case Direction.UP:
                case Direction.DOWN:
                    runBeam(nextPosition, currentDirection, occupiedCount);
                    break;
                case Direction.LEFT:
                case Direction.RIGHT:
                    runBeam(nextPosition, Direction.UP, occupiedCount);
                    runBeam(nextPosition, Direction.DOWN, occupiedCount);
                    break;
            }
            break;
        case CellType.HORIZONTAL_SPLITTER:
            switch (currentDirection) {
                case Direction.UP:
                case Direction.DOWN:
                    runBeam(nextPosition, Direction.LEFT, occupiedCount);
                    runBeam(nextPosition, Direction.RIGHT, occupiedCount);
                    break;
                case Direction.LEFT:
                case Direction.RIGHT:
                    runBeam(nextPosition, currentDirection, occupiedCount);
                    break;
            }
            break;
        default:
            return;
    }
};

const startPosition = { x: 0, y: 0 };
runBeam(startPosition, Direction.RIGHT, 0);

let numberOfBeamCells = 0;

emptyBoard.forEach((row) => row.forEach((cell) => (cell === RegistryCellType.BEAM ? numberOfBeamCells++ : null)));

console.log(numberOfBeamCells);

// emptyBoard.forEach((row) => console.log(row.join("")));
