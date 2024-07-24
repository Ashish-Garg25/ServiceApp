import { Schema, model } from "mongoose";

const services = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      required: true,
      trim: true
    },
    serviceCategory: [{
      type: Schema.Types.ObjectId,
      ref: "Categorys",
      required: true
    }],
    about: {
      type: String,
      required: true
    },
    availaility: {
      type: Date,
      required: true
    },
    rate: {
      type: String,
      required: true,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reviews"
      }
    ]
  },
  { timestamps: true }
);

const Services = model("Services", services);
export { services, Services };
