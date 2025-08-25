import express from 'express';
const router = express.Router();

import { sendMessage, getMessage } from '../controllers/messages.controller.js';
import protectRoute from '../middlewares/protectRoute.middleware.js';

router.post('/:username', protectRoute, sendMessage);
router.get('/:username', protectRoute, getMessage);

export default router;
