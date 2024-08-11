import notification from "../models/notification.js";

export const getNotifications = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      res.status(401).json({ msg: "Token is required!" });
    }

    const notifications = await notification.find({ registrationToken: token });

    res.status(201).json(notifications);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};
