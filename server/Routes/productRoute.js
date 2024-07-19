import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getByIdProduct,
  updateProduct,
} from "../Controllers/ProductCn.js";
import { checkAdmin } from "../Middleware/checkAdmin.js";
import upload from "../Utils/uploadFile.js";
const productRoute = express.Router();
productRoute.route("/").get(getAllProduct).post(checkAdmin,upload.array("file"), createProduct);
productRoute.route("/:productId").get(getByIdProduct).patch(checkAdmin,upload.array("file"), updateProduct).delete(checkAdmin, deleteProduct);

export default productRoute;
