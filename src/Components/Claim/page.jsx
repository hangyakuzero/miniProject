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
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      // Initialize contract instance
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
      <button onClick={claim} style={{ marginTop: "10px" }}>
        Claim Reward
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

export default ClaimReward;
