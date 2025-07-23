import { Request, Response } from 'express';
import { auctionService } from './auctionService';

export const startAuction = (req: Request, res: Response) => {
    const { playerName } = req.body;
    const gameData = auctionService.startAuction(playerName || 'Player');
    res.json(gameData);
};

export const submitBid = (req: Request, res: Response) => {
    try {
        const { amount } = req.body;
        auctionService.submitPlayerBid(amount);
        auctionService.runBotBids();
        const result = auctionService.resolveRound();
        res.json(result);
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
};

export const getSummary = (_: Request, res: Response) => {
    const summary = auctionService.getSummary();
    res.json(summary);
};

export const resetAuction = (_: Request, res: Response) => {
    auctionService.reset();
    res.json({ message: 'Auction ended and game state reset.' });
};
