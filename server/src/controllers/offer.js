import offer from "../models/offer.js";

export const createOffer = async (req, res) => {
  try {
    const { serviceId, sellerId, startDate, rate, additionalInfo } = req.body;

    if (!serviceId || !sellerId || !startDate || !rate || !additionalInfo) {
      return res.json({ msg: "All fields are required" });
    }

    const newOffer = new offer({
      serviceId,
      sellerId,
      startDate,
      rate,
      additionalInfo,
      status: 1,
      statusText: "Created"
    });

    await newOffer.save();
    return res.json({
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
