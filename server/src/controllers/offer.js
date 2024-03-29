import offer from "../models/offer.js";
import user from "../models/user.js";

export const createOffer = async (req, res) => {
  try {
    const { buyerId, service, sellerId, startDate, rate, additionalInfo } = req.body;

    console.log(req.body)

    if (!buyerId || !service || !sellerId || !startDate || !rate || !additionalInfo) {
      return res.json({ msg: "All fields are required" });
    }

    const newOffer = new offer({
      buyerId,
      service,
      sellerId,
      startDate,
      rate,
      additionalInfo,
      status: 1,
      statusText: "Created"
    });

    await newOffer.save();
    return res.json({
      data: newOffer,
      message: "Offer created successfully",
      variant: "success"
    });
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

    const response = await offer.findById(offerId);

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
    const {sellerId} = req.params;

    const userExist = await user.findById(userId);

    if (!userExist) {
      return res.status(400).json({
        message: `No user found with provided ID`,
        variant: "error"
      });
    }

    const allOffers = await offer.find({buyerId: userId, sellerId});

    if(allOffers.length > 0){
      return res.json(allOffers)
    } else {
      return res.json({ status: res.status, message: "No Order Yet!" });
    }

  } catch (err) {
    console.log("err", err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};

export const updateOffer = async (req, res) => {
  try {
    const { offerId, status } = req.body;

    const fetchedOffer = await offer.findById(offerId);
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
        break;

      case 3:
        fetchedOffer.status = 3;
        fetchedOffer.statusText = "Cancelled";
        break;

      case 4:
        fetchedOffer.status = 4;
        fetchedOffer.statusText = "Completed";
        break;

      default:
        fetchedOffer.status = 0;
        fetchedOffer.statusText = null;
    }

    const updatedOffer = await fetchedOffer.save();
    return res.json({
      data: updatedOffer,
      variant: "success"
    });
  } catch (err) {
    console.log(err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};
