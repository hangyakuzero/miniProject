"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import RewardDistributor from '@/artifacts/contracts/Reward.sol/RewardDistributor.json'; // Adjust the path to your ABI

const WithdrawFunds = () => {
  const [transactionHash, setTransactionHash] = useState(null);
  const [error, setError] = useState(null);

  // Replace with your deployed contract's address
  const contractAddress = "0x5280162e6A26a86329Ed752B2273927d1Cef75e4";

  const withdrawFunds = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      // Request wallet connection
      const provider = new ethers.BrowserProvider(window.ethereum); // Use BrowserProvider in ethers.js v6
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      // Initialize contract instance
      const contract = new ethers.Contract(contractAddress, RewardDistributor.abi, signer);

      // Call the withdrawFunds function
      const tx = await contract.withdrawFunds();
      setTransactionHash(tx.hash);
      setError(null);

      // Wait for the transaction to be mined
      await tx.wait();
      alert("Funds withdrawn successfully!");
    } catch (err) {
      console.error("Transaction failed:", err);
      setError(`Transaction failed: ${err.message || err}`);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Withdraw Funds</h2>
      <button
        onClick={withdrawFunds}
        className="w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500"
      >
        Withdraw Funds
      </button>

      {transactionHash && (
        <p className="mt-6 text-sm text-gray-600">
          Transaction Hash:{" "}
          <a
            href={`https://www.oklink.com/amoy/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {transactionHash}
          </a>
        </p>
      )}
      {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default WithdrawFunds;
