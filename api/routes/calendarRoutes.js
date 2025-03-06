import express from 'express';
import calendarController from '../controllers/calendarController.js';

const router = express.Router();

router.get('/next-event', calendarController.nextEvent);
router.get('/upcoming-events', calendarController.upcomingEvents);

export default router;

