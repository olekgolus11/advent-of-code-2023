import FileService from "./utils/FileService";

interface FoundMirror {
    index: number;
    withSmudge: boolean;
    horizontal?: {
        from: number;
        to: number;
    };
    vertical?: {
        from: number;
        to: number;
    };
}

function splitArray(arr: string[], delimiter: string) {
    const result = [];
    let subarray = [];

    for (const element of arr) {
        if (element === delimiter) {
            if (subarray.length > 0) {
                result.push(subarray);
                subarray = [];
            }
        } else {
            subarray.push(element);
        }
    }

    if (subarray.length > 0) {
        result.push(subarray);
    }

    return result;
}

const fileService = new FileService();

const fileContent = fileService.getFileContentRows("input13.txt");

const mirrors = splitArray(fileContent, "");

console.log(mirrors);

//split array into arrys by empty line

const transposeMatrix = (matrix: string[]) => {
    const splitted = matrix.map((row) => row.split(""));

    const transposed = splitted[0].map((_, colIndex) => matrix.map((row) => row[colIndex])).reverse();

    return transposed.map((row) => row.join(""));
};

const isOneElementDifferent = (arr1: string[], arr2: string[]) => {
    let count = 0;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) {
            count++;
        }
    }
    return count == 1;
};

const findIndexOfDifferentElement = (arr1: string[], arr2: string[]) => {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) {
            return i;
        }
    }
    return -1;
};

const foundMirrors: FoundMirror[] = [];

