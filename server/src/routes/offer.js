import express from "express";
import {
  createOffer,
  getOfferDetails,
  updateOffer
} from "../controllers/offer.js";

const router = express.Router();

router.get("/:offerId", getOfferDetails);
router.post("/", createOffer);
router.put("/", updateOffer);

export default router;
