import express from "express";
import {getUserById, 
  addFavoriteProduct,
  addToCart,
  deleteUserById,
  getAllUser,
  updateUserById,
  updateUserWallet,
} from "../Controllers/UserCn.js";
import upload from "../Utils/UploadFile.js";
import { checkAdmin } from "../Middleware/checkAdmin.js";
import { checkUser } from "../Middleware/checkUser.js";

const userRoute = express.Router();
userRoute.route("/").get(checkAdmin,getAllUser);
userRoute.route("/:id").patch(checkUser,upload.single("file"), updateUserById).delete(checkAdmin,deleteUserById).get(checkAdmin,getUserById);
userRoute.route("/:id/cart").post(checkUser,addToCart);
userRoute.route("/favorites/:id").post(checkUser,addFavoriteProduct);
userRoute.route("/:id/wallet").post(checkUser,updateUserWallet);
export default userRoute;
