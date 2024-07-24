import { Schema, model } from "mongoose";

const offers = new Schema(
  {
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Services",
      required: true
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: "Tasks",
      required: true
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    rate: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: {
        values: [1, 2, 3, 4], // 1 -> Created, 2 -> In Progress, 3 -> Cancelled, 4 -> Completed
        message: "{VALUE} is not supported"
      },
      required: true
    },
    statusText: {
      type: String,
      enum: {
        values: ["Created", "In Progress", "Cancelled", "Completed"],
        message: "{VALUE} is not supported"
      },
      required: true
    },
    additionalInfo: {
      type: String
    }
  },
  { timestamps: true }
);

const Offers = model("Offers", offers);
export { offers, Offers };
