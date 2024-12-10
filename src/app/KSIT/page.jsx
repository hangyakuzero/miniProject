"use client"; 
import React, { useState } from 'react';
import { ethers } from 'ethers';
import DSU from '@/artifacts/contracts/DSU.sol/DSU.json'; // Update the path if necessary

const contractAddress = '0xEf15fdBb63165959F457f503dcc490d8a2daF4A4';
const POLYGON_AMOY_CHAIN_ID = '0x13882'; // Chain ID for Polygon Amoy Testnet (80002 in hex)

export default function MintNFTPage() {
  const [loading, setLoading] = useState(false);

  const mintNFT = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      try {
        // Check if the user is connected to the Polygon Amoy Testnet
        const { chainId } = await provider.getNetwork();
        if (chainId !== parseInt(POLYGON_AMOY_CHAIN_ID, 16)) {
          try {
            // Switch the network to Polygon Amoy Testnet
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: POLYGON_AMOY_CHAIN_ID }],
            });
          } catch (switchError) {
            // If the network is not added, request to add the network
            if (switchError.code === 4902) {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: POLYGON_AMOY_CHAIN_ID,
                    chainName: 'Polygon Amoy Testnet',
                    rpcUrls: ['https://rpc-amoy.polygon.technology/'], // New RPC URL
                    nativeCurrency: {
                      name: 'Polygon',
                      symbol: 'MATIC',
                      decimals: 18,
                    },
                    blockExplorerUrls: ['https://amoy.polygonscan.com/'], // Block Explorer URL
                  },
                ],
              });
            } else {
              console.error('Failed to switch network:', switchError);
              return;
            }
          }
        }

        // Proceed with minting the NFT
        const contract = new ethers.Contract(contractAddress, DSU.abi, signer);
        setLoading(true);
        const tx = await contract.payToMint(await signer.getAddress(), { value: ethers.parseEther("0.005") });
        await tx.wait(); // Wait for the transaction to be mined
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
    <div className='bg-base-100 flex-row flex'>
        <img className=' h-screen w-[40%] py-10 px-5'
        src='https://ksgi.edu.in/img/blog/ksit_widget1.webp'
        alt="RWA" />
        <div className=' text-center w-full pt-5'>

        <p className=' text-6xl font-extrabold'> KSIT</p>
        <br></br>
        <div className=' text-xl px-5 space-y-4'>
        <p>won't demonstrate it, just for the memes  </p>
        <p>Total supply: 1</p>
        <button 
            onClick={mintNFT} 
            disabled={loading} 
            className="btn btn-active btn-primary text-[20px] font-normal"
          >
            {loading ? "Minting..." : "MINT NOW!!"}
          </button>
        </div>
        </div>

    </div>
  )
}
