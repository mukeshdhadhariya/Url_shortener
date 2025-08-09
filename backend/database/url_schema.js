import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortId: { type: String, unique: true, required: true },
  longUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 }
});

export default mongoose.model("Url", urlSchema);