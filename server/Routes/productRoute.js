import express from 'express'
import { createProduct, deleteProduct, getAllProduct, getByIdProduct, updateProduct } from '../Controllers/ProductCn.js';
import { verifyAdmin } from '../Middleware/verifyAdmin.js';
const productRoute=express.Router()
productRoute.route("/").get(getAllProduct).post(verifyAdmin,createProduct)
productRoute.route("/:productId").get(getByIdProduct).patch(verifyAdmin,updateProduct).delete(verifyAdmin,deleteProduct)

export default productRoute