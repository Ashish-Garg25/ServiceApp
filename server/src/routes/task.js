import express from "express";
import { createTask, updateTask } from "../controllers/task.js";
import { authencateToken } from "../middlewares/auth.js";

const router = express.Router();

router.get('/', authencateToken, createTask);
router.put('/:id', authencateToken, updateTask);

export default router;