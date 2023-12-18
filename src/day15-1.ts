import FileService from "./utils/FileService";

const fileService = new FileService();

const fileContent = fileService.getFileContentCells("input15.txt", ",")[0];

let sum = 0;

fileContent.forEach((stringSequence) => {
    const letters = stringSequence.split("");

    let hash = 0;
    letters.forEach((letter) => {
        hash += letter.charCodeAt(0);
        hash *= 17;
        hash = hash % 256;
    });
    sum += hash;
});

console.log(sum);
