import Product from "../Models/productModel.js";
import catchAsync from "../Utils/catchAsync.js";
import fs from "fs";
import { __dirname } from "../app.js";
import ApiFeatures from "../Utils/apiFeatures.js";

// Get all products
export const getAllProduct = catchAsync(async (req, res, next) => {
  // Use ApiFeatures to apply filters, population, limiting fields, sorting, and pagination
  const features = new ApiFeatures(Product, req.query)
    .filters()
    .populate()
    .limitFields()
    .sort()
    .paginate();
  const products = await features.query;
  res.status(200).json({
    status: "success",
    data: products,
  });
});

// Get a product by ID
export const getByIdProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  // Find the product by ID
  const product = await Product.findById(productId);
  res.status(200).json({
    status: "success",
    data: product,
  });
});

// Create a new product
export const createProduct = catchAsync(async (req, res, next) => {
  // Convert the color string into an array of colors
  const colors = req.body.color
    ? req.body.color.split(",").map((color) => color.trim())
    : [];
  // Get the filenames of the uploaded images
  const images = req?.files?.map((file) => file?.filename);
  // Create the new product with the provided data
  const product = await Product.create({ ...req.body, color: colors, images });
  res.status(201).json({
    status: "success",
    data: product,
  });
});

// Update a product by ID
export const updateProduct = catchAsync(async (req, res, next) => {
  // Get the filenames of the uploaded images
  const images = req.files.map((file) => file.filename);
  const { productId } = req.params;
  // Update the product with the provided data and new images
  const product = await Product.findByIdAndUpdate(productId, req.body, images, {
    new: true,
  });
  res.status(201).json({
    status: "success",
    data: product,
  });
});

// Delete a product by ID
export const deleteProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  // Find and delete the product by ID
  const product = await Product.findByIdAndDelete(productId);
  // If the product has associated images, delete them from the filesystem
  if (product.images) {
    fs.unlinkSync(__dirname + "/Public/" + product.images);
  }
  res.status(200).json({
    status: "success",
    message: `Deleted product: ${product.title}`,
  });
});
