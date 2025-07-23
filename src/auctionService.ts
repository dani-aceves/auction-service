import { BidHistory, Participant, Property } from './models';
import { INITIAL_PROPERTIES } from './constants';
import { AntiPlayerBot } from './models/bots/antiPlayerBot';
import { FrontLoaderBot } from './models/bots/frontLoaderBot';
import { MeanBidderBot } from './models/bots/meanBidderBot';

export class AuctionService {
    private participants: Participant[] = [];
    private bots: any[] = [];
    private properties: Property[] = [];

    currentRound = 0;
    private readonly TOTAL_PROPERTIES = 10;

    startAuction(playerName: string) {
        this.currentRound = 0;
        this.participants = [];
        this.properties = INITIAL_PROPERTIES;

        const player: Participant = {
            id: 'player',
            name: playerName,
            isBot: false,
            balance: 1000,
            propertiesWon: 0,
            makeBid: function (
                history: BidHistory[],
                currentRound: number,
            ): number {
                throw new Error('Function not implemented.');
            },
        };

        this.participants.push(player);

        // Create bots
        this.bots = [
            new AntiPlayerBot('bot1', 1000),
            new FrontLoaderBot('bot2', 1000),
            new MeanBidderBot('bot3', 1000),
        ];
        for (const bot of this.bots) {
            this.participants.push({
                id: bot.id,
                name: bot.constructor.name,
                isBot: true,
                balance: bot.balance,
                propertiesWon: 0,
                makeBid: bot.makeBid,
            });
        }

        // Add bots to participant list
        return { message: 'Game started', participants: this.participants };
    }

    submitPlayerBid(amount: number): { message: string } | never {
        const property = this.properties[this.currentRound];
        const player = this.getParticipant('player');

        if (!property || this.currentRound >= this.TOTAL_PROPERTIES) {
            throw new Error('No property available to bid on.');
        }

        if (amount > player.balance) {
            throw new Error('Bid exceeds your remaining balance.');
        }

        property.bids.push({
            participantId: player.id,
            amount,
        });
        player.balance -= amount;

        return { message: 'Bid submitted' };
    }

    runBotBids() {
        const property = this.properties[this.currentRound];
        const bidHistory = this.properties.flatMap((p) => p.bids);

        for (const bot of this.bots) {
            const amount = bot.makeBid(bidHistory, this.currentRound);
            if (amount > bot.balance) continue;

            property.bids.push({
                participantId: bot.id,
                amount,
            });
            bot.balance -= amount;

            const botParticipant = this.getParticipant(bot.id);
            if (botParticipant) {
                botParticipant.balance = bot.balance;
            }
        }
    }

    resolveRound() {
        const property = this.properties[this.currentRound];
        if (property.bids.length < this.participants.length) {
            throw new Error('Not all bids submitted yet.');
        }

        // Find highest bid
        const winningBid = property.bids.reduce((max, curr) =>
            curr.amount > max.amount ? curr : max,
        );

        property.winner = winningBid.participantId;
        property.winningBidAmount = winningBid.amount;

        // Update winner's record
        const winner = this.getParticipant(winningBid.participantId);
        if (winner) {
            winner.propertiesWon += 1;
        }

        const player = this.getParticipant('player');

        this.currentRound++;
        // If the round is now 10, that means the auction is over so return the summary
        if (this.currentRound === 10) {
            return this.getSummary();
        }

        return {
            winner: winner?.name,
            amount: winningBid.amount,
            round: property.id,
            playerRemainingBalance: player.balance,
        };
    }

    reset() {
        this.participants = [];
        this.bots = [];
        this.properties = INITIAL_PROPERTIES;
        this.currentRound = 0;
    }

    getSummary() {
        return {
            roundsCompleted: this.currentRound,
            results: this.properties.map((p) => ({
                propertyId: p.id,
                winner: p.winner,
                bids: p.bids,
            })),
            finalStandings: this.participants.map((p) => ({
                name: p.name,
                propertiesWon: p.propertiesWon,
                moneyRemaining: p.balance,
            })),
        };
    }

    getPastWinningBids(currentRound: number): number[] {
        return this.properties
            .slice(0, currentRound)
            .map((p) => p.winningBidAmount)
            .filter((amount): amount is number => typeof amount === 'number');
    }

    private getParticipant(id: string): Participant {
        const p = this.participants.find((p) => p.id === id);
        if (!p) throw new Error(`Participant not found: ${id}`);
        return p;
    }
}

// export a single instance of the service
export const auctionService = new AuctionService();
