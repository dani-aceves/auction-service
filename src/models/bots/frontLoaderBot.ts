import { Bid, Bot } from '..';

// This bot will bet aggressively in the first rounds of the game to try to win properties early
// and slowly decrease the amount that it bets in the later rounds
export class FrontLoaderBot extends Bot {
    constructor(id: string, balance: number) {
        super(id, balance);
    }

    makeBid(history: Bid[], currentRound: number): number {
        let bid: number;

        if (currentRound < 3) {
            // Early game: bid aggressively (up to 60% of remaining balance)
            bid = Math.floor(this.balance * (0.5 + Math.random() * 0.2)); // 40–60%
        } else if (currentRound < 7) {
            // Mid game: moderate (20–30%)
            bid = Math.floor(this.balance * (0.2 + Math.random() * 0.1));
        } else {
            // Late game: conservative (5–10%)
            bid = Math.floor(this.balance * (0.05 + Math.random() * 0.05));
        }

        // Clamp to remaining balance just in case
        return Math.max(1, Math.min(this.balance, bid));
    }
}
