import express from "express";
import { createBanner, deleteBanner, getAllBanner } from "../Controllers/BannerCn.js";
import upload from "../Utils/uploadFile.js";
import { verifyAdmin } from "../Middleware/verifyAdmin.js";
const bannerRoute = express.Router();

bannerRoute
  .route("/")
  .post(verifyAdmin,upload.single("file"), createBanner)
  .get(getAllBanner);

bannerRoute.route('/:id').delete(verifyAdmin,deleteBanner)  
export default bannerRoute;
