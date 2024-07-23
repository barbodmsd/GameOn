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

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Name Product Required"],
      trim: true,
    },
    images: [
      {
        type: String,
        required: [true, "Images Product Required"],
      }
    ],
    price: {
      type: String,
      required: [true, "Price Product Required"],
    },
    description: {
      type: String,
      required: [true, "Description Product Required"],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    language: {
      type: String,
    },
    ege: {
      type: String,
    },
    platform: {
      type: String,
    },
    color: [
      {
        type: String,
      }
    ],
    brand:{
      type: String,
    },
    reigen: {
      type: String,
    },
    detailSistem: [detailSistemSchema],
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
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
