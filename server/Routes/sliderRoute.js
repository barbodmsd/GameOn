import express from 'express'
import { createSlider, deleteSlider, getAllSlider } from '../Controllers/SliderCn.js'
import { checkAdmin } from '../Middleware/checkAdmin.js'
import upload from '../Utils/UploadFile.js'
const sliderRoute=express.Router()
sliderRoute.route("/").get(getAllSlider).post(checkAdmin,upload.single("file"),createSlider)
sliderRoute.route("/:id").delete(checkAdmin,deleteSlider)

export default sliderRoute