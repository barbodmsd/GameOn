import Category from "../Models/categoryModel.js";
import catchAsync from "../Utils/catchAsync.js";
import fs from "fs";
import { __dirname } from "../app.js";

export const createCategory = catchAsync(async (req, res, next) => {
  const image = req?.file?.filename || "";
  const newCategory = await Category.create({...req.body,image})
  return res.status(201).json({
    status: "success",
    data: newCategory,
  });
});

export const getAllCategory = catchAsync(async (req, res) => {
  const categories = await Category.find();
  return res.status(200).json({
    status: "success",
    data: categories,
  });
});

export const deleteCategory = catchAsync(async (req, res) => {
  const deletedCategory = await Category.findByIdAndDelete(req.params.id);
  
  if (deletedCategory.image) {
    fs.unlinkSync(__dirname + "/Public/" + deletedCategory.image);
  }
  return res.status(200).json({
    status: "success",
    data: deletedCategory,
  });
});
