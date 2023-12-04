const Owner=require("../Models/Owner")
const _=require("lodash")
const bcrypt=require("bcryptjs")
const jwt = require("jsonwebtoken");
const ownerSignup= async(req,res)=>{
    const {fname,lname,email,DoB,contactDetails,cnic,password,country}=req.body
    let owner= await Owner.findOne({email})
    if(owner) return res.status(400).send("Account Already Exist")
    owner =new Owner({
    fname,
    lname,
    email,
    DoB,
    contactDetails,
    cnic,
    password,
    country
    })
    const salt= await bcrypt.genSalt(10)
    owner.password=await bcrypt.hash(owner.password,salt)
    await owner.save()

    res.send(_.pick(client,['_id','fname','lname','email','DoB','contactDetails','cnic','country']))
}
const ownerSignIn=async (req,res)=>{
    const {email,password,rememberMe}=req.body
    let owner= await Owner.findOne({email})

    if(!owner) return res.status(400).send("Invalid Email or Password")
        
    
    let validPassword=await bcrypt.compare(password,owner.password)
    if(!validPassword)  return res.status(400).send("Invalid Email or Password")
    const token= owner.generateAuthtoken(rememberMe)
    res.send(token)
}

module.exports={ownerSignIn,ownerSignup};