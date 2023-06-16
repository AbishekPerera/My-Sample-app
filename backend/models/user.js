import mongoose from "mongoose";

const userSchema = mongoose.Schema;

const user = new userSchema(
  {
    name: {
      type: String,
      required: true,
    },
    pass: {
      type: String,
      required: true,
    },
    createdby: {
      type: String,
      default: "admin",
    },
    updatedby: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", user);
