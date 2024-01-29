import express from "express";
import { getFilteredService, getServices, getServicesByCategory, getSingleService } from "../controllers/service.js";

const router = express.Router();

router.get('/', getServices);
router.get('/:id', getSingleService);
router.get('/category/:category', getServicesByCategory)
router.post('/filter/', getFilteredService)

export default router;