//with smudge
mirrors.forEach((mirror, mirrorIndex) => {
    let mirrorCopy = [...mirror];
    const COL_WIDTH = mirrorCopy[0].length;
    const ROW_HEIGHT = mirrorCopy.length;

    for (let rotateCount = 0; rotateCount < 4; rotateCount++) {
        const firstRow = mirrorCopy[0];
        const allTheSameRowsIndices = mirrorCopy.map((row, index) => {
            if (index === 0) {
                return -1;
            }
            if (isOneElementDifferent(row.split(""), firstRow.split("")) || row === firstRow) {
                return index;
            } else {
                return -1;
            }
        });
        const sameRowIndicesFiltered = allTheSameRowsIndices.filter((index) => index != -1);

        // if mirrored row is not found, continue
        if (!sameRowIndicesFiltered || sameRowIndicesFiltered.length == 0) {
            mirrorCopy = transposeMatrix(mirrorCopy);
            continue;
        }

        // checking each same row
        let isMirrorFound = false;
        sameRowIndicesFiltered.forEach((index) => {
            if (isMirrorFound) {
                return;
            }
            let fromTopIndex = 0;
            let fromBottomIndex = index;
            let wasSmudge = false;
            while (fromTopIndex < fromBottomIndex) {
                if (mirrorCopy[fromTopIndex] === mirrorCopy[fromBottomIndex]) {
                    fromTopIndex++;
                    fromBottomIndex--;
                } else if (isOneElementDifferent(mirrorCopy[fromTopIndex].split(""), mirrorCopy[fromBottomIndex].split("")) && !wasSmudge) {
                    if (!wasSmudge) {
                        wasSmudge = true;
                        fromTopIndex++;
                        fromBottomIndex--;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
                if (fromTopIndex > fromBottomIndex && wasSmudge) {
                    isMirrorFound = true;
                    break;
                }
            }
            if (isMirrorFound) {
                console.log("found mirror");
                switch (rotateCount) {
                    case 0:
                        foundMirrors.push({
                            index: mirrorIndex,
                            withSmudge: true,
                            horizontal: {
                                from: fromTopIndex + 1,
                                to: fromBottomIndex + 1,
                            },
                        });
                        break;
                    case 1:
                        foundMirrors.push({
                            index: mirrorIndex,
                            withSmudge: true,
                            vertical: {
                                from: COL_WIDTH - fromTopIndex,
                                to: COL_WIDTH - fromBottomIndex,
                            },
                        });
                        break;
                    case 2:
                        foundMirrors.push({
                            index: mirrorIndex,
                            withSmudge: true,
                            horizontal: {
                                from: ROW_HEIGHT - fromTopIndex,
                                to: ROW_HEIGHT - fromBottomIndex,
                            },
                        });
                        break;
                    default:
                        foundMirrors.push({
                            index: mirrorIndex,
                            withSmudge: true,
                            vertical: {
                                from: fromTopIndex + 1,
                                to: fromBottomIndex + 1,
                            },
                        });
                        break;
                }
            }
        });
        if (isMirrorFound) {
            break;
        } else {
            mirrorCopy = transposeMatrix(mirrorCopy);
        }
    }
});

//without smudge
mirrors.forEach((mirror, mirrorIndex) => {
    let mirrorCopy = [...mirror];
    const COL_WIDTH = mirrorCopy[0].length;
    const ROW_HEIGHT = mirrorCopy.length;

    for (let rotateCount = 0; rotateCount < 4; rotateCount++) {
        const firstRow = mirrorCopy[0];
        const allTheSameRowsIndices = mirrorCopy.map((row, index) => {
            if (index === 0) {
                return -1;
            }
            if (row === firstRow) {
                return index;
            } else {
                return -1;
            }
        });
        const sameRowIndicesFiltered = allTheSameRowsIndices.filter((index) => index != -1);

        // if mirrored row is not found, continue
        if (!sameRowIndicesFiltered || sameRowIndicesFiltered.length == 0) {
            mirrorCopy = transposeMatrix(mirrorCopy);
            continue;
        }

        // checking each same row
        let isMirrorFound = false;
        sameRowIndicesFiltered.forEach((index) => {
            if (isMirrorFound) {
                return;
            }
            let fromTopIndex = 0;
            let fromBottomIndex = index;
            while (fromTopIndex < fromBottomIndex) {
                if (mirrorCopy[fromTopIndex] === mirrorCopy[fromBottomIndex]) {
                    fromTopIndex++;
                    fromBottomIndex--;
                } else {
                    break;
                }
                if (fromTopIndex > fromBottomIndex) {
                    isMirrorFound = true;
                    break;
                }
            }
            if (isMirrorFound) {
                console.log("found mirror");
                if (foundMirrors.find((mirror) => mirror.index === mirrorIndex)) {
                    return;
                }
                switch (rotateCount) {
                    case 0:
                        foundMirrors.push({
                            index: mirrorIndex,
                            withSmudge: false,
                            horizontal: {
                                from: fromTopIndex + 1,
                                to: fromBottomIndex + 1,
                            },
                        });
                        break;
                    case 1:
                        foundMirrors.push({
                            index: mirrorIndex,
                            withSmudge: false,
                            vertical: {
                                from: COL_WIDTH - fromTopIndex,
                                to: COL_WIDTH - fromBottomIndex,
                            },
                        });
                        break;
                    case 2:
                        foundMirrors.push({
                            index: mirrorIndex,
                            withSmudge: false,
                            horizontal: {
                                from: ROW_HEIGHT - fromTopIndex,
                                to: ROW_HEIGHT - fromBottomIndex,
                            },
                        });
                        break;
                    default:
                        foundMirrors.push({
                            index: mirrorIndex,
                            withSmudge: false,
                            vertical: {
                                from: fromTopIndex + 1,
                                to: fromBottomIndex + 1,
                            },
                        });
                        break;
                }
            }
        });
        if (isMirrorFound) {
            break;
        } else {
            mirrorCopy = transposeMatrix(mirrorCopy);
        }
    }
});

let answer = 0;

foundMirrors.forEach((mirror) => {
    if (mirror.horizontal) {
        mirror.horizontal.from < mirror.horizontal.to ? (answer += mirror.horizontal.from * 100) : (answer += mirror.horizontal.to * 100);
    } else if (mirror.vertical) {
        mirror.vertical.from < mirror.vertical.to ? (answer += mirror.vertical.from) : (answer += mirror.vertical.to);
    }
});

console.log(foundMirrors);

console.log(answer);
