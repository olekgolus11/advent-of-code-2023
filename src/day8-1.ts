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

//extracting step instructions
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

const firstInstruction = stepsInstructions.find((instruction) => instruction.currentStep === "AAA");
if (!firstInstruction) {
    throw new Error("Did not find first instruction");
}
let currentStepInstruction = firstInstruction;
let currentRLInstructionIndex = 0;
let numberOfSteps = 0;
while (currentStepInstruction.currentStep !== "ZZZ") {
    const currentRLInstruction = leftRightInstructions[currentRLInstructionIndex];
    const nextStep = currentRLInstruction === "L" ? currentStepInstruction.leftStep : currentStepInstruction.rightStep;
    const foundNextStepInstruction = stepsInstructions.find((instruction) => instruction.currentStep === nextStep);
    if (!foundNextStepInstruction) {
        throw new Error("Next instruction does not exist");
    }
    currentStepInstruction = foundNextStepInstruction;
    currentRLInstructionIndex = (currentRLInstructionIndex + 1) % numberOfRLInstructions;
    numberOfSteps++;
}

console.log(numberOfSteps);
