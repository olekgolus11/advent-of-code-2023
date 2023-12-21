import FileService from "./utils/FileService";

const fileService = new FileService();

const fileContent = fileService.getFileContentCells("input15.txt", ",")[0];

interface Lens {
    key: string;
    value: number;
}

interface Box {
    lenses: Lens[];
}

const boxes: Box[] = Array(256)
    .fill(null)
    .map(() => ({ lenses: [] }));

fileContent.forEach((stringSequence) => {
    const lensKey = stringSequence.split(/[-=]/)[0];
    const lensValue = parseInt(stringSequence.split(/[-=]/)[1]);
    const specialCharacter = stringSequence.includes("-") ? "-" : "=";
    let hash = 0;
    lensKey.split("").forEach((letter) => {
        hash += letter.charCodeAt(0);
        hash *= 17;
        hash = hash % 256;
    });
    if (specialCharacter === "-") {
        boxes[hash].lenses = boxes[hash].lenses.filter((lens) => lens.key !== lensKey);
    } else {
        if (boxes[hash].lenses.some((lens) => lens.key === lensKey)) {
            const index = boxes[hash].lenses.findIndex((lens) => lens.key === lensKey);
            boxes[hash].lenses[index].value = lensValue;
        } else {
            boxes[hash].lenses.push({ key: lensKey, value: lensValue });
        }
    }
});

let sum = 0;

boxes.forEach((box, boxIndex) => {
    box.lenses.forEach((lens, lensIndex) => {
        sum += (boxIndex + 1) * (lensIndex + 1) * lens.value;
    });
});

console.log(sum);
