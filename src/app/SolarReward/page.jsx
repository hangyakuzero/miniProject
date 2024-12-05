"use client";

import React, { useState } from "react";
import { ethers } from "ethers";

const ClaimReward = () => {
  const [tokenId, setTokenId] = useState(""); // Token ID to claim reward for
  const [transactionHash, setTransactionHash] = useState(null);
  const [error, setError] = useState(null);

  // Replace with your deployed contract's address
  const contractAddress = "0xYourContractAddress";

  // Replace with your contract's ABI
  const contractABI = [
    {
      "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
      "name": "claimReward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function",
    },
  ];

  const claim = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      // Request wallet connection
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      // Get the signer
      const signer = provider.getSigner();

      // Ensure the wallet is connected to Polygon (Matic-Amoy) network
      const network = await provider.getNetwork();
     /* if (network.chainId !== 80001 && network.chainId !== 137) { // Matic-Amoy Testnet (80001) or Mainnet (137)
        alert("Please switch your wallet to the Polygon network!");
        return;
      } */

      // Initialize contract instance with signer
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Call claimReward function
      const tx = await contract.claimReward(tokenId);
      setTransactionHash(tx.hash);

      // Wait for transaction to be mined
      await tx.wait();
      alert("Reward claimed successfully!");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Claim Reward</h2>
      <div>
        <label>
          Token ID:
          <input
            type="number"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="Enter your NFT Token ID"
          />
        </label>
      </div>
      <button
        className="btn btn-active btn-primary text-[20px] font-normal"
        onClick={claim}
        style={{ marginTop: "10px" }}
      >
        Claim Reward
      </button>
      {transactionHash && (
        <p>
          Transaction Hash:{" "}
          <a
            href={`https://mumbai.polygonscan.com/tx/${transactionHash}`} // Updated for Polygon Mumbai Testnet
            target="_blank"
            rel="noopener noreferrer"
          >
            {transactionHash}
          </a>
        </p>
      )}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default ClaimReward;
