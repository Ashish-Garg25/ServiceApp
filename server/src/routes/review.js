import express from "express";
import { reviewsByService } from "../controllers/service.js";

const router = express.Router();

router.get("/", reviewsByService);

export default router;
