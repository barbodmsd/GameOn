import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";
import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";
import { sendAuthCode, verifyAuthCode } from "../Utils/smsHandler.js";

export const register = catchAsync(async (req, res, next) => {
  const { password, ...others } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  const newUser = await User.create({ ...others, password: hashPassword });
  const token = jwt.sign(
    { role: newUser.role, id: newUser._id },
    process.env.SECRET_KEY
  );
  return res.status(201).json({
    status: "success",
    message: "Register successfully",
    data: { user: newUser, token },
  });
});
export const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).populate('orders')
  if (!user) {
    return next(new HandleError("username or password is incorrect"));
  }
  const compare = bcrypt.compareSync(password, user.password);
  if (!compare) {
    return next(new HandleError("username or password is incorrect"));
  }
  const token = jwt.sign(
    { role: user.role, id: user._id },
    process.env.SECRET_KEY
  );
  return res.status(200).json({
    status: "success",
    message: "Login successfully",
    data: {
      user,
      token,
    },
  });
});

export const sendSms = catchAsync(async (req, res, next) => {
  const { phone } = req.body;
  const user = await User.findOne({ phone });
  if (!user) {
    return next(new HandleError("user with this phone number not exist"));
  }
  const send = await sendAuthCode(phone);
  if (!send.success) {
    return next(new HandleError(send.message, 500));
  }
  return res.status(200).json({
    send,
  });
});

export const verifyCode = catchAsync(async (req, res, next) => {
  const { code, phone } = req.body;
  const user = await User.findOne({ phone }).populate('orders')
  const verify = await verifyAuthCode(phone, code);
  if (!verify.success) {
    return next(new HandleError("code incorrect", 400));
  }
  const token = jwt.sign(
    { role: user.role, id: user._id },
    process.env.SECRET_KEY
  );
  return res.status(200).json({
    status: "success",
    message: "Login successfully",
    data: {
      user,
      token,
    },
  });
});
