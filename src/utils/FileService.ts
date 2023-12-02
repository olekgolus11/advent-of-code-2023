import * as fs from "node:fs";

class FileService {
    constructor() {}

    getFileContent(fileName: string) {
        try {
            const fileContent = fs.readFileSync(`input-files/${fileName}`, "utf-8");
            return fileContent;
        } catch (error) {
            console.error(`Encountered error while opening file ${fileName}`);
            throw error;
        }
    }

    getFileContentRows(fileName: string) {
        try {
            const fileContent = fs.readFileSync(`input-files/${fileName}`, "utf-8");
            const fileContentRows = fileContent.split("\n");
            return fileContentRows;
        } catch (error) {
            console.error(`Encountered error while opening file ${fileName}`);
            throw error;
        }
    }
}

export default FileService;
