import React, { useState } from "react";
import { ethers } from "ethers";

// Replace these placeholders with your contract's details
const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";
const ABI = [
  // Replace this with your contract's ABI (Application Binary Interface)
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
];

const WithdrawFunds = () => {
  const [status, setStatus] = useState("");

  const withdrawFunds = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("Please install a web3 wallet like MetaMask.");
      }

      // Request user to connect wallet
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      setStatus("Processing withdrawal...");

      // Call the withdraw function
      const tx = await contract.withdraw();
      await tx.wait(); // Wait for the transaction to be confirmed

      setStatus("Withdrawal successful!");
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Withdraw Funds</h2>
      <button onClick={withdrawFunds} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Withdraw
      </button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default WithdrawFunds;
