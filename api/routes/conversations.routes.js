import express from 'express';
import protectRoute from '../middlewares/protectRoute.middleware.js';
import {
	getConversations,
	getPeople,
	findPeople,
} from '../controllers/conversation.controller.js';
const router = express.Router();

router.get('/', protectRoute, getConversations);
router.post('/find-people', protectRoute, findPeople);

router.get('/people', protectRoute, getPeople);

export default router;
