// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarData {
    struct Car {
        string manufactureDate;
        uint256 numberPlate;
        string[] previousOwners;
        string make;
        string model;
        string varient;
        uint256 accidentCount;
        string[] accidentDetails;
        uint256 maintenanceCount;
        string[] maintenanceDetails;
    }

    mapping(uint256 => Car) public cars;

    function addCar(
        uint256 chassisNumber,
        string memory manufactureDate,
        uint256 numberPlate,
        string[] memory previousOwners,
        string memory make,
        string memory model,
        string memory varient
    ) external {
        Car storage newCar = cars[chassisNumber];
        newCar.manufactureDate = manufactureDate;
        newCar.numberPlate = numberPlate;
        newCar.previousOwners = previousOwners;
        newCar.make = make;
        newCar.model = model;
        newCar.varient = varient;
    }

    function updateAccidentDetails(uint256 chassisNumber, string memory accidentDetail) external {
        Car storage car = cars[chassisNumber];
        car.accidentDetails.push(accidentDetail);
        car.accidentCount++;
    }

    function updateMaintenanceDetails(uint256 chassisNumber, string memory maintenanceDetail) external {
        Car storage car = cars[chassisNumber];
        car.maintenanceDetails.push(maintenanceDetail);
        car.maintenanceCount++;
    }

    function addOwner(uint256 chassisNumber, string memory newOwner) external {
        Car storage car = cars[chassisNumber];
        car.previousOwners.push(newOwner);
    }

    function getCarDetails(uint256 chassisNumber) external view returns (
        string memory manufactureDate,
        uint256 numberPlate,
        string[] memory previousOwners,
        string memory make,
        string memory model,
        string memory varient,
        uint256 accidentCount,
        string[] memory accidentDetails,
        uint256 maintenanceCount,
        string[] memory maintenanceDetails
    ) {
        Car storage car = cars[chassisNumber];
        return (
            car.manufactureDate,
            car.numberPlate,
            car.previousOwners,
            car.make,
            car.model,
            car.varient,
            car.accidentCount,
            car.accidentDetails,
            car.maintenanceCount,
            car.maintenanceDetails
        );
    }
}
