import task from "../models/task.js";
import user from "../models/user.js";

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
      taskDate
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
      status: "In Progress"
    });

    await newTask.save();

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

export const getTaskDetails = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id)

    const taskDetails = await task.findById(id).populate('categories');;

    if (!taskDetails) {
      return res.json({});
    }
    console.log(taskDetails)
    return res.json(taskDetails);
  } catch (err) {
    console.log("err", err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id, status } = req.body;

    const taskExist = await task.findById(id);

    if (!taskExist) {
      return res.status(400).json({
        message: `No task found with provided ID`,
        variant: "error"
      });
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
