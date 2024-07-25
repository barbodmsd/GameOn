import mongoose from "mongoose";

const detailSistemSchema = new mongoose.Schema({
  ram: {
    name: { type: String, required: true },
    value: { type: String, required: true },
  },
  cpu: {
    name: { type: String, required: true },
    value: { type: String, required: true },
  },
  gpu: {
    name: { type: String, required: true },
    value: { type: String, required: true },
  },
  hard: {
    name: { type: String, required: true },
    value: { type: String, required: true },
  },
});

const detailgamesSchema = new mongoose.Schema({
  language: {
    type: String,
  },
  ege: {
    type: String,
  },
  platform: {
    type: String,
  },
  reigen: {
    type: String,
  },
})

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Name Product Required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description Product Required"],
    },
    price: {
      type: String,
      required: [true, "Price Product Required"],
    },
    mainImage:{
      type:String,
      required: [true, "Main image Product Required"],
    },
    images: [
      {
        type: String,
        required: [true, "Images Product Required"],
      }
    ],
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    detailgames:detailgamesSchema,  
    detailSistem:detailSistemSchema,
    color: [
      {
        type: String,
      }
    ],
    brand:{
      type: String,
    },
    top: {
      type: Boolean,
    },
    populer: {
      type: Boolean,
    },
    bestGame: {
      type: Boolean,
    },
    mostSuled: {
      type: Boolean,
    },
    key:{
      type:String,
      enum:["digital","physical"],
      required: [true, "Key Product Required"],
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
