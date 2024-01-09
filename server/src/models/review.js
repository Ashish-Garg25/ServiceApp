import { Schema, model } from "mongoose";

const reviews = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Services",
      required: true
    },
    rating: {
      type: String,
      enum: {
        values: ["1", "2", "3", "4", "5"],
        message: "{VALUE} is not supported"
      }
    },
    content: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default model("Reviews", reviews);
