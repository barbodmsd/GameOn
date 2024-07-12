import express from 'express'
import { addFavoriteProduct, addToCart, deleteUserById, getAllUser, updateUserById } from '../Controllers/UserCn.js'
import upload from "../Utils/UploadFile.js"

const userRoute=express.Router()
userRoute.route("/").get(getAllUser)
userRoute.route("/:id").patch(upload.single('file'),updateUserById).delete(deleteUserById)
userRoute.route("/:id/cart").post(addToCart)
userRoute.route("/:id/favorites").post(addFavoriteProduct)
userRoute.route("/:id/wallet").post(updateUserById)
export default userRoute