import express from "express";
import { createBanner, deleteBanner, getAllBanner } from "../Controllers/BannerCn.js";
import upload from "../Utils/uploadFile.js";
import { checkAdmin } from "../Middleware/checkAdmin.js";
const bannerRoute = express.Router();

bannerRoute.route("/").post(checkAdmin,upload.single("file"), createBanner).get(getAllBanner);

bannerRoute.route('/:id').delete(checkAdmin,deleteBanner)  
export default bannerRoute;
