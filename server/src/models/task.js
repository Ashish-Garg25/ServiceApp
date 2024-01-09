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
        values: ["In Progress", "Complete", "Cancelled", "Dispute"],
        message: "{VALUE} is not supported"
      },
      required: true
    },
    taskLocation: {
      type: String,
      enum: {
        values: ["Remote", "Offline"],
        message: "{VALUE} is not supported"
      },
      required: true
    },
    taskPlace: {
      type: String
    }
  },
  { timestamps: true }
);

export default model("Tasks", tasks);
