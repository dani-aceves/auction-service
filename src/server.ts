import express from 'express';
import auctionRoutes from './auctionRoutes';

export const createServer = () => {
    const app = express();
    app.use(express.json());

    app.use('/api/auction', auctionRoutes);
    return app;
};
