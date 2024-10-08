const jwt = require("jsonwebtoken");
require("dotenv").config()
let verifyuserloggedIn = (req, res, next) => {
  let token = req.headers["token"];
  if(!token) return res.status(401).send("Access denied. No token provided.")

  try{
    const decoded=jwt.verify(token,process.env.SECRET_KEY)
    req.user=decoded
    next();
  }catch(ex){
    res.status(400).send("Invalid token.")
  }
};
module.exports = 
  verifyuserloggedIn
