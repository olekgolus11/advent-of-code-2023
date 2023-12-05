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

const fileService = new FileService();
const fileContent = fileService.getFileContent("day5_input1.txt");
const fileContentSplittedByCategory = fileContent.split("\n\n");

const inputSeeds = fileContentSplittedByCategory[0].match(/\d+/g)?.map((value) => Number(value));
if (!inputSeeds) {
    throw new Error("There are no input seeds");
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

const allLocations: number[] = [];

inputSeeds.forEach((inputSeed) => {
    let location: number = inputSeed;
    mapsInfo.forEach((mapInfo) => {
        const foundMapping = mapInfo.mappings.find((mapping) => {
            return location >= mapping.inputValue && location < mapping.inputValue + mapping.rangeValue;
        });
        if (!foundMapping) {
            location = location;
        } else {
            location = location + foundMapping.differenceValue;
        }
    });
    allLocations.push(location);
});

console.log(Math.min.apply(Math, allLocations));
