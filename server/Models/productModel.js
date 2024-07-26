import mongoose from "mongoose";

// Schema for system details of a product
const detailSistemSchema = new mongoose.Schema({
  ram: {
    name: { type: String, required: true }, // RAM name, required field
    value: { type: String, required: true }, // RAM value, required field
  },
  cpu: {
    name: { type: String, required: true }, // CPU name, required field
    value: { type: String, required: true }, // CPU value, required field
  },
  gpu: {
    name: { type: String, required: true }, // GPU name, required field
    value: { type: String, required: true }, // GPU value, required field
  },
  hard: {
    name: { type: String, required: true }, // Hard drive name, required field
    value: { type: String, required: true }, // Hard drive value, required field
  },
});

// Schema for game details
const detailgamesSchema = new mongoose.Schema({
  language: {
    type: String,
    trim: true, // Trims whitespace from the string
  },
  age: {
    type: String,
    trim: true, // Trims whitespace from the string
  },
  platform: {
    type: String,
    trim: true, // Trims whitespace from the string
  },
  region: {
    type: String,
    trim: true, // Trims whitespace from the string
  },
});

// Main product schema
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Name Product Required"], // Product title is required
      trim: true, // Trims whitespace from the string
      unique: [true, "Product name must be unique"], // Product title must be unique
    },
    description: {
      type: String,
      required: [true, "Description Product Required"], // Product description is required
    },
    price: {
      type: Number, // Product price, changed from String to Number
      trim: true, // Trims whitespace from the number
      required: [true, "Price Product Required"], // Product price is required
    },
    images: [
      {
        type: String, // URLs to product images
        // Removed required here to validate number of images separately if needed
      },
    ],
    categoryId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category", // References to the Category model
      },
    ],
    detailgames: [detailgamesSchema], // Array of game details schemas
    detailSistem: [detailSistemSchema], // Array of system details schemas
    color: [
      {
        type: String, // Product color options
      },
    ],
    brand: {
      type: String, // Product brand
    },
    top: {
      type: Boolean,
      default: false, // Default value for 'top' is false
    },
    populer: {
      type: Boolean,
      default: false, // Default value for 'populer' is false
    },
    bestGame: {
      type: Boolean,
      default: false, // Default value for 'bestGame' is false
    },
    mostSuled: {
      type: Boolean,
      default: false, // Default value for 'mostSuled' is false
    },
    key: {
      type: String,
      enum: ["digital", "physical"], // Key can be either 'digital' or 'physical'
      required: [true, "Key Product Required"], // Key is required
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Export the Product model, creating it if it doesn't already exist
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
