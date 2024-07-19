import Product from "../Models/productModel.js";
import catchAsync from "../Utils/catchAsync.js";
import fs from "fs";
import { __dirname } from "../app.js";

export const getAllProduct = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    status: "success",
    data: products,
  });
});

export const getByIdProduct = catchAsync(async (req, res, next) => {
  const {productId} = req.params;
  const product = await Product.findById(productId);
  res.status(200).json({
    status: "success",
    data: product,
  });
});

export const createProduct = catchAsync(async (req, res, next) => {
  const images = req?.files?.map(file => file?.filename);
  const product = await Product.create({...req.body,images});
  res.status(200).json({
    status: "success",
    data: product,
  });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const images = req.files.map(file => file.filename);
  const {productId} = req.params;
  const product = await Product.findByIdAndUpdate(productId, req.body,images, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: product,
  });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  const {productId} = req.params;
  const product = await Product.findByIdAndDelete(productId);
  if(product.images){
    fs.unlinkSync(__dirname + "/Public/" + product.images)
  }
  res.status(200).json({
    status: "success",
    massege:`Delete product : ${product.title}`
  });
});
