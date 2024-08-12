import Category from "../Models/categoryModel.js";
import Product from "../Models/productModel.js";
import catchAsync from "../Utils/catchAsync.js";

export const search = catchAsync(async (req, res) => {
  const { search } = req.body;
  const regex = new RegExp(search, "i"); // 'i' makes the search case-insensitive

  const category = await Category.find({ title: { $regex: regex } });
  const product = await Product.find({ title: { $regex: regex } });
  return res.status(200).json({
    status: "success",
    data: { product, category },
  });
});
