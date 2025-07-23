import { Bid, Bot } from '..';
import { auctionService } from '../../auctionService';

// This bot will try to bet the average of all past winning bets
export class MeanBidderBot extends Bot {
    constructor(id: string, balance: number) {
        super(id, balance);
    }

    makeBid(_: Bid[], currentRound: number): number {
        const pastWinningBids = auctionService.getPastWinningBids(currentRound);

        if (pastWinningBids.length === 0) {
            return Math.min(this.balance, 50);
        }

        const avg =
            pastWinningBids.reduce((sum, val) => sum + val, 0) /
            pastWinningBids.length;

        const targetBid = Math.floor(avg * 1.1);

        if (targetBid <= this.balance) {
            return targetBid;
        } else if (avg <= this.balance) {
            return Math.floor(avg);
        } else {
            return Math.max(1, Math.floor(this.balance * 0.1));
        }
    }
}
