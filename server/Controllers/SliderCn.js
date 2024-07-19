import Slider from "../Models/sliderModel.js";
import catchAsync from "../Utils/catchAsync.js";

export const getAllSlider = catchAsync(async (req, res, next) => {
  const slider = await Slider.find();
  res.status(200).json({
    status: "success",
    data: slider,
  });
});

export const createSlider = catchAsync(async (req, res, next) => {
    const image = req.file.filename || ""
    const slider = await Slider.create({...req.body,image});
    res.status(201).json({
      status: "success",
      data: slider,
    });
});

export const deleteSlider = catchAsync(async (req, res, next) => {
        const slider = await Slider.findByIdAndDelete(req.params.id);
      res.status(201).json({
        status: "success",
        data: slider,
      });
});
