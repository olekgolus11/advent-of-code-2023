import FileService from "./utils/FileService";

interface Hand {
    cards: string;
    bid: number;
    handType: HandType;
}

interface Cards {
    A: number;
    K: number;
    Q: number;
    J: number;
    T: number;
    "9": number;
    "8": number;
    "7": number;
    "6": number;
    "5": number;
    "4": number;
    "3": number;
    "2": number;
}

enum HandType {
    Five = 7,
    Four = 6,
    House = 5,
    Three = 4,
    Two = 3,
    One = 2,
    High = 1,
}

const cardStrengths = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

const compareCardStrengths = (cardA: string, cardB: string) => {
    const cardAStrength = cardStrengths.indexOf(cardA);
    const cardBStrength = cardStrengths.indexOf(cardB);
    if (cardAStrength < cardBStrength) return 1;
    else if (cardAStrength > cardBStrength) return -1;
    else return 0;
};

const getHandType = (cards: string): HandType => {
    const cardsArray = cards.split("");
    const cardsObject: Cards = {
        A: 0,
        K: 0,
        Q: 0,
        J: 0,
        T: 0,
        "9": 0,
        "8": 0,
        "7": 0,
        "6": 0,
        "5": 0,
        "4": 0,
        "3": 0,
        "2": 0,
    };
    cardsArray.forEach((card) => {
        cardsObject[card as keyof Cards] += 1;
    });
    if (Object.entries(cardsObject).find((entry) => entry[1] == 5)) {
        return HandType.Five;
    } else if (Object.entries(cardsObject).find((entry) => entry[1] == 4)) {
        return HandType.Four;
    } else if (Object.entries(cardsObject).find((entry) => entry[1] == 3) && Object.entries(cardsObject).find((entry) => entry[1] == 2)) {
        return HandType.House;
    } else if (Object.entries(cardsObject).find((entry) => entry[1] == 3)) {
        return HandType.Three;
    } else if (Object.entries(cardsObject).filter((entry) => entry[1] == 2).length == 2) {
        return HandType.Two;
    } else if (Object.entries(cardsObject).find((entry) => entry[1] == 2)) {
        return HandType.One;
    } else {
        return HandType.High;
    }
};

const fileService = new FileService();

const fileContent = fileService.getFileContentRows("day7_input1.txt");

const hands: Hand[] = [];

fileContent.forEach((row) => {
    const cards = row.split(" ")[0];
    const bid = Number(row.split(" ")[1]);
    const handType = getHandType(cards);
    hands.push({ bid, cards, handType });
});

hands.sort((thisHand: Hand, nextHand: Hand) => {
    if (thisHand.handType > nextHand.handType) {
        return 1;
    } else if (thisHand.handType < nextHand.handType) {
        return -1;
    }
    switch (compareCardStrengths(thisHand.cards[0], nextHand.cards[0])) {
        case 1:
            return 1;
        case -1:
            return -1;
        default:
            break;
    }
    switch (compareCardStrengths(thisHand.cards[1], nextHand.cards[1])) {
        case 1:
            return 1;
        case -1:
            return -1;
        default:
            break;
    }
    switch (compareCardStrengths(thisHand.cards[2], nextHand.cards[2])) {
        case 1:
            return 1;
        case -1:
            return -1;
        default:
            break;
    }
    switch (compareCardStrengths(thisHand.cards[3], nextHand.cards[3])) {
        case 1:
            return 1;
        case -1:
            return -1;
        default:
            break;
    }
    switch (compareCardStrengths(thisHand.cards[4], nextHand.cards[4])) {
        case 1:
            return 1;
        case -1:
            return -1;
        default:
            return 0;
    }
});

const answer = hands.reduce((acc, currentHand, index) => (acc += (index + 1) * currentHand.bid), 0);

console.log(answer);
