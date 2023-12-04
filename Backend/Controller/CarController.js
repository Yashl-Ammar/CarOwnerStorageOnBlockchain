const Car=require('../Models/Car')
const Owner=require('../Models/Owner')
const registerCar=async(req,res)=>{
    try{
        const{manufactureDate,numberPlate,chassisNumber,previousOwners,make,model,varient,accidentCount,accidentDetails,maintenanceCount,maintenanceDetails}=req.body
        const owner=req.user._id
        let car= await Car.findOne({chassisNumber})
        if(car) return res.status(400).send("Car Already Exist")
        car =new Car({
            owner,
            manufactureDate,
            numberPlate,
            chassisNumber,
            previousOwners,
            make,
            model,
            varient,
            accidentCount,
            accidentDetails,
            maintenanceCount,
            maintenanceDetails
            })
            await car.save()
    
            res.send(car)
    } catch (error) {
        console.error('Error Registering a car: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
   
}
const getCarDetail=async(req,res)=>{
    try{
        const chassisNumber=req.params.ChassisNumber
        let car= await Car.findOne({chassisNumber})
        if(!car) return res.status(400).send("Car Not Found")
        else res.send(car)
    } catch (error) {
        console.error('Error in Getting car Details: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  
}
const getAllCars=async(req,res)=>{
    try{
        const car=await Car.find({})
        if(!car) return res.status(400).send("No Car Found")
        else res.send(car)
    } catch (error) {
        console.error('Error Getting All Cars: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const transferOwner=async(req,res)=>{
    try {
        const { email } = req.body; 
        const chassisNumber = req.params.ChassisNumebr;

        const car = await Car.findOne({chassisNumber});

        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        const owner=await Owner.findOne({email})
        if (!owner) {
            return res.status(404).json({ error: 'Owner with this email Not exist' });
        }
        car.owner = owner._id;
        
        await car.save();

        res.json({ message: 'Car ownership transferred successfully', car });
    } catch (error) {
        console.error('Error transferring car ownership:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const recordAccident=async(req,res)=>{
    try{
        const chassisNumber= req.params.ChassisNumber
        const{accidentDetails}=req.body
        const car =await Car.findOne({chassisNumber})

        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        car.accidentDetails=accidentDetails
        car.accidentCount++
        await car.save()
       
        res.json({ message: 'Car Accident Recorded Successfully', car });
    } catch (error) {
        console.error('Error Recording car accident: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const recordMaintenance=async(req,res)=>{
    try{
        const chassisNumber= req.params.ChassisNumber
        const{maintenanceDetails}=req.body
        const car =await Car.findOne({chassisNumber})

        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        car.maintenanceDetails=maintenanceDetails
        car.maintenanceCount++
        await car.save()
       
        res.json({ message: 'Car Maintenance Recorded Successfully', car });
    } catch (error) {
        console.error('Error Recording car accident: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports={registerCar,getCarDetail,getAllCars,transferOwner,recordAccident,recordMaintenance}