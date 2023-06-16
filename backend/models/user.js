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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", user);
