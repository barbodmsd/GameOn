import express from 'express'
import { createCategory, deleteCategory, getAllCategory } from '../Controllers/CategoryCn.js';
import upload from '../Utils/uploadFile.js';
const categoryRoute=express.Router()

categoryRoute
  .route("/")
  .post(upload.single("file"), createCategory)
  .get(getAllCategory);

  categoryRoute.route('/:id').delete(deleteCategory)  

export default categoryRoute