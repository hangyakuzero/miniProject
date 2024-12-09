"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import VPS from "@/artifacts/contracts/TBt.sol/VPS.json"; // Import the contract ABI

const TokenGatedApp = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const contractAddress = "0x373879F914D7A3d1AaeFa3FF0acb0E58889aB150"; // Replace with your contract address
  const contractABI = VPS.abi;

  const checkTokenEligibility = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("Please install MetaMask to continue.");
      }

      // Connect to MetaMask using BrowserProvider
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner(); // Ensure the signer is fetched properly
      const userAddress = await signer.getAddress();

      // Initialize the contract
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      // Get the user's NFT balance
      const balance = await contract.balanceOf(userAddress);

      // Check if the user owns any NFTs (using .toString() for comparison)
      if (balance.toString() === "0") {
        throw new Error("You do not own any NFTs from this collection.");
      }

      // Check expiration dates for owned NFTs
      let hasValidNFT = false;

      // Loop over each owned token to check for expiration
      for (let i = 0; i < parseInt(balance.toString()); i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(userAddress, i); // Fetch actual tokenId for each owned token
        const expiration = await contract.expirationDate(tokenId);

        // Check if the expiration date is still valid
        if (parseInt(expiration) > Math.floor(Date.now() / 1000)) {
          hasValidNFT = true;
          break; // Exit loop if a valid NFT is found
        }
      }

      // Update state based on NFT validity
      setIsAuthorized(hasValidNFT);

      // If no valid NFTs found, show an error
      if (!hasValidNFT) {
        throw new Error("Your NFT(s) have expired or are invalid for access.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message); // Set error message
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Token-Gated App</h1>
      <button
        onClick={checkTokenEligibility}
        disabled={isLoading}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {isLoading ? "Checking..." : "Check Access"}
      </button>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {isAuthorized && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
          <h2 className="text-2xl font-semibold">Welcome to the Token-Gated Content!</h2>
          <p>You have access to this restricted area.</p>
        </div>
      )}

      {!isAuthorized && !isLoading && !error && (
        <p className="mt-6 text-gray-700">You do not have access to this content. Please ensure you own a valid NFT.</p>
      )}
    </div>
  );
};

export default TokenGatedApp;
