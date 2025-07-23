import express from 'express';
import {
    getSummary,
    resetAuction,
    startAuction,
    submitBid,
} from './auctionContoller';

const router = express.Router();

router.post('/start', startAuction);

router.post('/bid', submitBid);

router.get('/summary', getSummary);

router.post('/reset', resetAuction);

export default router;
