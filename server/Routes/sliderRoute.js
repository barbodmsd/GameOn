import express from 'express'
import { createSlider, deleteSlider, getAllSlider } from '../Controllers/SliderCn.js'
const sliderRoute=express.Router()
sliderRoute.route("/").get(getAllSlider).post(createSlider)
sliderRoute.route("/:id").delete(deleteSlider)

export default sliderRoute