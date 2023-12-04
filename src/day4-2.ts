import FileService from "./utils/FileService";

const fileService = new FileService();

const fileContent = fileService.getFileContentRows("day4_input1.txt");

const arrayOfCardInstances = new Array(fileContent.length).fill(1);

console.log(arrayOfCardInstances);

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

    for (let i = cardNumber; i < cardNumber + numberOfCorrectNumbers; i++) {
        arrayOfCardInstances[i] += arrayOfCardInstances[cardNumber - 1];
    }
});

console.log(arrayOfCardInstances);
const answer = arrayOfCardInstances.reduce((acc, cur) => acc + cur);
console.log(answer);
