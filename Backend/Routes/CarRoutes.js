const express= require('express')
const carRouter=express.Router()
const verifyOwnerLoggedIn=require('../Middleware/authentication')
const isOwner=require('../Middleware/isOwner')
const {registerCar2,getCarDetail2, getAllCars2, recordAccident2, recordMaintenance2}=require("../Controller/CarBlockchainController");
const{registerCar,getCarDetail,getAllCars,transferOwner,recordAccident,recordMaintenance}=require('../Controller/CarController')
carRouter.post('/registerCar',verifyOwnerLoggedIn,isOwner,registerCar)
carRouter.get('/getCarDetail/:ChassisNumber',verifyOwnerLoggedIn,isOwner,getCarDetail)
carRouter.get('/getAllCars',verifyOwnerLoggedIn,isOwner,getAllCars)
carRouter.put('/transferOwnership/:ChassisNumber',verifyOwnerLoggedIn,isOwner,transferOwner)
carRouter.put('/carAccidentRecord/:ChassisNumber',verifyOwnerLoggedIn,isOwner,recordAccident)
carRouter.put('/carMaintenanceRecord/:ChassisNumber',verifyOwnerLoggedIn,isOwner,recordMaintenance)

//Blockchain routes
carRouter.post('/registerCar2',verifyOwnerLoggedIn,isOwner,registerCar2)
carRouter.get('/getCarDetail2/:ChassisNumber',verifyOwnerLoggedIn,isOwner,getCarDetail2)
carRouter.get('/getAllCars2',verifyOwnerLoggedIn,isOwner,getAllCars2)
carRouter.put('/carAccidentRecord2/:ChassisNumber',verifyOwnerLoggedIn,isOwner,recordAccident2)
carRouter.put('/carMaintenanceRecord2/:ChassisNumber',verifyOwnerLoggedIn,isOwner,recordMaintenance2)


module.exports=carRouter