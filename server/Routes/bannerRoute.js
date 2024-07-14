import express from "express";
import { createBanner, deleteBanner, getAllBanner } from "../Controllers/BannerCn.js";
import upload from "../Utils/uploadFile.js";
const bannerRoute = express.Router();

bannerRoute
  .route("/")
  .post(upload.single("file"), createBanner)
  .get(getAllBanner);

bannerRoute.route('/:id').delete(deleteBanner)  
export default bannerRoute;
