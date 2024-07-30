import express from "express";
import {
  createOffer,
  getAllOfferByUser,
  getOfferDetails,
  reschedule,
  updateOffer
} from "../controllers/offer.js";
import { authencateToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:offerId", authencateToken, getOfferDetails);
router.get('/user/all/:sellerId?', authencateToken, getAllOfferByUser);
router.post("/", authencateToken, createOffer);
router.put("/", authencateToken, updateOffer);
router.put("/reschedule", authencateToken, reschedule);

export default router;
