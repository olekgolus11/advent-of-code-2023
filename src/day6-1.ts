import FileService from "./utils/FileService";

interface Race {
    timeLength: number;
    maxDistance: number;
    raceAttemps: Attempt[];
}

interface Attempt {
    timeHeld: number;
    distanceTravelled: number;
}

const fileService = new FileService();

const fileContent = fileService.getFileContentRows("day6_input1.txt");

const raceTimes = fileContent[0].match(/\d+/g);
const raceDistances = fileContent[1].match(/\d+/g);

if (!raceTimes || !raceDistances) {
    throw new Error("No race times or distances read");
}

const races: Race[] = [];

for (let i = 0; i < raceTimes.length; i++) {
    races.push({
        timeLength: Number(raceTimes[i]),
        maxDistance: Number(raceDistances[i]),
        raceAttemps: [],
    });
}

races.forEach((race) => {
    for (let i = 0; i <= race.timeLength; i++) {
        const timeHeld = i;
        const speed = i;
        const timeRemaining = race.timeLength - timeHeld;
        const distanceTravelled = timeRemaining * speed;
        race.raceAttemps.push({
            timeHeld,
            distanceTravelled,
        });
    }
});

console.log(races[0].raceAttemps);

let answer = 1;

races.forEach((race) => {
    const attempts = race.raceAttemps;
    let allBetterOptionsCount = 0;
    attempts.forEach((attempt) => {
        if (attempt.distanceTravelled > race.maxDistance) {
            allBetterOptionsCount++;
        }
    });
    answer *= allBetterOptionsCount;
});

console.log(answer);
