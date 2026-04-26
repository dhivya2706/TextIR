import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  updatedImage: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    enum: ["super-resolution", "colourization", "degrading"],
    required: true,
  },
  description: {
    type: String,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Image", imageSchema);