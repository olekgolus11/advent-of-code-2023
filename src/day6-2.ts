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

const timeLength = Number(raceTimes.join(""));
const maxDistance = Number(raceDistances.join(""));

const race: Race = {
    timeLength,
    maxDistance,
    raceAttemps: [],
};

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

const attempts = race.raceAttemps;
let allBetterOptionsCount = 0;

attempts.forEach((attempt) => {
    if (attempt.distanceTravelled > race.maxDistance) {
        allBetterOptionsCount++;
    }
});

console.log(allBetterOptionsCount);
