import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: String,
    age: Number,
    login: {
      type: Boolean,
      default: false,
      required: true,
    },
    profile:String,
    cover_pic:[{
      type:String
    }]
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
