module.exports =function(req,res,next){
    
    if(req.user.role!=="Owner") return res.status(403).send("Access Denied")
    next()
}