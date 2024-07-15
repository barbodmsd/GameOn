import Product from "../Models/productModel.js";
import catchAsync from "../Utils/catchAsync.js";

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
  const newProduct = req.body;
  const product = await Product.create(newProduct);
  res.status(200).json({
    status: "success",
    data: product,
  });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const {productId} = req.params;
  const product = await Product.findByIdAndUpdate(productId, req.body, {
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
  res.status(200).json({
    status: "success",
    massege:`Delete product : ${product.title}`
  });
});
