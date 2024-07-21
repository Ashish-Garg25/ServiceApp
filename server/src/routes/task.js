import express from "express";
import { createTask, getAllTasks, getCompletedTasks, getInvitedTasks, getMyTasks, getTaskDetails, updateTask } from "../controllers/task.js";
import { authencateToken } from "../middlewares/auth.js";

const router = express.Router();

router.get('/', authencateToken, getMyTasks);
router.get('/details/:id', getTaskDetails);
router.post('/', authencateToken, createTask);
router.put('/:id', authencateToken, updateTask);
router.get(':type', authencateToken, getAllTasks);
router.get('/invited', authencateToken, getInvitedTasks);

export default router;