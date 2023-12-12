import FileService from "./utils/FileService";

const fileService = new FileService();

const fileContent = fileService.getFileContentCells("input9.txt", " ").map((row) => row.map((cell) => Number(cell)));

// analyzing each row input

let answer = 0;

fileContent.forEach((row) => {
    const allReducedRows: number[][] = [row];

    // get all reduced lines
    while (true) {
        const rowToReduce = [...allReducedRows[allReducedRows.length - 1]];
        const reducedRow = rowToReduce.map((_, index, array) => (index == array.length - 1 ? 0 : array[index + 1] - array[index]));
        reducedRow.pop();
        allReducedRows.push(reducedRow);
        const isAllZeros = !reducedRow.find((value) => value !== 0);
        if (isAllZeros) {
            break;
        }
    }

    let foundNumber: number = 0;
    allReducedRows.reverse().forEach((row) => {
        foundNumber += row[row.length - 1];
    });
    answer += foundNumber;
});

console.log(answer);
