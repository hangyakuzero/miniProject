"use client"; 
import React, { useState } from 'react';
import { ethers } from 'ethers';
import VPS from '@/artifacts/contracts/Tbt.sol/VPS.json'; // Update the path as needed

const contractAddress = '0x373879F914D7A3d1AaeFa3FF0acb0E58889aB150'; // Replace with your contract address

export default function WithdrawFunds() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const withdrawFunds = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      try {
        // Create a contract instance
        const contract = new ethers.Contract(contractAddress,VPS.abi, signer);
        
        setLoading(true);
        const tx = await contract.withdraw();
        await tx.wait(); // Wait for the transaction to be mined
        setMessage("Withdrawal successful!");
      } catch (error) {
        console.error("Withdrawal error:", error);
        setMessage("Withdrawal failed. Please check the console for more details.");
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Ethereum object does not exist");
      setMessage("Ethereum object does not exist. Please install MetaMask.");
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-bold'>Withdraw Funds from TBT</h1>
      <button 
        onClick={withdrawFunds} 
        disabled={loading} 
        className="mt-4 btn btn-active btn-primary"
      >
        {loading ? "Withdrawing..." : "Withdraw Funds"}
      </button>
      {message && <p className='mt-2'>{message}</p>}
    </div>
  );
}
