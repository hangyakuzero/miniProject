"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import RewardDistributor from '@/artifacts/contracts/Reward.sol/RewardDistributor.json'; // Import ABI

const ClaimReward = () => {
  const [tokenId, setTokenId] = useState("");  // Token ID for claiming reward
  const [transactionHash, setTransactionHash] = useState(null);
  const [error, setError] = useState(null);

  // Replace with your deployed contract's address
  const contractAddress = "0x5280162e6A26a86329Ed752B2273927d1Cef75e4"; 

  // Claim Reward function
  const claimReward = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      // Validate the tokenId (ensure it's not empty and not negative)
      if (tokenId === "") {
        alert("Please enter a valid NFT Token ID");
        return;
      }
      if (tokenId < 0) {
        alert("Token ID cannot be negative");
        return;
      }
      console.log("Token ID:", tokenId);
      // Request wallet connection
      const provider = new ethers.BrowserProvider(window.ethereum); // Use BrowserProvider in ethers.js v6
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      // Initialize contract instance
      const contract = new ethers.Contract(contractAddress, RewardDistributor.abi, signer);

      // Call claimReward function
      const tx = await contract.claimReward(tokenId);
      setTransactionHash(tx.hash);
      setError(null);

      // Wait for transaction to be mined
      await tx.wait();
      alert("Reward claimed successfully!");
    } catch (err) {
      console.error('Transaction failed:', err);
      setError(`Transaction failed: ${err.message || err}`);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Claim Your Reward</h2>
      <div className="w-full space-y-4">
        <label className="block text-lg font-medium text-gray-700">
          NFT Token ID:
          <input
            type="number"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="Enter NFT Token ID"
            className="mt-2 w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <button
          onClick={claimReward}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          Claim Reward
        </button>
      </div>

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

export default ClaimReward;
