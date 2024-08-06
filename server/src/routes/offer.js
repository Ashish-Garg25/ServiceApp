import express from "express";
import {
  createOffer,
  getAllOfferByUser,
  getCompletedOfferStats,
  getOfferDetails,
  reschedule,
  updateOffer
} from "../controllers/offer.js";
import { authencateToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:offerId", authencateToken, getOfferDetails);
router.get('/user/all/:sellerId?', authencateToken, getAllOfferByUser);
router.get('/stats/all/', authencateToken, getCompletedOfferStats);
router.post("/", authencateToken, createOffer);
router.put("/", authencateToken, updateOffer);
router.put("/reschedule", authencateToken, reschedule);


export default router;
