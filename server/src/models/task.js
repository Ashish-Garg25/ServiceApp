import { Schema, model } from "mongoose";

const tasks = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: {
        values: ["Submitted", "In Progress", "Complete", "Cancelled", "Dispute"],
        message: "{VALUE} is not supported"
      },
      required: true
    },
    taskType: {
      type: String,
      enum: {
        values: ["Remote", "In Person"],
        message: "{VALUE} is not supported"
      },
      required: true
    },
    taskLocation: {
      type: String,
      required: true
    },
    taskDate: {
      type: String,
      required: true
    },
    taskImages: [{
      type: String,
    }],
    categories: [{
      type: Schema.Types.ObjectId,
      ref: "Categorys",
      required: true
    }],
    invited: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      }
    ],
  },
  { timestamps: true }
);

export default model("Tasks", tasks);
