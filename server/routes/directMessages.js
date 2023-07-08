import express from 'express';
import { getDirectMessages, createDirectMessage } from '../controllers/directmessages.js';
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', auth , getDirectMessages);
router.post('/send/:receiverId', auth , createDirectMessage);

export default router;
