import React, { useState } from "react";
import { ethers } from "ethers";
//import TBT
import VPS from src/artifacts/contracts/TBt.sol/VPS.json

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

      if (!window.ethereum) {
        throw new Error("Please install MetaMask to continue.");
      }

      // Connect to MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();

      // Initialize the contract
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      // Get the user's NFT balance
      const balance = await contract.balanceOf(userAddress);

      if (balance.toNumber() === 0) {
        throw new Error("You do not own any NFTs from this collection.");
      }

      // Check expiration dates for owned NFTs
      let hasValidNFT = false;
      for (let i = 0; i < balance.toNumber(); i++) {
        const tokenId = i; // Replace with logic to fetch actual token IDs if needed
        const ownerOfToken = await contract.ownerOf(tokenId);

        if (ownerOfToken.toLowerCase() === userAddress.toLowerCase()) {
          const expiration = await contract.expirationDate(tokenId);
          if (parseInt(expiration) > Math.floor(Date.now() / 1000)) {
            hasValidNFT = true;
            break;
          }
        }
      }

      setIsAuthorized(hasValidNFT);

      if (!hasValidNFT) {
        throw new Error("Your NFT(s) have expired or are invalid for access.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Token-Gated App</h1>
      <button onClick={checkTokenEligibility} disabled={isLoading}>
        {isLoading ? "Checking..." : "Check Access"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isAuthorized && (
        <div>
          <h2>Welcome to the Token-Gated Content!</h2>
          <p>You have access to this restricted area.</p>
        </div>
      )}
      {!isAuthorized && !isLoading && !error && (
        <p>You do not have access to this content. Please ensure you own a valid NFT.</p>
      )}
    </div>
  );
};

export default TokenGatedApp;
