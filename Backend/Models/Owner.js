const mongoose= require("mongoose")
const jwt=require("jsonwebtoken")
require("dotenv").config();
const ownerSchema=new mongoose.Schema({
    fname:{
        type: String,
        require:true,
    },
    lname:{
        type: String,
        require:true,
    },
    email:{
        type: String,
        require:true,
        unique:true,
        minlength:5,
        maxlength:255
    },
    DoB:{
        type: String,
        require:true,
    },
    password:{
        type: String,
        require:true,
        minlength:5,
        maxlength:1024
    },
    contactDetails:{
        type: String,
        require:true
    },
    cnic:{
        type: String,
        require:true
    }
    
},
{ timestamps: true })
ownerSchema.methods.generateAuthtoken =function(rememberMe){
    if(rememberMe)
    {
        expiresIn="720h"
    }
    else
    {
        expiresIn='4h'
    }
    const token = jwt.sign({_id:this._id,role:'Owner'},process.env.SECRET_KEY ,{expiresIn:expiresIn} )
    return token
}
const Owner= mongoose.model("Owner",ownerSchema )
module.exports=Owner;