import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    sender: {
      type: String,
      required: true,
      trim: true
    },
    receiver: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const chats = new Schema(
  {
    room: {
        type: String,
        required: true,
    },
    message: [messageSchema]
  },
  { timestamps: true }
);

export default model("Chats", chats);
