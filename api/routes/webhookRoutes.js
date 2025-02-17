import express from 'express';
import webhookController from '../controllers/webhookController.js';

export const BASE_URL='https://graph.facebook.com'

const router = express.Router();

router.post('/webhook', webhookController.handleIncoming);
router.get('/webhook', webhookController.verifyWebhook);

export default router;
