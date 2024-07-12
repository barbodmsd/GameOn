import mongoose from "mongoose"


const sliderSchema = new mongoose.Schema({

    title:{
        type:String,
    },
    image:{
        type:String,
    }

},{timestamps:true})


const Slider = mongoose.model("Slider",sliderSchema)

export default Slider