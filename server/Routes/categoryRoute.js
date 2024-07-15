import express from 'express'
import { createCategory, deleteCategory, getAllCategory } from '../Controllers/CategoryCn.js';
import upload from '../Utils/uploadFile.js';
import { verifyAdmin } from '../Middleware/verifyAdmin.js';
const categoryRoute=express.Router()

categoryRoute
  .route("/")
  .post(verifyAdmin,upload.single("file"), createCategory)
  .get(getAllCategory);

  categoryRoute.route('/:id').delete(verifyAdmin,deleteCategory)  

export default categoryRoute