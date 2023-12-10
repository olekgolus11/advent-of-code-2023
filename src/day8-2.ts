import * as math from "mathjs";
import FileService from "./utils/FileService";

interface StepInstruction {
    currentStep: string;
    leftStep: string;
    rightStep: string;
}

const fileService = new FileService();
const fileContent = fileService.getFileContentRows("day8_input1.txt");

const leftRightInstructions = fileContent[0].split("");
const numberOfRLInstructions = leftRightInstructions.length;
const stepsInstructions: StepInstruction[] = [];
const rawStepsInstructions = fileContent.slice(2);

rawStepsInstructions.forEach((rawStepInstruction) => {
    const [currentStep, leftStep, rightStep] = rawStepInstruction.match(/\w+/g)?.map((string) => String(string)) ?? [];
    if (!currentStep || !leftStep || !rightStep) {
        throw new Error("No steps found");
    }
    stepsInstructions.push({
        currentStep,
        leftStep,
        rightStep,
    });
});

const firstInstructions = stepsInstructions.filter(
    (stepInstruction) => stepInstruction.currentStep.charAt(stepInstruction.currentStep.length - 1) === "A"
);

console.log("First steps:\n", firstInstructions);

let allNumberOfSteps: number[] = [];

firstInstructions.forEach((firstInstruction) => {
    let currentRLInstructionIndex = 0;
    let numberOfSteps = 0;
    let currentStepInstruction = firstInstruction;
    while (true) {
        const currentRLInstruction = leftRightInstructions[currentRLInstructionIndex];
        const nextStep = currentRLInstruction === "L" ? currentStepInstruction.leftStep : currentStepInstruction.rightStep;
        const foundNextStepInstruction = stepsInstructions.find((instruction) => instruction.currentStep === nextStep);
        if (!foundNextStepInstruction) {
            throw new Error("Next instruction does not exist");
        }
        currentStepInstruction = foundNextStepInstruction;
        currentRLInstructionIndex = (currentRLInstructionIndex + 1) % numberOfRLInstructions;
        numberOfSteps++;
        const isOnEndStep = currentStepInstruction.currentStep.charAt(currentStepInstruction.currentStep.length - 1) === "Z";
        if (isOnEndStep) {
            break;
        }
    }
    allNumberOfSteps.push(numberOfSteps);
});

console.log("All steps taken from **A to **Z:\n", allNumberOfSteps);
const answer = allNumberOfSteps.reduce((previousValue, currentValue) => math.lcm(previousValue, currentValue));
console.log("LCM: ", answer);
