"use client";

import React, { useState } from "react";
import { ethers } from "ethers";

// Replace these placeholders with your contract's details
const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";
const ABI = [
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const WithdrawFunds = () => {
  const [status, setStatus] = useState("");

  const withdrawFunds = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("Please install a web3 wallet like MetaMask.");
      }

      // Initialize the provider and request user wallet connection
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      // Get the signer and initialize the contract instance
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      setStatus("Processing withdrawal...");

      // Call the withdraw function
      const tx = await contract.withdraw();
      await tx.wait(); // Wait for transaction confirmation

      setStatus("Withdrawal successful!");
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="card w-96 bg-gray shadow-xl p-5">
        <h2 className="text-2xl font-bold text-center mb-4">Withdraw Funds</h2>
        <button
          onClick={withdrawFunds}
          className="btn btn-primary btn-block"
        >
          Withdraw
        </button>
        {status && (
          <div
            className={`mt-4 p-3 rounded ${
              status.startsWith("Error")
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {status}
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawFunds;
