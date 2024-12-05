const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const SF = await ethers.getContractFactory("SF");
  const WF = await ethers.getContractFactory("WF");
  const DSU = await ethers.getContractFactory("DSU");
  const VPS= await ethers.getContractFactory("VPS");
  const SM= await ethers.getContractFactory("sm");
 const initowner = "0x1f9748893999BeC6339E4aDa234BD473cf232050";
  // Deploy the contract

  //solar farms
  const st = await SF.deploy(initowner);
  console.log("Contract instance SF:", st);
  console.log("Solar Farms deployed to:", st.target);
  
  // Wait for deployment to finish
  
  // Output the contract address
  //windmill contract
  const wt = await WF.deploy(initowner);
  console.log("Contract instance SF:", wt);
  console.log("Wind Farm deployed to:", wt.target);
  
//dayanand sagar
 /* const dt = await DSU.deploy(initowner);
  console.log("Contract instance DSU:", dt);
  console.log("Daya deployed to:", dt.target); */


  //vps
const vt = await VPS.deploy(initowner);
console.log("Contract instance DSU:", vt);
console.log("VPS tbt deployed to:", vt.target);

  
}

// Execute the main function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
