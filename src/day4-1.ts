import FileService from "./utils/FileService";

const fileService = new FileService();

const fileContent = fileService.getFileContentRows("day4_input1.txt");

let answer = 0;

fileContent.forEach((row) => {
    const [cardNumberText, allNumbersText] = row.split("Card ")[1].split(":");
    const [winningNumbersText, myNumbersText] = allNumbersText.split("|");

    const cardNumber = Number(cardNumberText);
    const winningNumbers: number[] = winningNumbersText
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .map((numberString: string) => Number(numberString));

    const myNumbers: number[] = myNumbersText
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .map((numberString: string) => Number(numberString));

    let numberOfCorrectNumbers = 0;

    winningNumbers.forEach((winningNumber) => {
        if (myNumbers.includes(winningNumber)) numberOfCorrectNumbers++;
    });

    const thisCardPoints = numberOfCorrectNumbers > 0 ? Math.pow(2, numberOfCorrectNumbers - 1) : 0;

    answer += thisCardPoints;
});

console.log(answer);
