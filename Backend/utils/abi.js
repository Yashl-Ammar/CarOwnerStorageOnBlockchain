module.exports =  [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "chassisNumber",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "manufactureDate",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "numberPlate",
        "type": "uint256"
      },
      {
        "internalType": "string[]",
        "name": "previousOwners",
        "type": "string[]"
      },
      {
        "internalType": "string",
        "name": "make",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "model",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "varient",
        "type": "string"
      }
    ],
    "name": "addCar",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "chassisNumber",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "newOwner",
        "type": "string"
      }
    ],
    "name": "addOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "cars",
    "outputs": [
      {
        "internalType": "string",
        "name": "manufactureDate",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "numberPlate",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "make",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "model",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "varient",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "accidentCount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maintenanceCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "chassisNumber",
        "type": "uint256"
      }
    ],
    "name": "getCarDetails",
    "outputs": [
      {
        "internalType": "string",
        "name": "manufactureDate",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "numberPlate",
        "type": "uint256"
      },
      {
        "internalType": "string[]",
        "name": "previousOwners",
        "type": "string[]"
      },
      {
        "internalType": "string",
        "name": "make",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "model",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "varient",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "accidentCount",
        "type": "uint256"
      },
      {
        "internalType": "string[]",
        "name": "accidentDetails",
        "type": "string[]"
      },
      {
        "internalType": "uint256",
        "name": "maintenanceCount",
        "type": "uint256"
      },
      {
        "internalType": "string[]",
        "name": "maintenanceDetails",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "chassisNumber",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "accidentDetail",
        "type": "string"
      }
    ],
    "name": "updateAccidentDetails",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "chassisNumber",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "maintenanceDetail",
        "type": "string"
      }
    ],
    "name": "updateMaintenanceDetails",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];