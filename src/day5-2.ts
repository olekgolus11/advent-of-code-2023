import FileService from "./utils/FileService";

interface MapInfo {
    mapDescription: string;
    mappings: Mapping[];
}

interface Mapping {
    inputValue: number;
    rangeValue: number;
    differenceValue: number;
}

interface InputSeedRange {
    startValue: number;
    rangeValue: number;
}

const fileService = new FileService();
const fileContent = fileService.getFileContent("day5_input1.txt");
const fileContentSplittedByCategory = fileContent.split("\n\n");

const inputSeedsRangeValues = fileContentSplittedByCategory[0].match(/\d+/g)?.map((value) => Number(value));
if (!inputSeedsRangeValues) {
    throw new Error("There are no input seeds");
}

const inputSeedRanges: InputSeedRange[] = [];
for (let i = 0; i < inputSeedsRangeValues.length; i += 2) {
    inputSeedRanges.push({
        startValue: inputSeedsRangeValues[0 + i],
        rangeValue: inputSeedsRangeValues[1 + i],
    });
}

fileContentSplittedByCategory.shift();

const mapsInfo: MapInfo[] = [];

fileContentSplittedByCategory.map((row) => {
    const [mapDescription, mapValuesCombined] = row.split(" map:\n");
    const mapValuesSplittedByRows = mapValuesCombined.split("\n");
    const mapValues = mapValuesSplittedByRows.map((rowOfValues) => {
        return rowOfValues.split(" ").map((value) => Number(value));
    });

    const mappings: Mapping[] = [];
    mapValues.forEach((mapValuesRow) => {
        mappings.push({
            inputValue: mapValuesRow[1],
            rangeValue: mapValuesRow[2],
            differenceValue: mapValuesRow[0] - mapValuesRow[1],
        });
    });

    mapsInfo.push({
        mapDescription,
        mappings,
    });
});

let minLocation = 0;
const mapsInfoReversed = mapsInfo.reverse();

while (true) {
    let retrievedSeedValue: number = minLocation;
    mapsInfoReversed.forEach((mapInfo) => {
        const foundMapping = mapInfo.mappings.find((mapping) => {
            return (
                retrievedSeedValue - mapping.differenceValue >= mapping.inputValue &&
                retrievedSeedValue - mapping.differenceValue < mapping.inputValue + mapping.rangeValue
            );
        });
        if (!foundMapping) {
            retrievedSeedValue = retrievedSeedValue;
        } else {
            retrievedSeedValue = retrievedSeedValue - foundMapping.differenceValue;
        }
    });
    const foundSeed = inputSeedRanges.find((inputSeedRange) => {
        return retrievedSeedValue >= inputSeedRange.startValue && retrievedSeedValue < inputSeedRange.startValue + inputSeedRange.rangeValue;
    });
    if (foundSeed) break;
    else minLocation++;
}

console.log(minLocation);
