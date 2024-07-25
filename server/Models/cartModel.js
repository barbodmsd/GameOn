import mongoose, { Mongoose } from "mongoose";

const cartItemshema = new Mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "ProductId is required"],
  },
  quantity: {
    type:Number,
    require: true,
    min: 1
  }
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: [true, "UserId is required"],
  },
  items :{
    type: cartItemshema,
  }
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
