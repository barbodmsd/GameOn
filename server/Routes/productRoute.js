import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getByIdProduct,
  updateProduct,
} from "../Controllers/ProductCn.js";
import { checkAdmin } from "../Middleware/checkAdmin.js";
const productRoute = express.Router();
productRoute.route("/").get(getAllProduct).post(checkAdmin, createProduct);
productRoute.route("/:productId").get(getByIdProduct).patch(checkAdmin, updateProduct).delete(checkAdmin, deleteProduct);

export default productRoute;
