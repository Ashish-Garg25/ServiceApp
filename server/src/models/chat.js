import { Schema, model } from "mongoose";
import { offerSchema } from "./offer.js";
import { serviceSchema } from "./service.js";

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
      type: serviceSchema,
      required: function () {
        return this.type === "Service";
      }
    },
    offer: {
      type: offerSchema,
      required: function () {
        return this.type === "Offer";
      }
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
