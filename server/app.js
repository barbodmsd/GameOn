import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import userRoute from "./Routes/userRoute.js";
import productRoute from "./Routes/productRoute.js";
import categoryRoute from "./Routes/categoryRoute.js";
import sliderRoute from "./Routes/sliderRoute.js";
import bannerRoute from "./Routes/bannerRoute.js";
import authRoute from "./Routes/authRoute.js";
import HandleError from "./Utils/handleError.js";
import catchError from "./Utils/catchError.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

// middlewares
app.use(express.json());
app.use(express.static("Public"));
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/categories", categoryRoute);
app.use("/sliders", sliderRoute);
app.use("/banners", bannerRoute);
app.use("/auth", authRoute);
app.use("*", (req, res, next) => {
  return next(new HandleError("Route Not Found", 404));
});
app.use(catchError);

export default app
