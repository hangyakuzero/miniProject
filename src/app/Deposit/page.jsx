"use client";

import React, { useState } from "react";
import { ethers } from "ethers";

const DepositFunds = () => {
  const [amount, setAmount] = useState(""); // Amount to deposit
  const [transactionHash, setTransactionHash] = useState(null);
  const [error, setError] = useState(null);

  // Replace with your deployed contract's address
  const contractAddress = "0xYourContractAddress";

  // Replace with your contract's ABI
  const contractABI = [
    {
      inputs: [],
      name: "depositFunds",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ];

  const deposit = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      // Initialize provider and request wallet connection
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      // Get the signer
      const signer = await provider.getSigner();

      // Initialize contract instance
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Convert deposit amount to Wei
      const weiAmount = ethers.parseEther(amount);

      // Call depositFunds function with ETH value
      const tx = await contract.depositFunds({ value: weiAmount });
      setTransactionHash(tx.hash);

      // Wait for transaction to be mined
      await tx.wait();
      alert("Funds deposited successfully!");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Deposit Funds</h2>
      <div>
        <label>
          Deposit Amount (ETH):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
      </div>
      <button
        onClick={deposit}
        style={{ marginTop: "10px" }}
        className="btn btn-primary"
      >
        Deposit
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

export default DepositFunds;
