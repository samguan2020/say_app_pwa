import express from 'express';

import { getMessages, sendMessage } from '../controllers/messages.js';

const router = express.Router();

router.get('/', getMessages);
router.post('/', sendMessage);

export default router;