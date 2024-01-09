import { Schema, model } from "mongoose";

const categorys = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

export default model("Categorys", categorys);
