"use client";  // Ensure this file is a client component
import { useState } from 'react';
import { ethers } from 'ethers';
//import Test from '@/artifacts/contracts/NFT.sol/Test.json'; // Update the path if necessary
import SF from  src/artifacts/contracts/SolarFarms.sol/SF.json
const contractAddress = '0xbaBA0D5eFCCE35253D3c8459b902d3c5A7F661d4';

export default function MintNFT() {
  const [loading, setLoading] = useState(false);
  
  const mintNFT = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, Test.abi, signer);
      
      try {
        setLoading(true);
        const tx = await contract.payToMint(signer.getAddress(), { value: ethers.parseEther("0.005") });
        await tx.wait();  // Wait for the transaction to be mined
        alert("NFT Minted!");
      } catch (error) {
        console.error("Minting error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Ethereum object does not exist");
    }
  };

  return (
    <div>
      <button onClick={mintNFT} disabled={loading}>
        {loading ? "Minting..." : "Mint NFT"}
      </button>
    </div>
  );
}
