import Category from "../Models/categoryModel.js";
import Product from "../Models/productModel.js";
import catchAsync from "../Utils/catchAsync.js";

export const search = catchAsync(async (req, res) => {
  const categories = await Category.find({ title: { $regex: req.body.query } });
  const products = await Product.find({ title: { $regex: req.body.query } });
  return res.status(200).json({
    status: "success",
    data: { products, categories },
  });
});
