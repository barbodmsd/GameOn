import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true, 
    min: 1,
  },
});


const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username Required"],
      trim: true,
      unique: [true, "Username already taken"], // add unique
    },
    email: {
      type: String,
      required: [true, "Email Required"], 
      unique: [true, "Email Already Taken"],
      match: [/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gm, "Email Invalid"],
    },
    password: {
      type: String,
      required: [true, "Password Required"], 
      match: [/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g,"Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long.",
  ],
    },
    address: [addressSchema], 
    profilePhoto: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Phone Required"], 
      unique: [true, 'Phone number already exists'],
    },
    cart: [cartItemSchema], 
    wallet: {
      balance: {
        type: Number,
        default: 0,
      },
    },
    token: {
      type: String,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
