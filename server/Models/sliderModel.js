import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"], // Added required constraint
      trim: true, // Removed any extra spaces
      maxlength: [100, "Title cannot exceed 100 characters"], // Optional: Set max length for title
    },
    image: {
      type: String,
      required: [true, "Image URL is required"], // Added required constraint
      trim: true, // Removed any extra spaces
    },
  },
  { timestamps: true }
);

const Slider = mongoose.model("Slider", sliderSchema);

export default Slider;
