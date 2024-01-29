import express from "express";
import { createTask, getMyTasks, getTaskDetails, updateTask } from "../controllers/task.js";
import { authencateToken } from "../middlewares/auth.js";

const router = express.Router();

router.get('/', authencateToken, getMyTasks);
router.get('/details/:id', getTaskDetails);
router.post('/', authencateToken, createTask);
router.put('/:id', authencateToken, updateTask);

export default router;