import { Schema, model } from "mongoose";

// const messageSchema = new Schema(
//   {
//     sender: {
//       type: Schema.Types.ObjectId,
//       ref: "Users",
//       required: true,
//       trim: true
//     },
//     receiver: {
//       type: Schema.Types.ObjectId,
//       ref: "Users",
//       required: true,
//       trim: true
//     },
//     content: {
//       type: String,
//       required: true
//     }
//   },
//   { timestamps: true }
// );

const chats = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      trim: true
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: {
        values: ["Chat", "Offer", "Service"],
        message: "{VALUE} is not supported"
      },
      required: true
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Services",
      required: function () {
        return this.type === "Service";
      },
      default: null,
    },
    offer: {
      type: Schema.Types.ObjectId,
      ref: "Offers",
      required: function () {
        return this.type === "Offer";
      },
      default: null,
    },
    content: {
      type: String,
      required: function () {
        return this.type === "Chat";
      }
    }
  },
  { timestamps: true }
);

export default model("Chats", chats);
