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
  // Apply filters, sorting, field limiting, populating, and pagination
  const features = new ApiFeatures(User, req.query)
    .filters()
    .limitFields()
    .sort()
    .populate()
    .paginate();
  const users = await features.query;
  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
});

// Get user by ID
export const getUserById = catchAsync(async (req, res, next) => {
  // Find user by ID and exclude certain fields
  const user = await User.findById(req.params.id)
    .select("-__v -password")
    .populate({
      path: "cart.productId",
      model: "Product",
    });

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

export const updateUserById = catchAsync(async (req, res, next) => {
  const profilePhoto = req.file?.filename || "";

  let user;
  const { role: bodyRole, id: bodyId, ...others } = req.body;

  if (profilePhoto) {
    const oldUser = await User.findById(req.params.id);
    user = await User.findByIdAndUpdate(
      req.params.id,
      { ...others, profilePhoto: profilePhoto },
      { new: true }
    );
    if (oldUser.profilePhoto) {
      fs.unlinkSync(`${__dirname}/Public/${oldUser.profilePhoto}`);
    }
  } else if (profilePhoto === "delete") {
    const oldUser = await User.findById(req.params.id);
    user = await User.findByIdAndUpdate(
      req.params.id,
      { ...others, profilePhoto: "" },
      { new: true }
    );
    if (oldUser.profilePhoto) {
      fs.unlinkSync(`${__dirname}/Public/${oldUser.profilePhoto}`);
    }
  } else {
    user = await User.findByIdAndUpdate(req.params.id, others, {
      new: true,
    });
  }

  return res.status(201).json({
    status: "success",
    data: user,
  });
});

// Delete user by ID
export const deleteUserById = catchAsync(async (req, res, next) => {
  // Delete user by ID
  const deleteUser = await User.findByIdAndDelete(req.params.id);

  // Check if user had a profile photo and delete it
  if (deleteUser.profilePhoto) {
    fs.unlinkSync(`${__dirname}/Public/${deleteUser.imageUrl}`);
  }
  return res.status(201).json({
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

  // Check if product exists
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

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const removeFromFavorite=catchAsync(async(req,res,next)=>{
  const user=await User.findByIdAndUpdate(req.params.id,{$pull:{favorites:req.body.productId}},{new:true})
  return res.status(200).json({
    status:'success',
    data:{user}
  })
})

// Add item to cart
export const addToCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { productId, quantity } = req.body;

  // Check if user exists and populate cart
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  // Check if product exists
  const cardProduct = await Product.findById(productId);
  if (!cardProduct) {
    return res.status(404).json({
      status: "error",
      message: "Product not found",
    });
  }

  // Check if the item already exists in cart
  const cartItemIndex = user.cart.findIndex((item) =>
    item.productId._id.equals(productId)
  );

  if (cartItemIndex === -1) {
    // If item doesn't exist, add it to cart
    user.cart.push({ productId, quantity });
  } else {
    // If item exists, update its quantity
    user.cart[cartItemIndex].quantity += quantity;
  }

  await user.save();

  // Populate the cart products after saving
  await user.populate("cart.productId");

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

// Delete item quantity from cart
export const deletItemQuantityCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { productId, quantity } = req.body;

  // Check if user exists
  const user = await User.findById(id);
  const product = await Product.findById(productId);
  if (!user || !product) {
    return res.status(404).json({
      status: "error",
      message: "User and product not found",
    });
  }

  // Find the cart item index
  const cartItemIndex = user.cart.findIndex((item) =>
    item.productId._id.equals(productId)
  );

  // If item not found in cart, return error
  if (cartItemIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Item not found in cart",
    });
  }

  // Calculate the new quantity
  const newQuantity = user.cart[cartItemIndex].quantity - quantity;

  if (newQuantity > 0) {
    // Update quantity if new quantity is greater than 0
    user.cart[cartItemIndex].quantity = newQuantity;
  } else {
    // Remove item from cart if new quantity is 0 or less
    user.cart.splice(cartItemIndex, 1);
  }

  await user.save();
  const updatedUser = await User.findById(id).populate("cart.productId");

  res.status(201).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
// Delete all item cart
export const deletAllItemCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }
  user.cart = [];
  await user.save();
  res.status(200).json({
    status: "success",
    data: { user },
  });
});
// delete id product
export const deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
});
// Update user wallet balance
export const updateUserWallet = catchAsync(async (req, res, next) => {
  const { wallet } = req.body;
  const { id } = req.params;

  // Find the user by ID
  const user = await User.findById(id).populate("cart.productId");
  if (!user) {
    return next(new HandleError("User not found", 404));
  }

  // Update the wallet balance
  user.wallet.balance += wallet.balance;
  await user.save();

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});
