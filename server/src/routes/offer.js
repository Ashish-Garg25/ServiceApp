import express from "express";
import {
  createOffer,
  getAllOfferByUser,
  getOfferDetails,
  updateOffer
} from "../controllers/offer.js";
import { authencateToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:offerId", authencateToken, getOfferDetails);
router.get('/offerByUser/:sellerId', authencateToken, getAllOfferByUser);
router.post("/", authencateToken, createOffer);
router.put("/", authencateToken, updateOffer);

export default router;
