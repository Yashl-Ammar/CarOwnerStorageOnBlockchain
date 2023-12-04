const mongoose= require("mongoose")
const jwt=require("jsonwebtoken")
require("dotenv").config();
const carSchema=new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner", // Reference to the client who placed the order
        required: true,
    },
    manufactureDate:{
        type: String,
        require:true,
    },
    numberPlate:{
        type:Number,
        unique:true,
        require:true
    },
    chassisNumber:{
        type:Number,
        unique:true,
        require:true
    },
    previousOwners:{
        type: [String],
    },
    make:{
        type: String,
    },
    model:{
        type: String,
    },
    varient:{
        type: String,
    },
    accidentCount:{
        type: Number,
        default:0
    },
    accidentDetails:{
        type: [String],
    },
    maintenanceCount:{
        type: Number,
        default:0
    },
    maintenanceDetails:{
        type: [String],
    },
},
{ timestamps: true })

const Car= mongoose.model("Car",carSchema )
module.exports=Car;