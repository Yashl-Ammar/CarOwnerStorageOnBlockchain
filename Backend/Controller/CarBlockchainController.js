const Web3= require("web3-eth")
const abi= require("../utils/abi");
const web3= new Web3("http://127.0.0.1:7545")
const contractAddress = "0x0cCEaACe4BD0610801eFe1aa826dC79393D0f00d"; // Replace with your contract's address
const contract = new web3.eth.Contract(abi, contractAddress);
const accountAddress="0x3ba0860ed5a9bac302e1a9edb8acf5ef0cef3c5c2fbb7fb2de82c244aaee6c12";
const registerCar2 = async (req, res) => {
    try {
        const { 
            manufactureDate, 
            numberPlate, 
            chassisNumber, 
            previousOwners, 
            make, 
            model, 
            varient 
        } = req.body;

        // Fetch car details from the blockchain
        const carDetails = await carDataContract.methods.getCarDetails(chassisNumber).call();

        // Check if the car already exists
        // Assuming that for a non-existent car, the contract returns an empty string for manufactureDate
        if (carDetails.manufactureDate !== '') {
            return res.status(400).send("Car Already Exists");
        }

        // Call the addCar function of your smart contract
        const tx = await carDataContract.methods.addCar(
            chassisNumber,
            manufactureDate,
            numberPlate,
            previousOwners,
            make,
            model,
            varient
        ).send({ from: accountAddress });

        // Wait for the transaction to be mined
        await tx.wait();

        res.send(`Car with chassis number ${chassisNumber} registered`);
    } catch (error) {
        console.error('Error Registering a car: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports={
    registerUser2
}