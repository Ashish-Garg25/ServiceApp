import { Offers } from "../models/offer.js";
import task from "../models/task.js";
import user from "../models/user.js";
import ChatModel from "../models/chat.js";

export const createOffer = async (req, res) => {
  try {
    const {
      buyerId,
      service,
      task,
      sellerId,
      startDate,
      rate,
      additionalInfo,
      isSellerMaking
    } = req.body;

    console.log(req.body);
    if (
      !buyerId ||
      !service ||
      !task ||
      !sellerId ||
      !startDate ||
      !rate ||
      !additionalInfo
    ) {
      return res.json({ msg: "All fields are required" });
    }

    const newOffer = new Offers({
      buyerId,
      service,
      task,
      sellerId,
      startDate,
      rate,
      additionalInfo,
      status: 1,
      statusText: "Created"
    });

    await newOffer.save();

    if (newOffer) {
      const chatMessage = new ChatModel({
        sender: isSellerMaking ? sellerId : buyerId,
        receiver: isSellerMaking ? buyerId : sellerId,
        task,
        type: "Offer",
        content: "",
        offer: newOffer._id,
        service: null
      });

      await chatMessage.save();

      return res.json({
        message: "Offer created successfully",
        variant: "success"
      });
    }
  } catch (err) {
    console.log("err", err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};

export const getOfferDetails = async (req, res) => {
  try {
    const { offerId } = req.params;

    if (!offerId) {
      return res.json({ msg: "All fields are required" });
    }

    const response = await Offers.findById(offerId);

    if (!response) {
      return res.json({ msg: "No offer found!" });
    }

    return res.json({
      data: response,
      variant: "success"
    });
  } catch (err) {
    console.log("err", err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};

export const getAllOfferByUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const { sellerId } = req.params;

    const userExist = await user.findById(userId);

    if (!userExist) {
      return res.status(400).json({
        message: `No user found with provided ID`,
        variant: "error"
      });
    }

    let allOffers;

    if(sellerId){
      allOffers = await Offers.find({ buyerId: userId, sellerId });
    } else {
      allOffers = await Offers.find({ buyerId: userId });
    }

    if (allOffers.length > 0) {
      return res.json(allOffers);
    } else {
      return res.json({ status: res.status, message: "No Order Yet!" });
    }
  } catch (err) {
    console.log("err", err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};

export const reschedule = async (req, res) => {
  try {
    const { offerId, startDate, rate, additionalInfo } = req.body;
    const fetchedOffer = await Offers.findById(offerId);

    if (fetchedOffer.status !== 1) {
      return res.status(400).json({
        status: 400,
        error: "Contract in Progress"
      });
    }

    if (startDate) fetchedOffer.startDate = startDate;
    if (rate) fetchedOffer.rate = rate;
    if (additionalInfo) fetchedOffer.additionalInfo = additionalInfo;

    await fetchedOffer.save();

    return res.json({
      data: fetchedOffer,
      variant: "success"
    });
  } catch (err) {
    console.log(err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};

export const updateOffer = async (req, res) => {
  try {
    const { offerId, status } = req.body;

    const fetchedOffer = await Offers.findById(offerId);
    const fetchedPost = await task.findById(fetchedOffer.task);

    if (!fetchedOffer) {
      return res.status(400).json({
        status: 400,
        error: "Offer not found"
      });
    }

    switch (status) {
      case 1:
        fetchedOffer.status = 1;
        fetchedOffer.statusText = "Created";
        break;

      case 2:
        fetchedOffer.status = 2;
        fetchedOffer.statusText = "In Progress";
        fetchedPost.status = "In Progress";
        break;

      case 3:
        fetchedOffer.status = 3;
        fetchedOffer.statusText = "Cancelled";
        fetchedPost.status = "Cancelled";
        break;

      case 4:
        fetchedOffer.status = 4;
        fetchedOffer.statusText = "Completed";
        fetchedPost.status = "Complete";
        break;

      default:
        fetchedOffer.status = 0;
        fetchedOffer.statusText = null;
    }

    const updatedOffer = await fetchedOffer.save();
    await fetchedPost.save();

    return res.json({
      data: updatedOffer,
      variant: "success"
    });
  } catch (err) {
    console.log(err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};
