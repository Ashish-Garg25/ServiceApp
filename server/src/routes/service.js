import express from "express";
import { getServices, getServicesByCategory, getSingleService } from "../controllers/service.js";

const router = express.Router();

router.get('/', getServices);
router.get('/:id', getSingleService);
router.get('/category/:category', getServicesByCategory)

export default router;