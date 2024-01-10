import { Schema, model } from "mongoose";

const addressSchema = new Schema({
  address1: {
    type: String,
    trim: true
  },
  address2: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    trim: true
  },
  zipCode: {
    type: Number,
    trim: true
  }
});

const users = new Schema(
  {
    profilePic: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    token: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true
    },
    password: {
      type: String,
      trim: true
    },
    businessName: {
      type: String
    },
    userType: {
      type: String,
      enum: {
        values: ["Seller", "Buyer", "Both"],
        message: "{VALUE} is not supported"
      },
      required: true
    },
    rating: {
      type: String,
      enum: {
        values: [null, "1", "2", "3", "4", "5"],
        message: "{VALUE} is not supported"
      },
      default: null
    },
    badge: {
      type: String,
      enum: {
        values: [null, "Rising Star", "Top Rated", "Handpicked"],
        message: "{VALUE} is not supported"
      },
      default: null
    },
    address: [addressSchema]
  },
  { timestamps: true }
);

export default model("Users", users);
