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
    trim: true, // Added to remove any extra spaces
  },
  age: { // Fixed typo from 'ege' to 'age'
    type: String,
    trim: true,
  },
  platform: {
    type: String,
    trim: true,
  },
  region: { // Fixed typo from 'reigen' to 'region'
    type: String,
    trim: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Name Product Required"],
      trim: true,
      unique: [true, "Product name must be unique"], // Added unique constraint
    },
    description: {
      type: String,
      required: [true, "Description Product Required"],
    },
    price: {
      type: Number, // Changed from String to Number
      required: [true, "Price Product Required"],
    },
    images: [
      {
        type: String,
        // Removed required here to validate number of images separately if needed
      }
    ],
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    detailgames: detailgamesSchema,
    detailSistem: detailSistemSchema,
    color: [
      {
        type: String,
      }
    ],
    brand: {
      type: String,
    },
    top: {
      type: Boolean,
      default: false, // Added default value
    },
    populer: {
      type: Boolean,
      default: false, // Added default value
    },
    bestGame: {
      type: Boolean,
      default: false, // Added default value
    },
    mostSuled: {
      type: Boolean,
      default: false, // Added default value
    },
    key: {
      type: String,
      enum: ["digital", "physical"],
      required: [true, "Key Product Required"],
    }
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
