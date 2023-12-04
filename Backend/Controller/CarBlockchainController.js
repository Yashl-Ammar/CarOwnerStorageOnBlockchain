const { Web3 } = require('web3');
const abi = require("../utils/abi.js");
const web3 = new Web3('http://127.0.0.1:7545');
const contractAddress = "0x393d37b5Fdcc6a20420faD4ebedbdAeEc67aC25F"; // Replace with your contract's address
const carDataContract = new web3.eth.Contract(abi, contractAddress);
const accountAddress = "0x9e87CC6d7b21985FbB55B53F1219232900a05f78";

const recordMaintenance2 = async (req, res) => {
    try {
        const chassisNumber = req.params.ChassisNumber;
        const { maintenanceDetails } = req.body;

        // Estimate gas for the transaction
        const estimatedGas = await carDataContract.methods
            .updateMaintenanceDetails(chassisNumber, maintenanceDetails)
            .estimateGas({ from: accountAddress });

        // Increase the gas limit (explicitly convert to BigInt)
        const gasLimit = BigInt(estimatedGas) + BigInt(100000);

        // Send the transaction with the updated gas limit
        const tx = await carDataContract.methods
            .updateMaintenanceDetails(chassisNumber, maintenanceDetails)
            .send({ from: accountAddress, gasLimit: gasLimit.toString() });

        // Wait for the transaction to be mined using a promise
        await new Promise((resolve, reject) => {
            const intervalId = setInterval(async () => {
                const receipt = await web3.eth.getTransactionReceipt(tx.transactionHash);
                if (receipt && receipt.blockNumber) {
                    clearInterval(intervalId);
                    resolve();
                }
            }, 1000);
        });

        res.json({ message: 'Car Maintenance Recorded Successfully' });
    } catch (error) {
        console.error('Error Recording Car Maintenance: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




const recordAccident2 = async (req, res) => {
    try {
        const chassisNumber = req.params.ChassisNumber;
        const { accidentDetails } = req.body;

        const estimatedGas = await carDataContract.methods
            .updateAccidentDetails(chassisNumber, accidentDetails)
            .estimateGas({ from: accountAddress });

        console.log("Estimated Gas: ", estimatedGas);

        const tx = await carDataContract.methods
            .updateAccidentDetails(chassisNumber, accidentDetails)
            .send({ from: accountAddress, gasLimit: web3.utils.toHex(estimatedGas) });

        // Get the transaction receipt directly
        let receipt = null;
        while (receipt === null) {
            receipt = await web3.eth.getTransactionReceipt(tx.transactionHash);
            // Wait for a while and check again
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        res.json({ message: 'Car Accident Recorded Successfully' });
    } catch (error) {
        console.error('Error Recording Car Accident: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getAllCars2 = async (req, res) => {

    try {
        // Assuming your contract has a function to get the total number of cars
        const totalCars = await carDataContract.methods.getTotalCarCount().call();
        let cars = [];

        for (let i = 0; i < totalCars; i++) {
            // Assuming your contract has a way to get a car's chassis number by index
            const chassisNumber = await carDataContract.methods.getCarChassisNumberByIndex(i).call();

            // Fetch each car's details
            const carDetails = await carDataContract.methods.getCarDetails(chassisNumber).call();

            // Assuming you have owner information in carDetails
            if(carDetails.owner === req.user._id) {
                cars.push(carDetails);
            }
        }

        if (cars.length === 0) {
            return res.status(400).send("No Car Found");
        } else {
            res.send(cars);
        }
    } catch (error) {
        console.error('Error Getting All Cars: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCarDetail2 = async (req, res) => {
    try {
        const chassisNumber = req.params.ChassisNumber;

        // Call the getCarDetails function from the smart contract
        const carDetails = await carDataContract.methods.getCarDetails(chassisNumber).call();

        // Check if car exists. Adjust this based on how your contract handles non-existent cars.
        if (!carDetails || carDetails.numberPlate === 0) {
            return res.status(400).send("Car Not Found");
        }

        // Convert BigInt values to strings or numbers
        const formattedCarDetails = {
            manufactureDate: carDetails.manufactureDate,
            numberPlate: Number(carDetails.numberPlate), // or carDetails.numberPlate.toString()
            previousOwners: carDetails.previousOwners,
            make: carDetails.make,
            model: carDetails.model,
            varient: carDetails.varient,
            accidentCount: Number(carDetails.accidentCount),
            accidentDetails: carDetails.accidentDetails,
            maintenanceCount: Number(carDetails.maintenanceCount),
            maintenanceDetails: carDetails.maintenanceDetails,
        };

        // Send the formatted carDetails as the response
        res.send(formattedCarDetails);
    } catch (error) {
        console.error('Error in Getting Car Details: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

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
        const gasEstimate = await carDataContract.methods
            .addCar(
                chassisNumber,
                manufactureDate,
                numberPlate,
                previousOwners,
                make,
                model,
                varient
            )
            .estimateGas({ from: accountAddress });

        const gasLimit = BigInt(gasEstimate) + BigInt(100000);

        // Send the transaction and get the transaction receipt directly
        const receipt = await carDataContract.methods.addCar(
            chassisNumber,
            manufactureDate,
            numberPlate,
            previousOwners,
            make,
            model,
            varient
        ).send({
            from: accountAddress,
            gas: gasLimit.toString(), // Set a higher gas limit than estimated
        });

        // Check if the receipt status indicates success
        if (receipt.status === true) {
            res.send(`Car with chassis number ${chassisNumber} registered`);
        } else {
            res.send(`Car with chassis number ${chassisNumber} registered`);
        }
    } catch (error) {
        console.error('Error Registering a car: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    registerCar2,
    getCarDetail2,
    getAllCars2,
    recordAccident2,
    recordMaintenance2
};
