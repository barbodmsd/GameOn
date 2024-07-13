import Slider from "../Models/sliderModel.js";
import catchAsync from "../Utils/catchAsync.js";
import jwt from "jsonwebtoken";
import HandleError from "../Utils/handleError.js";

export const getAllSlider = catchAsync(async (req, res, next) => {
  const slider = await Slider.find();
  res.status(200).json({
    status: "success",
    data: slider,
  });
});

export const createSlider = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const { id, role } = jwt.verify(token, process.env.SECRET_KEY);
  if (role == "admin" || id == req.params.id) {
    const slider = await Slider.create(req.body);
    res.status(201).json({
      status: "success",
      data: slider,
    });
  }else {
    return next(new HandleError("You don't have permission to update this user", 401));
  }
});

export const deleteSlider = catchAsync(async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const { id, role } = jwt.verify(token, process.env.SECRET_KEY);
    if (role == "admin" || id == req.params.id) {
        const slider = await Slider.findByIdAndDelete(req.params.id);
      res.status(201).json({
        status: "success",
        data: slider,
      });
    }else {
        return next(new HandleError("You don't have permission to update this user", 401));
    }
});
