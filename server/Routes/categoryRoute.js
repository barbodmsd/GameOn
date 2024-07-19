import express from 'express'
import { createCategory, deleteCategory, getAllCategory } from '../Controllers/CategoryCn.js';
import upload from '../Utils/uploadFile.js';
import { checkAdmin } from '../Middleware/checkAdmin.js';
const categoryRoute=express.Router()

categoryRoute
  .route("/")
  .post(checkAdmin,upload.array("file"), createCategory)
  .get(getAllCategory);

  categoryRoute.route('/:id').delete(checkAdmin,deleteCategory)  

export default categoryRoute