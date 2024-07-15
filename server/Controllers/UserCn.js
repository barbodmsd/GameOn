import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import { __dirname } from "../app.js";
import Product from "../Models/productModel.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import User from "../Models/userModel.js";

// Get all users
export const getAllUser = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User, req.query).filters().limitFields().sort().populate().paginate();
  const users = await features.query;
  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
});

//Get user by id
export const getUserById = catchAsync(async (req, res, next) => {
  // show user by id
  const user = await User.findById(req.params.id).select("-__v -password");

  // Check if user exists
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

// Update user by id
export const updateUserById = catchAsync(async (req, res, next) => {
  const profilePhoto = req.file?.filename || "";
  const token = req.headers.authorization.split(" ")[1];
  const { id, role } = jwt.verify(token, process.env.SECRET_KEY);

  if (role !== "admin" && id !== req.params.id) {
    return next(
      new HandleError("You don't have permission to update this user", 401)
    );
  }

  let user;
  const { role: bodyRole, id: bodyId, ...others } = req.body;

  if (profilePhoto) {
    const oldUser = await User.findById(req.params.id);
    user = await User.findByIdAndUpdate(
      req.params.id,
      { ...others, profilePhoto: profilePhoto },
      { new: true, runValidators: true }
    );
    if (oldUser.profilePhoto) {
      fs.unlinkSync(`${__dirname}/Public/${oldUser.profilePhoto}`);
    }
  } else if (profilePhoto === "delete") {
    const oldUser = await User.findById(req.params.id);
    user = await User.findByIdAndUpdate(
      req.params.id,
      { ...others, profilePhoto: "" },
      { new: true, runValidators: true }
    );
    if (oldUser.profilePhoto) {
      fs.unlinkSync(`${__dirname}/Public/${oldUser.profilePhoto}`);
    }
  } else {
    user = await User.findByIdAndUpdate(req.params.id, others, {
      new: true,
      runValidators: true,
    });
  }

  return res.status(200).json({
    status: "success",
    data: user,
  });
});

// Delete user by id
export const deleteUserById = catchAsync(async (req, res, next) => {
  // Delete user
  const deleteUser = await User.findByIdAndDelete(req.params.id);
  // Check delete user and delete profile image
  if (deleteUser.profilePhoto) {
    fs.unlinkSync(`${__dirname}/Public/${deleteUser.imageUrl}`);
  }
  return res.status(200).json({
    status: "success",
  });
});

// Add product to favorites
export const addFavoriteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { productId } = req.body;

  // Check if user exists
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  // Add product to favorites if not already added
  if (!user.favorites.some((favorite) => favorite.equals(product.productId))) {
    user.favorites.push(product);
    await user.save();
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// Add item to cart
export const addToCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { product, quantity } = req.body;

  // Check if user exists
  const user = await User.findById(id).populate("cart.product");
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  const cardProduct = await Product.findById(product);
  if (!cardProduct) {
    return res.status(404).json({
      status: "error",
      message: "Product not found",
    });
  }

  // Check if the item already exists in cart
  const cartItemIndex = user.cart.findIndex((item) =>
    item.product._id.equals(product)
  );

  if (cartItemIndex === -1) {
    // If item doesn't exist, add it to cart
    user.cart.push({ product, quantity });
  } else {
    // If item exists, update its quantity
    user.cart[cartItemIndex].quantity += quantity;
  }

  await user.save();

  // Populate the cart products after saving
  await user.populate("cart.product");

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// Update user wallet balance
export const updateUserWallet = catchAsync(async (req, res, next) => {
  const { wallet } = req.body;
  const { id } = req.params;
  // Find the user by userId
  const user = await User.findById(id);
  if (!user) {
    return next(new HandleError("User not found", 404));
  }
  // Update the wallet balance
  user.wallet.balance += wallet.balance;
  await user.save();
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
