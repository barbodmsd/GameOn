import express from "express";
import {
  getUserById,
  addFavoriteProduct,
  addToCart,
  deleteUserById,
  getAllUser,
  updateUserById,
  updateUserWallet,
  deletItemQuantityCart,
} from "../Controllers/UserCn.js";
import upload from "../Utils/UploadFile.js";
import { checkAdmin } from "../Middleware/checkAdmin.js";
import { checkUser } from "../Middleware/checkUser.js";

const userRoute = express.Router();

// Route for getting all users
userRoute.route("/").get(checkAdmin, getAllUser);

// Route for getting, updating, or deleting a user by ID
userRoute
  .route("/:id")
  .get(checkAdmin, checkUser, getUserById) // GET user by ID
  .patch(checkUser, upload.single("file"), updateUserById) // PATCH user by ID
  .delete(checkAdmin, checkUser, deleteUserById); // DELETE user by ID


// Route cart
userRoute
  .route("/:id/add-cart")
  .post(checkUser, addToCart); // Route for deleting a product to the cart
userRoute
  .route("/:id/remove-cart")
  .delete(checkUser, deletItemQuantityCart) // Route for adding a product to the cart

// Route favorite product
userRoute
  .route("/:id/favorites")
  .post(checkUser, addFavoriteProduct) // Route for adding a favorite product
  .delete(checkUser); // Route for deleting a favorite product

// Route for updating user's wallet
userRoute.route("/:id/wallet").post(checkUser, updateUserWallet);

export default userRoute;
