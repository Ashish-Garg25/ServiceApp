import ChatModel from "../models/chat.js";

export const getAllChats = async (req, res) => {
  try {
    const { userId } = req.user;

    const allChats = await ChatModel.find({
      $or: [{ "message.sender": userId }, { "message.receiver": userId }]
    });

    if(allChats.length > 0){
        return res.status(202).json(allChats);
    } else {
        return res.status(400).json({msg: 'No Chats Found!'})
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "Something went wrong!" });
  }
};
