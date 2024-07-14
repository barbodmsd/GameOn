import Product from "../Models/productModel.js";
import User from "../Models/userModel.js";
import catchAsync from "../Utils/catchAsync.js";
import jwt from "jsonwebtoken";
export const verifyAdmin = catchAsync(async (req, res, next) => {
  if (!req.headers["authorization"]?.split(" ")[1]) {
    return res.status(401).json({
      success: false,
      message: "token required",
    });
  }
  const token = req.headers["authorization"]?.split(" ")[1];
  const { id } = jwt.verify(token, process.env.SECRET_KEY);
  const verifyUser = await User.findById(id);
  let rolesAccess = ["admin"];
  if (req.method === "POST") {
    if (rolesAccess.includes(verifyUser.role)) {
      if (verifyUser.role === "shopkeeper" && !verifyUser.shopkeeperConfirmed) {
        res.status(401).json({
          success: false,
          message: "ShopKeeper is not confirmed",
        });
      }
      next();
    } else {
      res.status(401).json({
        success: false,
        message: " user does not access to add product",
      });
    }
  } else if (
    req.method === "PATCH" ||
    req.method === "DELETE" ||
    req.method === "PUT"
  ) {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    const isShopkeeper = product.shopkeeperId === id;
    if (
      isShopkeeper ||
      verifyUser.role === "admin" ||
      verifyUser.role === "superAdmin"
    ) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "You are not authorized for this operation",
      });
    }
  }
});
