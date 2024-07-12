import User from "../Models/userModel.js";
import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import { __dirname } from "../app.js";

// Get all users
export const getAllUser = catchAsync(async (req, res, next) => {

  // Check if Admin exists
  const token = req.headers.authorization.split(" ")[1];
  const { id, role } = jwt.verify(token, process.env.SECRET_KEY);
  if (role == "admin" || id == req.params.id) {

    // show users
    const users = await User.find();

    return res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } else {
    return next(new HandleError("you don't have permission", 401));
  }
});

//Get user by id
export const getUserById = catchAsync(async (req, res, next) => {

  // show user by id 
  const user = await User.findById(req.params.id);

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
  const profilePhoto = req.body?.profilePhoto || "";
  const img = req.file?.filename || "";
  const token = req.headers.authorization.split(" ")[1];
  const { id, role } = jwt.verify(token, process.env.JWT_SECRET);

  if (role !== "admin" && id !== req.params.id) {
    return next(new HandleError("You don't have permission to update this user", 401));
  }

  let user;
  const { role: bodyRole, id: bodyId, ...others } = req.body;

  if (img) {
    const oldUser = await User.findById(req.params.id);
    user = await User.findByIdAndUpdate(
      req.params.id,
      { ...others, profilePhoto: img },
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

  // Check if Admin exists
  const token = req.headers.authorization.split(" ")[1];
  const { id, role } = jwt.verify(token, process.env.SECRET_KEY);
  if (role == "admin" || id == req.params.id) {

    // Delete user
    const deleteUser = await User.findByIdAndDelete(req.params.id);

    // Check delete user and delete profile image
    if (deleteUser.profilePhoto) {
      fs.unlinkSync(`${__dirname}/Public/${deleteUser.imageUrl}`);
    }

    return res.status(200).json({
      status: "success",
    });
  } else {
    return next(new HandleError("you don't have permission", 401));
  }
});

// Add product to favorites
export const addFavoriteProduct = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.body.productId;

  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  // Add product to favorites if not already added
  if (!user.favorites.includes(productId)) {
    user.favorites.push(productId);
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
  const userId = req.params.userId;
  const { product, quantity } = req.body;

  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  // Check if the item already exists in cart
  const cartItemIndex = user.Cart.findIndex((item) =>
    item.product.equals(product)
  );

  if (cartItemIndex === -1) {
    // If item doesn't exist, add it to cart
    user.Cart.push({ product, quantity });
  } else {
    // If item exists, update its quantity
    user.Cart[cartItemIndex].quantity += quantity;
  }

  await user.save();

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});


// Update user wallet balance
export const updateUserWallet = catchAsync(async (req, res, next) => {
  const { balance } = req.body;
  const userId = req.params.userId;

  // Find the user by userId
  const user = await User.findById(userId);

  if (!user) {
    return next(new HandleError("User not found", 404));
  }

  // Update the wallet balance
  user.wallet.balance = balance;
  await user.save();

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});