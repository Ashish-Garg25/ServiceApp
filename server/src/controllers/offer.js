import { Offers } from "../models/offer.js";
import task from "../models/task.js";
import user from "../models/user.js";
import ChatModel from "../models/chat.js";
import moment from "moment";

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

export const getCompletedOfferStats = async (req, res) => {
  try {
    const { userId } = req.user;
    const { type } = req.query; // Get filter type from query parameters
    const fetchedOffers = await Offers.find({ sellerId: userId, status: 4 });

    if (fetchedOffers.length === 0) {
      return res.status(400).json({
        status: 400,
        error: "No Stats Available",
      });
    }

    const now = moment();
    let stats = {};

    if (type === "today") {
      stats = { today: 0 };
      fetchedOffers.forEach((offer) => {
        const { rate, startDate } = offer;
        if (moment(startDate).isSame(now, 'day')) {
          stats.today += rate;
        }
      });
    } else if (type === "weekly") {
      stats = {};
      for (let i = 0; i < 7; i++) {
        stats[now.clone().subtract(i, 'days').format('YYYY-MM-DD')] = 0;
      }
      fetchedOffers.forEach((offer) => {
        const { rate, startDate } = offer;
        const dateStr = moment(startDate).format('YYYY-MM-DD');
        if (stats.hasOwnProperty(dateStr)) {
          stats[dateStr] += rate;
        }
      });
    } else if (type === "monthly") {
      stats = {};
      const currentYear = now.year(); // Get the current year
      const currentMonth = now.month();

      // Generate stats for each month of the current year
      for (let i = 0; i < currentMonth; i++) {
        stats[now.clone().year(currentYear).month(i).format('YYYY-MM')] = 0;
      }
    
      // Aggregate the rates from fetchedOffers
      fetchedOffers.forEach((offer) => {
        const { rate, startDate } = offer;
        const monthStr = moment(startDate).format('YYYY-MM');
        const offerYear = moment(startDate).year();
    
        // Only include offers from the current year
        if (offerYear === currentYear && stats.hasOwnProperty(monthStr)) {
          stats[monthStr] += rate;
        }
      });
    } else if (type === "yearly") {
      stats = {};
      const currentYear = now.year();
      for (let i = 0; i < 5; i++) {
        stats[currentYear - i] = 0;
      }
      fetchedOffers.forEach((offer) => {
        const { rate, startDate } = offer;
        const year = moment(startDate).year();
        if (stats.hasOwnProperty(year)) {
          stats[year] += rate;
        }
      });
    } else {
      return res.status(400).json({
        status: 400,
        error: "Invalid filter type",
      });
    }

    // Calculate total rate
    const total = fetchedOffers.reduce((acc, offer) => acc + offer.rate, 0);

    return res.json({
      data: stats,
      total: total,
      variant: "success",
    });
  } catch (err) {
    console.log(err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};
