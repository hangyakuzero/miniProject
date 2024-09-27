const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory

  const VPS= await ethers.getContractFactory("VPS");

 const initowner = "0x1f9748893999BeC6339E4aDa234BD473cf232050";
  // Deploy the contract

  //solar farms
 
  //vps
const vt = await VPS.deploy(initowner);
console.log("Contract instance DSU:", vt);
console.log("VPS tbt deployed to:", vt.target);
  //sm


  
}

// Execute the main function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
