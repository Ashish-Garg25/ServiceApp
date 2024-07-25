import express from "express";
import {
  createService,
  deleteService,
  getFilteredService,
  getServiceBySellerId,
  getServices,
  getServicesByCategory,
  getSingleService,
  rateService,
  updateService
} from "../controllers/service.js";
import { authencateToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getServices);
router.get("/:id", getSingleService);
router.get("/category/:category", getServicesByCategory);
router.post("/filter/", getFilteredService);
router.get('/seller/id', authencateToken, getServiceBySellerId);
router.post("/create", authencateToken, createService);
router.put("/update", authencateToken, updateService);
router.delete("/delete/:id", authencateToken, deleteService);
router.post("/rate", authencateToken, rateService);

export default router;
