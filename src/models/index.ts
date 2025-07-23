interface BidHistory {
    amount: number;
    won: boolean;
}

interface Participant {
    id: string;
    name: string;
    balance: number;
    propertiesWon: number;
    isBot: boolean;
    makeBid(history: BidHistory[], currentRound: number): number;
}

interface Bid {
    participantId: string;
    amount: number;
}

abstract class Bot {
    constructor(public id: string, public balance: number) {}
    abstract makeBid(history: Bid[], currentRound: number): number;
}

interface Property {
    id: number;
    bids: Bid[];
    winner?: string;
    winningBidAmount?: number;
}

interface AuctionState {
    currentRound: number;
    participants: Participant[];
    properties: Property[];
}

export { BidHistory, Participant, Bid, Bot, Property, AuctionState };
