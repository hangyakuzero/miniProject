const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory

  const solreward= await ethers.getContractFactory("RewardDistributor");

 const addressofsolar = "0xa1fDfEFeA2f304B47AcD0D47597D006f3FaE0D8C";
  // Deploy the contract

  //solar farms
 
  //vps
const sr = await solreward.deploy(addressofsolar);
console.log("Contract instance solar rewards:", sr);
console.log("SolarRewards deployed to:", sr.target); 
}

// Execute the main function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
