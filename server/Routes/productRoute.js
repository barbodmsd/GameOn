import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getByIdProduct,
  updateProduct,
} from "../Controllers/ProductCn.js";
import { checkAdmin } from "../Middleware/checkAdmin.js";
import upload from "../Utils/UploadFile.js";


const productRoute = express.Router();
// route main seting
productRoute
  .route("/")
  .get(getAllProduct)// route get all products
  .post(checkAdmin, upload.array("file"), createProduct);// route create product

// route get by id products seting
productRoute
  .route("/:productId")
  .get(getByIdProduct) // route get id product
  .patch(checkAdmin, upload.array("file"), updateProduct)// route update id product
  .delete(checkAdmin, deleteProduct);// route delet id product

export default productRoute;
