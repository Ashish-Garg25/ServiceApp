import ChatModel from "../models/chat.js";
import UserModel from "../models/user.js";
import { Types } from "mongoose";

export const getAllChats = async (req, res) => {
  try {
    const { userId } = req.user;

    // Use the aggregation framework to group chats based on participants (sender and receiver)
    const userChats = await ChatModel.aggregate([
      {
        $match: {
          $or: [
            { sender: new Types.ObjectId(userId) },
            { receiver: new Types.ObjectId(userId) }
          ]
        }
      },
      {
        $group: {
          _id: null,
          participants: {
            $addToSet: {
              $cond: {
                if: { $eq: ["$sender", new Types.ObjectId(userId)] },
                then: "$receiver",
                else: "$sender"
              }
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          participants: {
            $setDifference: [
              "$participants",
              [new Types.ObjectId(userId)] // Exclude the logged-in user's ID
            ]
          }
        }
      }
    ]);
    
    console.log('ddd', userChats);

    if (userChats.length > 0) {
      // Extract user IDs from the result
      const participantIds = userChats[0].participants;

      // Find user details for the extracted IDs
      const participants = await UserModel.find(
        { _id: { $in: participantIds } },
        "_id profilePic firstName lastName"
      );

      res.status(200).json({ participants });
    } else {
      res.status(404).json({ msg: "No conversations found for the user!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};

export const getChatWithUser = async (req, res) => {
  try {

    const {userId} = req.user;
    const {otherUserId} = req.params;

    const chat = await ChatModel.aggregate([
      {
        $match: {
          $or: [
            { sender: new Types.ObjectId(userId), receiver: new Types.ObjectId(otherUserId) },
            { sender: new Types.ObjectId(otherUserId), receiver: new Types.ObjectId(userId) }
          ]
        }
      },
      {
        $lookup: {
          from: "users", // The name of the Users collection in your database
          localField: "sender",
          foreignField: "_id",
          as: "senderDetails"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "receiver",
          foreignField: "_id",
          as: "receiverDetails"
        }
      },
      {
        $unwind: "$senderDetails"
      },
      {
        $unwind: "$receiverDetails"
      },
      {
        $sort: { createdAt: 1 } // Optionally, you can sort the messages based on timestamp
      }
    ]);

    if (chat.length > 0) {
      res.status(200).json({ chat });
    } else {
      res.status(404).json({ msg: "No chat found with the specified user!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};

export const sendMessage = async(req, res) => {
  try{
    const {sender, receiver, content} = req.body;

    if(!sender || !receiver || !content){
      return res.status(400).json({
        message: `All Fields are required`,
        variant: "error"
      });
    }

    const chatMessage = new ChatModel({
      sender,
      receiver,
      content
    })

    await chatMessage.save();

    return res.json({
      message: "Message sent successfully",
      variant: "success",
      data: chatMessage
    });

  }catch(err){
    console.error(err);
    res.status(500).json({ msg: "Something went wrong!" });
  }
}
