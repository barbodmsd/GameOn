import mongoose from "mongoose";

// Schema for items in the shopping cart
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true, // Reference to the Product model, required field
  },
  quantity: {
    type: Number,
    required: true, // Quantity of the product, required field
    min: 1, // Minimum quantity is 1
  },
});

// Schema for the user's address
const addressSchema = new mongoose.Schema({
  street: {
    type: String, // Street address
  },
  city: {
    type: String, // City
  },
  state: {
    type: String, // State
  },
  zip: {
    type: Number, // Zip code
  },
  country: {
    type: String, // Country
  },
});

// Main user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username Required"], // Username is required
      trim: true, // Remove leading and trailing whitespace
      unique: [true, "Username already taken"], // Username must be unique
    },
    // email: {
    //   type: String,
    //   // required: [true, "Email Required"], // Email is required
    //   trim: true, // Remove leading and trailing whitespace
    //   unique: [true, "Email Already Taken"], // Email must be unique
    //   sparse: true,
    //   match: [
    //     // Regular expression to validate email format
    //     /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gm,
    //     "Email Invalid",
    //   ],
    // },
    password: {
      type: String,
      required: [true, "Password Required"], // Password is required
      trim: true, // Remove leading and trailing whitespace
      match: [
        // Regular expression to validate password format
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long.",
      ],
    },
    address: [addressSchema], // Array of address schemas for storing multiple addresses
    profilePhoto: {
      type: String, // URL to the profile photo
    },
    phone: {
      type: String,
      required: [true, "Phone Required"], // Phone number is required
      trim: true, // Remove leading and trailing whitespace
      unique: [true, "Phone number already exists"], // Phone number must be unique
    },
    cart: [cartItemSchema], // Array of cart item schemas for storing items in the cart
    wallet: {
      balance: {
        type: Number,
        default: 0, // Default balance is 0
      },
    },
    token: {
      type: String, // Field for storing a token (e.g., for authentication)
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // References to the Product model for favorite items
      },
    ],
    order: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // References to the Product model for favorite items
      },
    ],
    role: {
      type: String,
      enum: ["admin", "user"], // Role can be either 'admin' or 'user'
      default: "user", // Default role is 'user'
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Export the User model, creating it if it doesn't already exist
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
