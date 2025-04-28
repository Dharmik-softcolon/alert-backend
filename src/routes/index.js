import express from 'express';
import alertRoute from './stockRoutes.js';

const router = express.Router();

router.use('/alert', alertRoute);

export default router;