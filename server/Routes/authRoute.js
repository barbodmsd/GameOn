import express from "express";
import { login, register, sendSms, verifyCode } from "../Controllers/AuthCn.js";
const authRoute = express.Router();

authRoute.route("/register").post(register)
authRoute.route("/login").post(login)
authRoute.route("/send-sms").post(sendSms)
authRoute.route("/verify-sms").post(verifyCode)

export default authRoute;
