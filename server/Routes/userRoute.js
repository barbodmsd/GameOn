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
userRoute.get("/", checkAdmin, getAllUser);

// Route for getting, updating, or deleting a user by ID
userRoute.route("/:id")
  .get(checkAdmin, getUserById) // GET user by ID
  .patch(checkUser, upload.single("file"), updateUserById) // PATCH user by ID
  .delete(checkAdmin, deleteUserById); // DELETE user by ID

// Route for adding a product to the cart
// Route for deleting a product to the cart
userRoute.route("/:id/cart").delete(checkUser,deletItemQuantityCart).post(checkUser, addToCart)

// Route for adding a favorite product
userRoute.post("/:id/favorites", checkUser, addFavoriteProduct);

// Route for deleting a favorite product
userRoute.delete("/:id/favorites",checkUser)

// Route for updating user's wallet
userRoute.post("/:id/wallet", checkUser, updateUserWallet);

export default userRoute;
