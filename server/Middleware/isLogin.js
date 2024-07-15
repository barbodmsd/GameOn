import catchAsync from "../Utils/catchAsync.js";
import jwt from "jsonwebtoken";
const isLogin = catchAsync(async (req, res, next) => {
  try {
    const bearerToken = req?.headers?.authorization.split(" ")[1];
    const { token } = jwt.verify(bearerToken, process.env.SECRET_KEY);
    return next()
  } catch (error) {
    return res.status(401).json({
        status: "fail",
        message:'Should be login at the first!'
    })
  }
});

export default isLogin