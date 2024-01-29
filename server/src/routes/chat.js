import express from "express";
import { getAllChats, getChatWithUser, sendMessage } from "../controllers/chat.js";
import { authencateToken } from "../middlewares/auth.js";

const router = express.Router();

router.get('/', authencateToken, getAllChats);
router.get('/:otherUserId', authencateToken, getChatWithUser);
router.post('/message', sendMessage);

export default router;