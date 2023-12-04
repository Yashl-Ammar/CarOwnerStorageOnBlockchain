const express=require("express")
const ownerRoute= express.Router()
const {ownerSignIn,ownerSignup}=require("../Controller/OwnerController")
ownerRoute.post("/signup",ownerSignup)
ownerRoute.post("/signin",ownerSignIn)
module.exports=ownerRoute;