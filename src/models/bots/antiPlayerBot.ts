import { Bid, Bot } from '..';

// This bot will always try to beat the player by slightly incrementing its bet based on the player's last bet.
export class AntiPlayerBot extends Bot {
    constructor(id: string, balance: number) {
        super(id, balance);
    }

    makeBid(history: Bid[], _currentRound: number): number {
        const playerBids = history
            .filter((bid) => bid.participantId === 'player')
            .map((bid) => bid.amount);

        // No data yet — make a safe low bid
        // Since the player bid runs before the bot bids,
        // don't count the first item in the list asa valid datapoint
        if (playerBids.length === 1) {
            return Math.min(this.balance, 50);
        }

        const lastPlayerBid = playerBids[playerBids.length - 2];

        const safeIncrement = 10;

        // Try to beat the player's last bid by a small increment
        const targetBid = lastPlayerBid + safeIncrement;

        if (targetBid <= this.balance) {
            return targetBid;
        } else if (this.balance >= lastPlayerBid) {
            // If can't go higher, match last bid
            return lastPlayerBid;
        } else {
            // Not enough money, bid a random small amount
            return Math.max(1, Math.floor(Math.random() * this.balance));
        }
    }
}
