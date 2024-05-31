import mongoose from "mongoose";

const postschema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    desc: String,
    likes: [],
    image: String,
  },
  {
    timestamps: true,
  }
);

const postmodel=mongoose.model("postmodel",postschema);
export default postmodel;

