import express from "express";
import {getUserById, 
  addFavoriteProduct,
  addToCart,
  deleteUserById,
  getAllUser,
  updateUserById,
  updateUserWallet,
} from "../Controllers/UserCn.js";
import upload from "../Utils/uploadFile.js";

const userRoute = express.Router();
userRoute.route("/").get(getAllUser);
userRoute
  .route("/:id")
  .patch(upload.single("file"), updateUserById)
  .delete(deleteUserById)
  .get(getUserById);
userRoute.route("/:id/cart").post(addToCart);
userRoute.route("/:id/favorites").post(addFavoriteProduct);
userRoute.route("/:id/wallet").post(updateUserWallet);
export default userRoute;
