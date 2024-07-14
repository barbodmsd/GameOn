import express from "express";
import { login, register } from "../Controllers/AuthCn.js";
const authRoute = express.Router();

authRoute.route("/register").post(register)
authRoute.route("/").post(login)

export default authRoute;
