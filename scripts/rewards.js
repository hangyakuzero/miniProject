const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory

  const solreward= await ethers.getContractFactory("Reward");

 const addressofsolar = "//add address here";
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
