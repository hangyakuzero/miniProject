// pages/DepositFunds.js
"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import RewardDistributor from '@/artifacts/contracts/Reward.sol/RewardDistributor.json'; // Import ABI

const DepositFunds = () => {
  const [amount, setAmount] = useState(""); // Amount to deposit
  const [transactionHash, setTransactionHash] = useState(null);
  const [error, setError] = useState(null);

  // Replace with your deployed contract's address
  const contractAddress = "0x5280162e6A26a86329Ed752B2273927d1Cef75e4"; 

  // Deposit function
  const deposit = async () => {
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

      // Convert deposit amount to Wei
      const weiAmount = ethers.parseEther(amount);

      // Call depositFunds function
      const tx = await contract.depositFunds({ value: weiAmount });
      setTransactionHash(tx.hash);
      setError(null);

      // Wait for transaction to be mined
      await tx.wait();
      alert("Funds deposited successfully!");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Deposit Funds</h2>
        
        <div className="mb-4">
          <label htmlFor="amount" className="block text-lg font-medium text-gray-700">Deposit Amount (ETH):</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button 
          onClick={deposit} 
          className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Deposit
        </button>

        {transactionHash && (
          <div className="mt-4 text-center">
            <p className="text-lg">Transaction Hash:</p>
            <a
              href={`https://www.oklink.com/amoy/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {transactionHash}
            </a>
          </div>
        )}

        {error && (
          <p className="mt-4 text-center text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default DepositFunds;
