import FileService from "./utils/FileService";

const fileService = new FileService();
const fileContent = fileService.getFileContentRows("day2_input1.txt");

interface GameSet {
    blue: number;
    red: number;
    green: number;
}

let answer = 0;

fileContent.forEach((row) => {
    const [gameIndexString, allSets] = row.split("Game")[1].split(":");
    const gameIndex = Number(gameIndexString);
    const allSetsAsArray = allSets.split(";").map((set) => set.split(",").map((oneThrow) => oneThrow.trim())); //Array of arrays of strings

    const allSetsCheckedIsValid = allSetsAsArray.map((set) => {
        const gameSet: GameSet = {
            blue: 0,
            red: 0,
            green: 0,
        };

        set.forEach((oneThrow) => {
            const [numerOfCubes, color] = oneThrow.split(" ");
            gameSet[color as keyof typeof gameSet] += Number(numerOfCubes);
        });

        if (gameSet.blue <= 14 && gameSet.green <= 13 && gameSet.red <= 12) return true;
        else return false;
    });

    if (!allSetsCheckedIsValid.includes(false)) {
        answer += gameIndex;
    }
});

console.log(answer);
