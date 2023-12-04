async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const CarData = await ethers.getContractFactory("CarData");
  const carData = await CarData.deploy();
  console.log("CarData contract deployed to:", carData.address)

  // Wait for the transaction to be mined
  
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
