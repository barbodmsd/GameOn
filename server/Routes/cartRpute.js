import express from "express"

const cartRute = express.Router()

cartRute.route("/").post()


export default cartRute