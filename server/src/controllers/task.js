import task from "../models/task.js";
import user from "../models/user.js";
import { Offers } from "../models/offer.js";
import { sendPushNotification } from "../helpers/helpers.js";

export const createTask = async (req, res) => {
  try {
    const { userId } = req.user;
    const {
      title,
      description,
      taskType,
      categories,
      taskLocation,
      taskImages,
      taskDate,
      invited
    } = req.body;

    const userExist = await user.findById(userId);

    if (!userExist) {
      return res.status(400).json({
        message: `No user found with provided ID`,
        variant: "error"
      });
    }

    const newTask = new task({
      user: userId,
      title,
      description,
      taskType,
      categories,
      taskLocation,
      taskImages,
      taskDate,
      status: "Submitted",
      invited
    });

    await newTask.save();

    if (invited) {
      const userDetails = await user.findById(invited);

      const content = `${userExist.firstName} invited you to apply on their job posting`;
      await sendPushNotification(userDetails.registrationToken, {
        title: `You received an Invitation`,
        body: `${content}`
      });
    }

    return res.json({
      message: "Task created successfully",
      variant: "success",
      data: newTask
    });
  } catch (err) {
    console.log("err", err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};

export const getMyTasks = async (req, res) => {
  try {
    const { userId } = req.user;
    const allTasks = await task.find({ user: userId });

    if (allTasks.length > 0) {
      return res.json(allTasks);
    } else {
      return res.json([]);
    }
  } catch (err) {
    console.log("err", err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const { type } = req.params;

    if (type === "all") {
      const allTasks = await task.find({
        status: ["Submitted", "In Progress"]
      });
      if (allTasks.length > 0) {
        return res.json(allTasks);
      } else {
        return res.json([]);
      }
    }

    if (type === "completed") {
      const completedTasks = await task.find({ status: "Complete" });
      if (completedTasks.length > 0) {
        return res.json(completedTasks);
      } else {
        return res.json([]);
      }
    }
  } catch (err) {
    console.log("err", err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};

export const getInvitedTasks = async (req, res) => {
  try {
    const { userId } = req.user;

    const invitedTasks = await task.find({
      $and: [
        { $or: [{ status: "Submitted" }, { status: "In Progress" }] },
        { invited: { $in: [userId] } }
      ]
    });

    // console.log("INVITED ===", invitedTasks)

    if (invitedTasks.length > 0) {
      return res.json(invitedTasks);
    } else {
      return res.json([]);
    }
  } catch (err) {
    console.log("err", err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};

export const getTaskDetails = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);

    const taskDetails = await task.findById(id).populate("categories");

    if (!taskDetails) {
      return res.json({});
    }
    console.log(taskDetails);
    return res.json(taskDetails);
  } catch (err) {
    console.log("err", err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id, status, hasDeclined } = req.body;

    const taskExist = await task.findById(id);
    const userExist = await user.findById(taskExist[0].user);

    if (!taskExist) {
      return res.status(400).json({
        message: `No task found with provided ID`,
        variant: "error"
      });
    }

    const fetchedOffer = await Offers.find({ task: id });

    if (fetchedOffer?.length > 0) {
      if (status === "Cancelled") {
        fetchedOffer[0].status = 3;
        fetchedOffer[0].statusText = "Cancelled";
      } else if (status === "Complete") {
        fetchedOffer[0].status = 4;
        fetchedOffer[0].statusText = "Completed";
      }

      await fetchedOffer[0].save();
    }

    if (hasDeclined){
      const tasker = await user.findById(taskExist[0].invited[0]);
      const content = `${tasker.firstName} declined the invitation`;
      await sendPushNotification(userExist.registrationToken, {
        title: `Invitation Declined`,
        body: `${content}`
      });

      taskExist.invited = [];
    }

    if (status) taskExist.status = status;

    await taskExist.save();

    return res.json({
      message: "Task updated successfully",
      variant: "success",
      data: taskExist
    });
  } catch (err) {
    console.log("err", err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};
