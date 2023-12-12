import FileService from "./utils/FileService";

enum Direction {
    TOP,
    RIGHT,
    BOTTOM,
    LEFT,
    NONE,
}

interface Position {
    y: number;
    x: number;
}

interface Move {
    nextPosition: Position;
    lastMove: Direction;
}

interface FromTo {
    FROM_TOP: Direction;
    FROM_RIGHT: Direction;
    FROM_BOTTOM: Direction;
    FROM_LEFT: Direction;
}

const Pipe = {
    F: {
        FROM_TOP: Direction.NONE,
        FROM_RIGHT: Direction.BOTTOM,
        FROM_BOTTOM: Direction.RIGHT,
        FROM_LEFT: Direction.NONE,
    } as FromTo,
    J: {
        FROM_TOP: Direction.LEFT,
        FROM_RIGHT: Direction.NONE,
        FROM_BOTTOM: Direction.NONE,
        FROM_LEFT: Direction.TOP,
    } as FromTo,
    "7": {
        FROM_TOP: Direction.NONE,
        FROM_RIGHT: Direction.NONE,
        FROM_BOTTOM: Direction.LEFT,
        FROM_LEFT: Direction.BOTTOM,
    } as FromTo,
    L: {
        FROM_TOP: Direction.RIGHT,
        FROM_RIGHT: Direction.TOP,
        FROM_BOTTOM: Direction.NONE,
        FROM_LEFT: Direction.NONE,
    } as FromTo,
    "|": {
        FROM_TOP: Direction.BOTTOM,
        FROM_RIGHT: Direction.NONE,
        FROM_BOTTOM: Direction.TOP,
        FROM_LEFT: Direction.NONE,
    } as FromTo,
    "-": {
        FROM_TOP: Direction.NONE,
        FROM_RIGHT: Direction.LEFT,
        FROM_BOTTOM: Direction.NONE,
        FROM_LEFT: Direction.RIGHT,
    } as FromTo,
    ".": {
        FROM_TOP: Direction.NONE,
        FROM_RIGHT: Direction.NONE,
        FROM_BOTTOM: Direction.NONE,
        FROM_LEFT: Direction.NONE,
    } as FromTo,
    S: {
        FROM_TOP: Direction.NONE,
        FROM_RIGHT: Direction.NONE,
        FROM_BOTTOM: Direction.NONE,
        FROM_LEFT: Direction.NONE,
    } as FromTo,
}; //S - starting pos

const fileService = new FileService();

const field = fileService.getFileContentCells("input10.txt", "");

const startY = field.findIndex((row) => row.includes("S"));
const startX = field[startY].indexOf("S");

const startingPosition: Position = {
    y: startY,
    x: startX,
};

const getFromDirectionString = (direction: Direction) => {
    let result = "FROM_";
    if (direction == Direction.TOP) result += "BOTTOM";
    else if (direction == Direction.RIGHT) result += "LEFT";
    else if (direction == Direction.BOTTOM) result += "TOP";
    else if (direction == Direction.LEFT) result += "RIGHT";
    return result;
};

const getNextMove = (inputDirection: Direction, currentPosition: Position): Move => {
    const currentPipeSign = field[currentPosition.y][currentPosition.x];
    if (currentPipeSign == ".") {
        return {
            lastMove: Direction.NONE,
            nextPosition: currentPosition,
        };
    }
    const currentPipe = Pipe[currentPipeSign as keyof typeof Pipe];
    const fromDirection = getFromDirectionString(inputDirection);
    const nextDirection = currentPipe[fromDirection as keyof FromTo];
    let nextPosition = currentPosition;

    if (nextDirection == Direction.TOP) nextPosition.y--;
    else if (nextDirection == Direction.RIGHT) nextPosition.x++;
    else if (nextDirection == Direction.BOTTOM) nextPosition.y++;
    else if (nextDirection == Direction.LEFT) nextPosition.x--;

    // console.log(`${currentPipeSign}, from pos: (${currentPosition.y}, ${currentPosition.x}) to (${nextPosition.y}, ${nextPosition.x})`);

    return {
        lastMove: nextDirection,
        nextPosition,
    };
};

//check each starting
let answer: number = 0;
for (let startingDirection = Direction.TOP; startingDirection < Direction.LEFT; startingDirection++) {
    console.log(`\nFor starting direction: ${startingDirection}`);
    let nextPosition = { ...startingPosition };
    if (startingDirection == Direction.TOP) nextPosition.y--;
    else if (startingDirection == Direction.RIGHT) nextPosition.x++;
    else if (startingDirection == Direction.BOTTOM) nextPosition.y++;
    else if (startingDirection == Direction.LEFT) nextPosition.x--;

    let thisMove: Move = {
        nextPosition: nextPosition,
        lastMove: startingDirection,
    };
    let numberOfMoves = 0;
    while (true) {
        thisMove = getNextMove(thisMove.lastMove, thisMove.nextPosition);
        numberOfMoves++;
        if (thisMove.lastMove == Direction.NONE) break;
    }
    if (thisMove.nextPosition.x == startingPosition.x && thisMove.nextPosition.y == startingPosition.y) {
        answer = numberOfMoves / 2;
    }
}

console.log(answer);
