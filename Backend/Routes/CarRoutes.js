const express= require('express')
const carRouter=express.Router()
const verifyOwnerLoggedIn=require('../Middleware/authentication')
const isOwner=require('../Middleware/isOwner')
const {registerCar2}=require("../Controller/CarBlockchainController");
const{registerCar,getCarDetail,getAllCars,transferOwner,recordAccident,recordMaintenance}=require('../Controller/CarController')
carRouter.post('/registerCar',verifyOwnerLoggedIn,isOwner,registerCar)
carRouter.get('/getCarDetail/:ChassisNumber',verifyOwnerLoggedIn,isOwner,getCarDetail)
carRouter.get('/getAllCars',verifyOwnerLoggedIn,isOwner,getAllCars)
carRouter.put('/transferOwnership/:ChassisNumber',verifyOwnerLoggedIn,isOwner,transferOwner)
carRouter.put('/carAccidentRecord/:ChassisNumber',verifyOwnerLoggedIn,isOwner,recordAccident)
carRouter.put('/carMaintenanceRecord/:ChassisNumber',verifyOwnerLoggedIn,isOwner,recordMaintenance)
carRouter.post('/registerCar2',registerCar2)
module.exports=carRouter