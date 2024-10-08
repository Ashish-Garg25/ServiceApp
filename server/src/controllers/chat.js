import ChatModel from "../models/chat.js";
import UserModel from "../models/user.js";
import { Services } from "../models/serivce.js";
import { Offers } from "../models/offer.js";
import { Types } from "mongoose";
import { sendPushNotification } from "../helpers/helpers.js";

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

    console.log("ddd", userChats);

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
    const { userId } = req.user;
    const { otherUserId } = req.params;

    const chat = await ChatModel.aggregate([
      {
        $match: {
          $or: [
            {
              sender: new Types.ObjectId(userId),
              receiver: new Types.ObjectId(otherUserId)
            },
            {
              sender: new Types.ObjectId(otherUserId),
              receiver: new Types.ObjectId(userId)
            }
          ]
        }
      },
      {
        $lookup: {
          from: "users",
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
        $facet: {
          serviceChats: [
            { $match: { type: "Service" } },
            {
              $lookup: {
                from: "services",
                localField: "service",
                foreignField: "_id",
                as: "serviceDetails"
              }
            }
          ],
          offerChats: [
            { $match: { type: "Offer" } },
            {
              $lookup: {
                from: "offers",
                localField: "offer",
                foreignField: "_id",
                as: "offerDetails"
              }
            }
          ]
        }
      },
      {
        $project: {
          chats: { $setUnion: ["$serviceChats", "$offerChats"] }
        }
      },
      { $unwind: "$chats" },
      {
        $replaceRoot: { newRoot: "$chats" }
      },
      {
        $unwind: "$senderDetails"
      },
      {
        $unwind: "$receiverDetails"
      },
      {
        $sort: { createdAt: 1 }
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

export const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, task, type, content, service, offer } = req.body;

    let myService = {};
    let myOffer = {};

    if (!sender || !receiver || !type) {
      return res.status(400).json({
        message: `All Fields are required`,
        variant: "error"
      });
    }

    if (type === "Chat" && !content) {
      return res.status(400).json({
        message: `Content is required`,
        variant: "error"
      });
    }

    if (type === "Service" && !service) {
      return res.status(400).json({
        message: `Service is required`,
        variant: "error"
      });
    }

    if (type === "Offer" && !offer) {
      return res.status(400).json({
        message: `Offer is required`,
        variant: "error"
      });
    }

    if (type === "Service") {
      myService = await Services.findById(service);
    }

    if (type === "Offer") {
      myOffer = await Offers.findById(offer);
    }

    const chatMessage = new ChatModel({
      sender,
      receiver,
      task,
      type,
      content,
      offer: offer ?? null,
      service: service ?? null
    });

    await chatMessage.save();

    const senderDetails = await UserModel.findById(sender);
    const receivingUser = await UserModel.findById(receiver);

    if(receivingUser){
      await sendPushNotification(receivingUser.registrationToken, { title: `${senderDetails.firstName} sent a new message`, body: `${content}`})
      
    }

    return res.json({
      message: "Message sent successfully",
      variant: "success",
      data: {...chatMessage, service: myService, offer: myOffer}
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};
