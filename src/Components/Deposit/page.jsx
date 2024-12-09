import React, { useState } from "react";
import { ethers } from "ethers";

const DepositFunds = () => {
  const [amount, setAmount] = useState(""); // Amount to deposit
  const [transactionHash, setTransactionHash] = useState(null);
  const [error, setError] = useState(null);

  // Replace with your deployed contract's address
  const contractAddress = "0x5280162e6A26a86329Ed752B2273927d1Cef75e4";

  // Replace with your contract's ABI
  const contractABI = [
    {
      "inputs": [],
      "name": "depositFunds",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
    },
  ];

  const deposit = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      // Request wallet connection
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      // Initialize contract instance
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Convert deposit amount to Wei
      const weiAmount = ethers.utils.parseEther(amount);

      // Call depositFunds function
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
          />
        </label>
      </div>
      <button onClick={deposit} style={{ marginTop: "10px" }}>
        Deposit
      </button>
      {transactionHash && (
        <p>
          Transaction Hash:{" "}
          <a
            href={`https://etherscan.io/tx/${transactionHash}`}
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
