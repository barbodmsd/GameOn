import Banner from "../Models/bannerModel.js";
import catchAsync from "../Utils/catchAsync.js";
import fs from "fs";
import { __dirname } from "../app.js";
import HandleError from "../Utils/handleError.js";

export const createBanner = catchAsync(async (req, res, next) => {
  const image = req?.file?.filename || "";
  const newBanner = await Banner.create({...req.body,image})
  return res.status(201).json({
    status: "success",
    data: newBanner,
  });
});

export const getAllBanner = catchAsync(async (req, res) => {
  const banners = await Banner.find();
  return res.status(200).json({
    status: "success",
    data: banners,
  });
});

export const deleteBanner = catchAsync(async (req, res) => {
  const deletedBanner = await Banner.findByIdAndDelete(req.params.id);
  if (deletedBanner.image) {
    fs.unlinkSync(__dirname + "/Public/" + deletedBanner.image);
  }
  return res.status(200).json({
    status: "success",
    data: deletedBanner,
  });
});
