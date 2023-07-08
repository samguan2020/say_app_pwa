import express from 'express';

import { getMessages, sendMessage, getUsers} from '../controllers/messages.js';
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/get/:startindex/:endindex',auth, getMessages);
router.post('/send',auth, sendMessage);
router.get('/getUsers',auth, getUsers);

export default router;