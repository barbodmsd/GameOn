import Slider from "../Models/sliderModel.js";
import catchAsync from "../Utils/catchAsync.js";
import fs from "fs";
import { __dirname } from "../app.js";


// Get all sliders
export const getAllSlider = catchAsync(async (req, res, next) => {
  // Retrieve all sliders from the database
  const sliders = await Slider.find();
  res.status(200).json({
    status: "success",
    data: sliders,
  });
});

// Create a new slider
export const createSlider = catchAsync(async (req, res, next) => {
  // Get the image filename from the request, or set it to an empty string if not provided
  const image = req.file.filename || "";
  // Create a new slider with the provided data and image
  const slider = await Slider.create({ ...req.body, image });
  res.status(201).json({
    status: "success",
    data: slider,
  });
});

// Delete a slider by ID
export const deleteSlider = catchAsync(async (req, res, next) => {
  // Find and delete the slider by ID
  const slider = await Slider.findByIdAndDelete(req.params.id);
  // Check if the slider has an associated image and delete it from the filesystem
  if (slider.image) {
    fs.unlinkSync(`${__dirname}/Public/${slider.imageUrl}`);
  }
  res.status(201).json({
    status: "success",
    message: `Deleted slider with ID: ${req.params.id}`,
  });
});
