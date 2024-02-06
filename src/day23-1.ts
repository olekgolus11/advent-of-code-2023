import FileService from "./utils/FileService";

enum MapTile {
    PATH = ".",
    FOREST = "#",
    SLOPE_UP = "^",
    SLOPE_DOWN = "v",
    SLOPE_LEFT = "<",
    SLOPE_RIGHT = ">",
}

interface Position {
    x: number;
    y: number;
}

const allPathsLengths: number[] = [];

const findNextNode = (passedVisitedNodes: Position[], currentPosition: Position) => {
    const currentX = currentPosition.x;
    const currentY = currentPosition.y;

    const visitedNodes = [...passedVisitedNodes];

    if (currentY === map.length - 1 && currentX === map[0].length - 2) {
        console.log("Reached the end!");
        console.log("Number of visited nodes", visitedNodes.length);
        allPathsLengths.push(visitedNodes.length);
        return;
    }

    visitedNodes.push(currentPosition);

    if (
        currentX + 1 < map[0].length &&
        (map[currentY][currentX + 1] === MapTile.PATH || map[currentY][currentX + 1] === MapTile.SLOPE_RIGHT) &&
        !visitedNodes.find((node) => node.x === currentX + 1 && node.y === currentY)
    ) {
        const nextPosition = { x: currentX + 1, y: currentY };
        findNextNode(visitedNodes, nextPosition);
    }
    if (
        currentY + 1 < map.length &&
        (map[currentY + 1][currentX] === MapTile.PATH || map[currentY + 1][currentX] === MapTile.SLOPE_DOWN) &&
        !visitedNodes.find((node) => node.x === currentX && node.y === currentY + 1)
    ) {
        const nextPosition = { x: currentX, y: currentY + 1 };
        findNextNode(visitedNodes, nextPosition);
    }
    if (
        currentX - 1 >= 0 &&
        (map[currentY][currentX - 1] === MapTile.PATH || map[currentY][currentX - 1] === MapTile.SLOPE_LEFT) &&
        !visitedNodes.find((node) => node.x === currentX - 1 && node.y === currentY)
    ) {
        const nextPosition = { x: currentX - 1, y: currentY };
        findNextNode(visitedNodes, nextPosition);
    }
    if (
        currentY - 1 >= 0 &&
        (map[currentY - 1][currentX] === MapTile.PATH || map[currentY - 1][currentX] === MapTile.SLOPE_UP) &&
        !visitedNodes.find((node) => node.x === currentX && node.y === currentY - 1)
    ) {
        const nextPosition = { x: currentX, y: currentY - 1 };
        findNextNode(visitedNodes, nextPosition);
    }
};

const fileService = new FileService();
const map = fileService.getFileContentCells("day23.txt");

const startPosition: Position = { x: 1, y: 0 };

findNextNode([], startPosition);

console.log("From start to end, the longest path is", Math.max(...allPathsLengths));
