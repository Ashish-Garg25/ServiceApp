import { Schema, model } from "mongoose";

const notifications = new Schema(
  {
    registrationToken: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
        type: String,
        required: true
      }
  },
  { timestamps: true }
);

export default model("notifications", notifications);
