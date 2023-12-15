import FileService from "./utils/FileService";

interface SpringRow {
    recordsRow: string;
    damagedRecords: number[];
}

const fileService = new FileService();

const fileContent = fileService.getFileContentRows("input12.txt");

const springRows: SpringRow[] = [];

fileContent.forEach((row) => {
    const damagedRecords: number[] = row.match(/(\d+)/g)?.map(Number) ?? [];
    if (damagedRecords.length == 0) {
        throw new Error("No damaged records found");
    }
    const recordsRow = row.split(" ")[0];
    springRows.push({ recordsRow, damagedRecords });
});

let numberOfAllCorrectCombinations = 0;

const findNumberOfAllCorrectCombinations = (springRow: SpringRow) => {
    const recordsRow = springRow.recordsRow;
    const indexOfFirstQuestionMark = recordsRow.indexOf("?");
    if (indexOfFirstQuestionMark == -1) {
        const splittedRecordsRow = recordsRow.split(".").filter((group) => group.length > 0);
        const numbersOfDamagedRecordsGroups = splittedRecordsRow.map((group) => group.length);
        //compare arrays
        if (numbersOfDamagedRecordsGroups.length != springRow.damagedRecords.length) {
            return;
        }
        for (let i = 0; i < numbersOfDamagedRecordsGroups.length; i++) {
            if (numbersOfDamagedRecordsGroups[i] != springRow.damagedRecords[i]) {
                return;
            }
        }
        numberOfAllCorrectCombinations++;
        return;
    }
    findNumberOfAllCorrectCombinations({
        recordsRow: recordsRow.replace("?", "#"),
        damagedRecords: springRow.damagedRecords,
    });
    findNumberOfAllCorrectCombinations({
        recordsRow: recordsRow.replace("?", "."),
        damagedRecords: springRow.damagedRecords,
    });
};

springRows.forEach((springRow) => {
    findNumberOfAllCorrectCombinations(springRow);
});

console.log(numberOfAllCorrectCombinations);
